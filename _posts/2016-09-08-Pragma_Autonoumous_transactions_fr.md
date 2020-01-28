---
layout: post
title: Pragma autonomous_transaction dans PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, Ora2Pg, planetpg]
---

J'ai parlé de deux différentes implémentations des transactions autonomes
avec PostgreSQL dans mon [article précédent du 19 Août]({{ site.baseurl }}/2016/08/19/Support_des_transactions_autonomes_dans_PostgreSQL.html). Le 31 août, Peter Eisentraut a soumis un [patch](https://www.postgresql.org/message-id/659a2fce-b6ee-06de-05c0-c8ed6a01979e@2ndquadrant.com) pour intégrer la syntaxe
PRAGMA AUTONOMOUS_TRANSACTION à la Oracle dans le cœur de PostgreSQL.
Voyons voir ses performances.

<!--MORE-->

Voici un exemple très simple d'un PostgreSQL patché utilisant une
fonction avec le pragma de déclaration d'une transaction autonome.
Cet exemple trace indépendamment certaines actions réalisées dans
la base  quel que soit le résultat final de la transaction en cours.

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

Ce benchmark compare les performances des transactions autonomes
implémentées en utilisant *dblink*, *pg_background*, et le patch pragma.
Il a été réalisé sur mon PC personnel avec 1 CPU AMD FX(tm)-8350
et 8 cœurs. Ne faites pas attention aux niveaux de transactions par seconde,
c'est tout à fait attendu sur ce type de matériel mais cela vous donnera
une idée des performances que vous pouvez attendre de ces différentes solutions
pour mettre en œuvre des transactions autonomes.

<img src="{{ site.baseurl }}/assets/media/dblink_pg_background_pragma_autonomous.png" title="Resultats dblink vs pg_background vs pragma autonomous_transaction"/>

Dans ce test, on peut voir que *pg_background* et *pragma autonomous_transaction*
ont quasiment les mêmes performances. Ce n'est pas surprenant car le patch
*pragma autonomous_transaction* utilise aussi des background workers pour créer
une session autonome.

Si ce patch permet sans aucun doute la simplification de mise en œuvre des
transactions autonomes, il ne permet pas encore le mode asynchrone. Ceci est
clairement un gros avantage des solutions *dblink* ou *pg_background*, en mode
asynchrone elles sont très largement plus performantes que le patch *pragma autonomous_transaction*.

<img src="{{ site.baseurl }}/assets/media/dblink_vs_pg_background_async2.png" title="Resultats dblink vs pg_background asynchrone"/>

Notez que les autres SGBD implémentant les transactions autonomes n'ont
pas non plus de mode asynchrone, tout au moins à ma connaissance.

Mais peu importe, si ce patch est intégré dans cette forme ou une autre,
vous aurez à disposition trois solutions pour gérer vos transactions autonomes,
ce qui est une vraie richesse. Le problème est que les solutions qui
construisent les transactions autonomes sur la base des background workers
provoquent la création d'un nouveau processus à chaque fois qu'une telle transaction
est appelée. Ceci a un coût de performance de quelques millisecondes à
chaque fois et cela génère aussi un surcoût de context switches. S'il
était question de sous-transactions validées avant et indépendamment
de la transaction appelante, nous aurions une bien meilleure solution.

