---
layout: post
title: Autonomous transaction support in PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, ora2pg]
---

An autonomous transaction is a transaction started from an
other main transaction to execute SQL orders that will be
committed or cancelled independently from the calling transaction.

<!--MORE-->

The most classic used case is the insert into a logging table
of all operations realized on a database by the users, no matter
if the transaction ended with success or has been cancelled. With
PostgreSQL all things done in a transaction are cancelled when
the transaction failed. For this same reason, when an autonomous
transaction failed no exception is forwarded to the calling
transaction so that it can terminate with success.

We can consider autonomous transactions like independent work
units, just like if it was SQL orders executed in an other session.
In this case, operations not committed in the main transaction are
not visible in the autonomous transaction until the main transaction
is terminated and committed.

SQL operation performed in the autonomous transaction can be visible
by the main transaction when they are committed and that the isolation
level in the main transaction is not SERIALIZABLE or REPEATABLE READ.

Here is a very simple example of an Oracle function using an autonomous
transaction to log independently all actions performed in the database
whatever is the transaction result.

```
CREATE PROCEDURE log_action (username VARCHAR2, event_date DATE, msg VARCHAR2)
IS
   PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
   INSERT INTO table_tracking VALUES (log_seq.nextval, username, event_date, msg);
   COMMIT;
END log_action;
```

This is not possible natively with PostgreSQL, all that is done in a
transaction is cancelled or committed with the transaction. However
there was some solutions to perform such transaction since a long time,
but since PostgreSQL 9.5 it is more easy. The historical solution is to
use a dedicated connection to the backend using the *dblink* extension.
A more recent solution is to use the *pg_background* extension waiting
for an in core integration of autonomous transaction. I describe both
mechanics in the next chapters.

"Old school": independent connection:
-------------------------------------

To obtain the same autonomous transaction behavior with PostgreSQL
you just have to open a new connection to PostgreSQL and execute
the SQL order in this new session.

For this we used the *dblink* or *PL/proxy* contrib for a long time
that allow to create a new connection to the PostgreSQL server to
execute autonomously the SQL queries.

For example, Ora2Pg up to 17.4, convert all Oracle function or procedure
with the pragma AUTONOMOUS_TRANSACTION by creating a wrapper that use
*dblink*. This wrapper takes the name of the function and call the original
function renamed with the `_atx` suffix.

Taking the example about autonomous transaction under Oracle above,
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
called in the application or the other stored procedure.

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

This method works perfectly but require some manual editing to set the
parameters for the *dblink* connection, not counting the password in the
function code. Performances are not optimal too.


"New" : use dynamic background workers:
---------------------------------------

Hopefully since the commit of *background workers* and most of all
the work of Robert Haas, it is now possible since PostgreSQL v9.5
to use the [pg_background](https://github.com/vibhorkum/pg_background) extension to create
autonomous transaction. This extension offer some other advantages, but
this article just explain how to call function or SQL queries in
an autonomous way.

If we take the previous example, here is how Ora2Pg will export the
function using the *pg_background* extension on the coming 17.5 version.

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

Here we talked about automatic PL/SQL Oracle code conversion but
the more simple is surely to directly call the function :

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

If we want to wait the result of the autonomous transaction and use
the result:

```
SELECT * FROM pg_background_result(pg_background_launch('SELECT log_action(...)')) AS p (ret text);
```

Else, a simple call to *pg_background_launch()* is enough to execute
the autonomous transaction in background, the main transaction will
continue without waiting for the result of the autonomous transaction
launched in background.

```
SELECT pg_background_launch('SELECT log_action(...)');
```

If we want to later use the result from the autonomous SQL order
launched in background, we need to save the pid returned by the
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

CREATE OR REPLACE FUNCTION log_action_atx (i
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

We can see that, despite the rollback, the log line is well inserted
in table *table_tracking*.

As explain above, it is possible to simplify the autonomous transaction
implementation using direct call to the *pg_background* functions.
In the following example the return type of the function have been changed
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

gilles=# SELECT * FROM pg_background_result(pg_background_launch(E'SELECT log_action(\'gilles\',\'now\',\'Add autonomous_transaction article\')')) AS p (result text);
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

gilles=# SELECT pg_background_launch(E'SELECT log_action(\'gilles\',\'now\',\'Add autonomous_transaction article\');');
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
transaction is running in background:

```
gilles=# BEGIN;
BEGIN
gilles=# SELECT * FROM table_tracking;
 id | username |         event_date         |                msg                 
----+----------+----------------------------+------------------------------------
  1 | gilles   | 2016-08-19 14:00:12.573144 | Add autonomous_transaction article
  2 | gilles   | 2016-08-19 14:01:20.83565  | Add autonomous_transaction article
(2 lignes)

gilles=# SELECT pg_background_launch(E'SELECT pg_sleep(30); SELECT log_action(\'gilles\',\'now\',\'Add autonomous_transaction article\');');
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

Here we add a wait for 30 seconds (`SELECT pg_sleep(30);`) in the
autonomous transaction and we can see that the *pg_background_launch()*
function returns immediately. If we wait after 30 seconds in the main
transaction then we can see that when the autonomous transaction is
terminated we have the new entry in the table_tracking table. Now
we can get back the result of the autonomous transaction using the
pid returned by *pg_background_launch()* with the *pg_background_result()*
function.

This ability to execute autonomous transactions in background
allow you to bypass some PostgreSQL limitation like running
*CREATE INDEX CONCURRENTLY* order in a transaction.

