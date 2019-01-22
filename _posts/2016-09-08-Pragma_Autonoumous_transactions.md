---
layout: post
title: Pragma autonomous_transaction in PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, ora2pg, planetpg]
---

I've talked about two different implementations of Autonomous Transaction
with PostgreSQL in my [previous post on August 19th](https://blog.dalibo.com/2016/08/19/Autonoumous_transactions_support_in_PostgreSQL.html). On August 31st, Peter Eisentraut submitted
a [patch](https://www.postgresql.org/message-id/659a2fce-b6ee-06de-05c0-c8ed6a01979e@2ndquadrant.com) to implement PRAGMA AUTONOMOUS_TRANSACTION à la Oracle into the
core of PostgreSQL. Let's see how well it performs.

<!--MORE-->

Here is a very simple example of a patched PostgreSQL using a function
with the autonomous transaction pragma. It logs independently all
actions performed in the database, no matter what the end result of the
transaction is.

```
CREATE OR REPLACE FUNCTION log_action_atx (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
	PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
	START TRANSACTION;
	INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
	COMMIT;
END;
$body$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION log_action (
	username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        v_query     text;
BEGIN
	-- Call the autonomous transaction
        v_query := 'SELECT log_action_atx ( ' || quote_nullable(username) ||
		 ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        EXECUTE v_query;
	-- Do something else
END;
$body$
LANGUAGE PLPGSQL;
```

This benchmark compares performances of autonomous transaction
implemented using *dblink*, *pg_background* and the pragma patch.
It ran on my personal desktop computer with 1 CPU
AMD FX(tm)-8350 - 8 cores. Do not pay attention to the level of transactions
per second, these values are expected on this kind of hardware but it will give
you an idea of the performance you can expect from these solutions.

<img src="https://blog.dalibo.com/assets/media/dblink_pg_background_pragma_autonomous.png" title="Results dblink vs pg_background vs pragma autonomous"/>

In this test, we can see that *pg_background* and *pragma autonomous_transaction*
have approximately the same performance. This is not surprising because the *pragma
autonomous_transaction* patch also uses background workers to create a
dedicated session.

If this patch allows a simpler use of autonomous transactions, it doesn't allow
the asynchronous mode yet. This is clearly a big advantage of *dblink* and
*pg_background*, as in asynchronous mode, they clearly outperform the *pragma
autonomous_transaction* patch.

<img src="https://blog.dalibo.com/assets/media/dblink_vs_pg_background_async2.png" title="Results dblink vs pg_background asynchronous"/>

Note that, as far as I know, other DBMSes implementing autonomous transaction
don't have an asynchronous mode either.

Anyway, if this patch is committed (as is or not), you will have three ways to
create autonomous transactions in PostgreSQL, which is a real good thing.
The problem is that solutions that build autonomous transaction through a background worker
are creating a new process each time such a transaction is called. This
has a performance cost of some milliseconds each time and induces
additional context switches. Having some kind of sub-transaction committed
before and independently of the main transaction would be a much better solution.

