---
layout: post
title: Autonomous transaction support in PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, Ora2Pg, planetpg]
---

An autonomous transaction is a transaction started from
another main transaction to execute SQL orders that will be
committed or cancelled independently from the calling transaction.

<!--MORE-->

The most classic use case is inserting into a logging table all operations
done on a database by the users, whether their transactions succeeded or
failed. With PostgreSQL, all changes done in a transaction are cancelled when
something in the transaction failed. For the same reason, when an autonomous
transaction failed, no exception is forwarded to the calling transaction so
that it can end with success.

We can consider autonomous transactions like an independent work
unit, just like if it was SQL statements executed in another session.
In this case, operations not committed in the main transaction are
not visible in the autonomous transaction until the main transaction
is terminated and committed.

SQL operation performed in the autonomous transaction can be visible
by the main transaction when they are committed and that the isolation
level in the main transaction is not SERIALIZABLE or REPEATABLE READ.

Here is a very simple example of an Oracle function using an autonomous
transaction to log independently all actions performed in the database
whatever is the end result of the transaction.

```
CREATE PROCEDURE log_action (username VARCHAR2, event_date DATE, msg VARCHAR2)
IS
   PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
   INSERT INTO table_tracking VALUES (log_seq.nextval, username, event_date, msg);
   COMMIT;
END log_action;
```

This is currently not possible natively with PostgreSQL. Every changes in a
single transaction is either cancelled or committed with the transaction. However,
there were some solutions to perform such transactions since a long time. It became
easier since PostgreSQL 9.5. The historical solution is to
use a dedicated connection to the backend using the *dblink* extension.
A more recent solution is to use the *pg_background* extension waiting
for an in-core implementation of autonomous transactions. I describe both
ways in the next chapters.

"Old school": independent connection:
-------------------------------------

To get the same autonomous transaction behavior with PostgreSQL,
you just have to open a new connection to PostgreSQL and execute
the SQL statement in this new session.

For this to work, we usually use the *dblink* or *PL/proxy* contrib for a long time.
They both allow to create a new connection to the PostgreSQL server and
execute SQL statements inside this new connection using their own transaction.

For example, Ora2Pg (up to 17.4) convert all Oracle functions or procedures
using the pragma AUTONOMOUS_TRANSACTION with a wrapper that uses
*dblink*. This wrapper takes the name of the function and adds an `_atx` suffix.

With the Oracle example above,
Ora2Pg will first transform this function and rename it with the `_atx`
suffix.

```
CREATE OR REPLACE FUNCTION log_action_atx (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL

```

Then it creates the wrapper function using *dblink* that will be
called by the application or another stored procedure.

```
--
-- dblink wrapper to call function log_action as an autonomous transaction
--
CREATE OR REPLACE FUNCTION log_action (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        -- Change this to reflect the dblink connection string
        v_conn_str  text := 'port=5432 dbname=testdb host=localhost user=pguser password=pgpass';
        v_query     text;

BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
		 ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM * FROM dblink(v_conn_str, v_query) AS p (ret boolean);

END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```

This method works perfectly well but require some manual editing to set the
*dblink* connection parameters. There is also some security concern, the
connection password being in the function code. And performances are not optimal too.


"New" : use dynamic background workers:
---------------------------------------

Hopefully, since the addition of *dynamic background workers* and most of all
the work of Robert Haas, it is possible since PostgreSQL v9.5
to use the [pg_background](https://github.com/vibhorkum/pg_background) extension to create
autonomous transaction. This extension offers some other advantages, but
this article just explains how to call a function or a SQL statement in
an autonomous way.

If we go back to the previous example, here is how Ora2Pg will export the
function using the *pg_background* extension on the upcoming 17.5 version.

```
--
-- pg_background wrapper to call function log_action as an autonomous transaction
--
CREATE OR REPLACE FUNCTION log_action (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        v_query     text;

BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
		',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM * FROM pg_background_result(pg_background_launch(v_query)) AS p (ret boolean);
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION log_action_atx (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL
;
```

Here ,we talked about automatic PL/SQL Oracle code conversion but
the more simple way is obviously to directly call the function:

```
CREATE OR REPLACE FUNCTION log_action (
	username text, event_date timestamp, msg text
) RETURNS text AS
$body$
DECLARE
   s_id integer;
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg) RETURNING id INTO s_id;
   RETURN 'Message inserted into table_tracking with id: '|| s_id;
END;
$body$
LANGUAGE plpgsql;
```

If we want to wait for the result of the autonomous transaction and use
the result:

```
SELECT * FROM pg_background_result(pg_background_launch('SELECT log_action(...)')) AS p (ret text);
```

Otherwise, a simple call to *pg_background_launch()* is enough to execute
the autonomous transaction in the background. The main transaction will
continue without waiting for the result of the autonomous transaction
launched in background.

```
SELECT pg_background_launch('SELECT log_action(...)');
```

If we want to later use the result from the autonomous SQL statement
launched in the background, we need to save the pid returned by the
*pg_background_launch()* function. The result can be obtained
using the *pg_background_result()* function.

```
CREATE OR REPLACE FUNCTION test_autonomous_transaction (
	username text, msg text
) RETURNS text AS
$body$
DECLARE
	at_pid		integer;
	at_result	text;
BEGIN
	SELECT INTO at_pid pg_background_launch('SELECT log_action('||username||','||now()||','||msg)');
	... do something ...
	SELECT INTO at_result * FROM pg_background_result(at_pid) as (result text);
	RETURN at_result;
END;
```

Here is a full example using the functions created by Ora2Pg:

```
CREATE TABLE table_tracking ( id integer, username text, event_date timestamp, msg text);

CREATE SEQUENCE log_seq START 1;

CREATE OR REPLACE FUNCTION log_action_atx (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL ;

CREATE OR REPLACE FUNCTION log_action (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        v_query     text;
BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) || ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM * FROM pg_background_result(pg_background_launch(v_query)) AS p (ret boolean);
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```

```
gilles=# TRUNCATE table_tracking ;
TRUNCATE TABLE
gilles=# ALTER SEQUENCE log_seq restart 1;
ALTER SEQUENCE
gilles=# BEGIN;
BEGIN
gilles=# SELECT * from table_tracking;
 id | username | event_date | msg 
----+----------+------------+-----
(0 ligne)

gilles=# SELECT log_action('gilles', 'now', 'Add autonomous_transaction article');
 log_action 
------------
 
(1 ligne)

gilles=# SELECT * from table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 11:55:08.859347 | Add autonomous_transaction article
(1 ligne)

gilles=# ROLLBACK;
ROLLBACK
gilles=# SELECT * from table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 11:55:08.859347 | Add autonomous_transaction article
(1 ligne)

```

We can see that, despite the rollback, the log line is inserted
in the log table *table_tracking*.

As explained above, it is possible to simplify the autonomous transaction
implementation using direct call to the *pg_background* functions.
In the following example, the return type of the function has been changed
to show more use case of the *pg_background* functions.

```
DROP FUNCTION log_action_atx(text, timestamp, text);
DROP FUNCTION log_action(text, timestamp, text);

CREATE OR REPLACE FUNCTION log_action (
        username text, event_date timestamp, msg text
) RETURNS text AS
$body$
DECLARE
   s_id integer;
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg) RETURNING id INTO s_id;
   RETURN 'Message inserted into table_tracking with id: '|| s_id;
END;
$body$
LANGUAGE plpgsql;
```

```
gilles=# TRUNCATE table_tracking ;
TRUNCATE TABLE
gilles=# ALTER SEQUENCE log_seq restart 1;
ALTER SEQUENCE
gilles=# BEGIN;
BEGIN
gilles=# SELECT * FROM table_tracking;
 id | username | event_date | msg 
----+----------+------------+-----
(0 ligne)

gilles=# SELECT * FROM pg_background_result(pg_background_launch($$SELECT log_action('gilles','now','Add autonomous_transaction article')$$)) AS p (result text);
                     result                      
-------------------------------------------------
 Message inserted into table_tracking with id: 1
(1 ligne)

gilles=# ROLLBACK;
ROLLBACK

gilles=# BEGIN;
BEGIN
gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
(1 ligne)

gilles=# SELECT pg_background_launch($$SELECT log_action('gilles','now','Add autonomous_transaction article');$$);
 pg_background_launch 
----------------------
                25968
(1 ligne)

gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
  2 | gilles   | 2016-08-19 14:01:20.83565  | Add autonomous_transaction article
(2 lignes)

gilles=# SELECT * FROM pg_background_result(25968) as p (result text);
                     result                      
-------------------------------------------------
 Message inserted into table_tracking with id: 2
(1 ligne)

```

In this last example, we can see that it is perfectly possible to
work on something else in the main transaction while the autonomous
transaction is running in the background:

```
gilles=# BEGIN;
BEGIN
gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
  2 | gilles   | 2016-08-19 14:01:20.83565  | Add autonomous_transaction article
(2 lignes)

gilles=# SELECT pg_background_launch($$SELECT pg_sleep(30); SELECT log_action('gilles','now','Add autonomous_transaction article');$$);
 pg_background_launch 
----------------------
                26170
(1 ligne)

gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
  2 | gilles   | 2016-08-19 14:01:20.83565  | Add autonomous_transaction article
(2 lignes)

... Attente de 30 secondes ...

gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
  2 | gilles   | 2016-08-19 14:01:20.83565  | Add autonomous_transaction article
  3 | gilles   | 2016-08-19 14:05:42.181332 | Add autonomous_transaction article
(3 lignes)

gilles=# SELECT * FROM pg_background_result(26170) as p (result text);
                     result                      
-------------------------------------------------
 Message inserted into table_tracking with id: 3
(1 ligne)

gilles=# ROLLBACK;
ROLLBACK
```

Here, we add a wait of 30 seconds (`SELECT pg_sleep(30);`) in the
autonomous transaction and we can see that the *pg_background_launch()*
function returns immediately. If we wait after 30 seconds in the main
transaction, then we can see that, when the autonomous transaction ends,
we have the new entry in the table_tracking table. Now
we can get back the result of the autonomous transaction using the
pid returned by *pg_background_launch()* with the *pg_background_result()*
function.

This ability to execute autonomous transactions in background
allows you to bypass some PostgreSQL limitation like running
*CREATE INDEX CONCURRENTLY* statement in a transaction.

Warning: even if you need to be superuser to create this extension,
once it is created, any user who have access to the database will
be granted to execute those *pg_background_...()* function. Even
if object's ACLs are preserved, it is mandatory to be really careful on
database access and to regularly audit the database. The best thing
to do to prevent all users to execute these functions is to relocate
the extension on a dedicated schema where only authorized users will
be granted usage privilege. This can be done using the following
command:

```
CREATE SCHEMA bgw_schema;
ALTER EXTENSION pg_background SET SCHEMA bgw_schema;
GRANT USAGE ON SCHEMA bgw_schema TO <authorized user>;
```

Using SECURITY DEFINER attribute in functions created by the
authorized user and using the *bgw_schema.pg_background_...()*
functions will help to control the security risk.

dblink vs pg_background performances :
--------------------------------------

It's interesting to compare performances between these two extensions,
*dblink* and *pg_background*. The following benchmarks have been built
on my personal desktop computer with 1 CPU AMD FX(tm)-8350 - 8 cores.
Do not look for high performances on this computer, this is just to
give you an idea of the performances gain you can expect.

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background.png" title="Results dblink vs pg_background"/>

In this first test with the functions generated by Ora2Pg, we can see that
performances are quite the same up to 10 concurrent clients. The *pg_background*
extension is clearly much interesting with lot of parallel sessions.

In the next test, I have used the asynchronous mode of the two extensions.
In this mode *pg_background* seems really much more performant:

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background_async.png" title="Results dblink vs pg_background asynchronous"/>

but the problem is that most of the transactions failed to allocate
shared memory segment:

```
ERROR:  unable to map dynamic shared memory segment
```

This problem comes from the fact that, in this use case, the parent process
ends before that the background work was able to attach the share memory segment
used for communication between the two process. As the calling process dies before
there's no more process attached to the share memory segment and in this case the
system automatically drop the allocated shared memory. Then when the background worker
want to attach this dsm segment it can't find it and the previous error is returned.

This test case is quite unusual because we can think that the asynchronous mode is
used most of the time to quickly perform some additional tasks after launching the
background worker. This let the time to the bgworker to attach the shared memory
segment. Here, the fact to execute the query asynchronously without taking care
of the result without having anything else to execute is an extrem case.

To be able to compare the same behavior between *dblink* and *pg_background* I have
add a call to `pg_sleep(0.005)` just after the call to `pg_background_launch()`, which
gives the following result:

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background_async2.png" title="Results dblink vs pg_background asynchronous using pg_sleep(0.005)"/>

Even if this is not realistic of a production use, this give you an idea
of what can be expected with these both extensions with autonomous transactions.
If your application is making an intensive use of autonomous transactions, you
can expect some performances gain using *pg_background* additionally to a more
simple implementation of autonomous transactions.

For the asynchronous mode, here are the functions used with *dblink*:

```
CREATE OR REPLACE FUNCTION log_action (
        username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        -- Change this to reflect the dblink connection string
        v_conn_str  text := 'port=5432 dbname=gilles host=localhost user=gilles password=gilles';
        v_connect   text;
        v_query     text;

BEGIN
        SELECT INTO v_connect pg_backend_pid()::text;
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
                 ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM dblink_connect(v_connect, v_conn_str);
        PERFORM dblink_send_query(v_connect, v_query);
        PERFORM dblink_disconnect(v_connect);
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```

And with *pg_background*:

```
CREATE OR REPLACE FUNCTION log_action (
        username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        v_query     text;

BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
                ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM pg_background_launch(v_query);
	-- you need to do something here to avoid ERROR:  unable to map dynamic shared memory segment
	PERFORM pg_sleep(0.005);
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```

