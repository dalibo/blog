---
layout: post
title: PRAGMA AUTONOMOUS TRANSACTION in PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, ora2pg]
---

I've talked about two differents implementation of Autonomous transaction
with PostgreSQL in my [http://blog.dalibo.com/2016/08/19/Autonoumous_transactions_support_in_PostgreSQL.html] (previous post on August 19th). August 31th Peter Eisentraut submit
a patch to implement PRAGMA AUTONOMOUS_TRANSACTION a la Oracle into the
core of PostgreSQL. Lets see how well it performs.

<!--MORE-->

Here is a very simple example of a patched PostgreSQL using a function
with the pragma of autonomous transaction. It logs independently all
actions performed in the database whatever is the end result of the
transaction.

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

Here is a benchmark comparing performances of autonomous transaction
implemented using *dblink*, *pg_background* and the pragma patch.
Benchmark was built on my personal desktop computer with 1 CPU
AMD FX(tm)-8350 - 8 cores. Do not take care of the level of transactions
per second, this is expected on this kind of hardware but this will give
you an idea of the performances you can expect following the solution.

<img src="http://blog.dalibo.com/assets/media/dblink_pg_background_pragma_autonomous.png" title="Results dblink vs pg_background vs pragma autonomous"/>

In this test we can see that *pg_background* and *pragma autonomous_transaction*
have the same performances. This is not surprising because the *pragma autonomous_transaction*
patch also use background workers to create a dedicated session.

If this patch increase the simplification in the use of autonomous transaction,
it doesn't allow the asynchronous mode yet. This is clearly a great advantage
of *dblink* or *p_gbackground*, in asynchronous mode they clearly outperform
the *pragma autonomous_transaction* patch.

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background_async2.png" title="Results dblink vs pg_background asynchronous"/>

Note that other SGBD implementing autonomous transaction doesn't have an
asynchronous mode too, at least for what I know.

Anyway, if this patch is committed in this form or modified, you will have
three way to create autonomous transaction in PostgreSQL which is a wealth.
The problem is that solutions that build autonomous transaction through a background worker
are creating a new process each time such a transaction is called. This
has a performance cost of some milliseconds each time and create additional
context switches. Having some kind of sub transaction committed before and
independently of the main transaction would be a better solution.

