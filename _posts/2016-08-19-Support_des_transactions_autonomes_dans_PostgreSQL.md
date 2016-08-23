---
layout: post
title: Support des transactions autonomes dans PostgreSQL
author: Gilles Darold
twitter_id: ora2pg
github_id:
tags: [PostgreSQL, autonomous, transaction, ora2pg]
---

Une transaction autonome est une transaction exécutée à partir
d'une autre transaction principale permettant de réaliser des
opérations SQL qui seront validées ou annulées (commit/rollback)
indépendamment de la transaction appelante.


<!--MORE-->

Le cas le plus classique est l'inscription dans une table d'audit
de toutes les opérations réalisées sur la base que la transaction
ait réussi ou échoué. Dans PostgreSQL, tout ce qui a été fait
dans une transaction en échec est annulé. Pour cette même raison,
en cas d'échec de la transaction autonome, aucune exception ne doit
être remontée à la transaction principale. Ainsi, cette dernière ne
sera pas annulée suite à cet échec. 

On peut considérer les transactions autonomes comme des unités
indépendantes de travail, comme s'il s'agissait d'ordres SQL
exécutés dans une autre session. De ce fait, les opérations non
validées (commit) dans la transaction principale ne sont pas
visibles de la transaction autonome tant que la transaction
principale n'est pas terminée et validée. Les opérations SQL
réalisées par la transaction autonome sont visibles par
la transaction principale dans la mesure, bien sûr, où elles ont
été validées et que le niveau d'isolation de la transaction n'est
pas SERIALIZABLE ou REPEATABLE READ.

Voici un exemple de fonction Oracle utilisant une transaction
autonome pour tracer indépendamment toutes les actions réalisées
sur une base, peu importe le résultat de la transaction.

```
CREATE PROCEDURE log_action (username VARCHAR2, event_date DATE, msg VARCHAR2)
IS
   PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
   INSERT INTO table_tracking VALUES (log_seq.nextval, username, event_date, msg);
   COMMIT;
END log_action;
```

Ce n'est pas possible nativement avec PostgreSQL. Tout ce qui est
fait dans une transaction est annulé ou validé avec la transaction.
Cependant, il existe des solutions depuis longtemps, mais surtout
depuis la version 9.5 de PostgreSQL. La solution historique est
de passer par une connexion indépendante en utilisant *dblink* par
exemple. La solution depuis la version 9.5 est d'utiliser l'extension
*pg_background* en attendant une intégration de ces transactions
autonomes dans le cœur de PostgreSQL.

"Old school": connexion indépendante :
--------------------------------------

Pour avoir le comportement d'une transaction autonome sous PostgreSQL,
il suffit d'ouvrir une autre connexion à la base dans une transaction
et d'exécuter les ordres SQL dans cette nouvelle session.

Pour cela, on utilise depuis longtemps les modules *dblink* ou *PL/proxy*,
avec lesquels on crée une nouvelle connexion au serveur PostgreSQL
pour exécuter de manière autonomes des requêtes SQL.

Par exemple, Ora2Pg, jusqu'à la version 17.4, convertit les procédures
Oracle avec le PRAGMA AUTONOMOUS_TRANSACTION en créant un wrapper à
base de *dblink*. Ce wrapper prend le nom de la fonction et appelle
la fonction d'origine renommée avec le suffix `_atx`.

En reprenant l'exemple de transaction autonome sous Oracle, Ora2Pg
va d'abord transformer cette fonction et la renommer avec le suffixe
`_atx' comme suit :

```
CREATE OR REPLACE FUNCTION log_action_atx (
 | username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL

```

puis il créé la fonction de substitution ou wrapper, qui sera appelée
par l'applicatif :

```
--
-- dblink wrapper to call function log_action as an autonomous transaction
--
CREATE OR REPLACE FUNCTION log_action (
 | username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        -- Change this to reflect the dblink connection string
        v_conn_str  text := 'port=5432 dbname=testdb host=localhost user=pguser password=pgpass';
        v_query     text;

BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
 |  |  ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM * FROM dblink(v_conn_str, v_query) AS p (ret boolean);

END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```

Cette méthode fonctionne très bien mais nécessite une modification manuelle pour
positionner les paramètres *dblink* de connexion, sans compter ici la
présence du mot de passe dans la fonction. Les performances ne sont
pas non plus idéales.


"New" : utiliser les background workers :
-----------------------------------------

Heureusement, depuis la présence des *background workers* et surtout
du travail de Robert Haas, il est possible depuis la
version 9.5 d'utiliser l'extension [pg_background](https://github.com/vibhorkum/pg_background) pour créer des
transactions autonomes. Cette extension a bien d'autres avantages,
Cet article se limite à expliquer comment appeler des fonctions ou
ordres SQL de manière autonome.

Si l'on reprend l'exemple précédent, voici ce que Ora2Pg exporte en
utilisant l'extension *pg_background* dans sa version 17.5 à venir.

```
--
-- pg_background wrapper to call function log_action as an autonomous transaction
--
CREATE OR REPLACE FUNCTION log_action (
 | username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
DECLARE
        v_query     text;

BEGIN
        v_query := 'SELECT true FROM log_action_atx ( ' || quote_nullable(username) ||
 |  | ',' || quote_nullable(event_date) || ',' || quote_nullable(msg) || ' )';
        PERFORM * FROM pg_background_result(pg_background_launch(v_query)) AS p (ret boolean);
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION log_action_atx (
 | username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL
;
```

Ici, il s'agit de conversion automatique de code PL/SQL Oracle, mais le
plus simple est certainement d'appeler directement la fonction :

```
CREATE OR REPLACE FUNCTION log_action (
 | username text, event_date timestamp, msg text
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

Si l'on veut attendre ou stocker le résultat :

```
SELECT * FROM pg_background_result(pg_background_launch('SELECT log_action(...)')) AS p (ret text);
```

Sinon, un simple appel à *pg_background_launch* suffit pour exécuter
la fonction en arrière plan, la transaction principale peut alors
continuer sans attendre le retour de la transaction autonome lancée
en arrière plan :

```
SELECT pg_background_launch('SELECT log_action(...)');
```

Si l'on veut récupérer le résultat de l'ordre SQL autonome plus
tard, il faut stocker le pid et faire appel ensuite à la fonction
*pg_background_result* :


```
CREATE OR REPLACE FUNCTION test_autonomous_transaction (
 | username text, msg text
) RETURNS text AS
$body$
DECLARE
 | at_pid | 	integer;
 | at_result | text;
BEGIN
 | SELECT INTO at_pid pg_background_launch('SELECT log_action('||username||','||now()||','||msg)');
 | ... do something ...
 | SELECT INTO at_result * FROM pg_background_result(at_pid) as (result text);
 | RETURN at_result;
END;
```

Voici un exemple complet en utilisant les fonctions générées par Ora2Pg :

```
CREATE TABLE table_tracking ( id integer, username text, event_date timestamp, msg text);

CREATE SEQUENCE log_seq START 1;

CREATE OR REPLACE FUNCTION log_action_atx (i
 | username text, event_date timestamp, msg text
) RETURNS VOID AS
$body$
BEGIN
   INSERT INTO table_tracking VALUES (nextval('log_seq'), username, event_date, msg);
END;
$body$
LANGUAGE PLPGSQL ;

CREATE OR REPLACE FUNCTION log_action (
 | username text, event_date timestamp, msg text
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

On constate bien que, malgré le ROLLBACK, la ligne est bien présente
dans la table *table_tracking*.

Comme expliqué plus haut, il est possible de simplifier ces appels
en utilisant directement l'appel à la fonction. Dans l'exemple
suivant, le type de retour de la fonction a été modifié pour montrer
l'utilisation des différentes fonctions de l'extension *pg_background*.

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

Dans ce dernier exemple, on peut constater qu'il est tout à fait
possible de faire autre chose dans la transaction en attendant que
la transaction autonome soit finie :

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

Ici, on ajoute une temporisation de 30 secondes (`SELECT pg_sleep(30);`)
dans la transaction autonome. La table *table_tracking* n'a toujours
pas reçue d'insertion juste après la création du background worker
mais 30 secondes plus tard, on constate la présence de la nouvelle
ligne. On peut alors récupérer le résultat de la transaction s'il y
en a un.

Cette capacité à exécuter des transactions autonomes en tache de fond
permet notamment de dépasser une limitation de PostgreSQL qui ne
permet pas d'exécuter des ordres *CREATE INDEX CONCURRENTLY*.

Attention toutefois, même si il faut être super utilisateur pour
pouvoir créer cette extension, une fois l'extension créée, n'importe
quel utilisateur ayant accès à la base de données aura la possibilité
d'utiliser les fonctions *pg_background_...()*. Même si les ACL sur les
objets sont préservées, il est impératif d'être extrêmement attentif
aux accès à la base et de mener des audits réguliers. Le mieux pour
éviter l'exécution de ces fonctions par des utilisateurs non dûment
autorisés est de déplacer l'extension dans un schéma particulier
et de ne donner le droit d'usage qu'aux utilisateurs pouvant exécuter
ces fonctions. Cela se fait simplement par la commande :

```
CREATE SCHEMA bgw_schema;
ALTER EXTENSION pg_background SET SCHEMA bgw_schema;
GRANT USAGE ON SCHEMA bgw_schema TO <authorized user>;
```

En positionnant l'attribut SECURITY DEFINER dans la déclaration des
fonctions créées par l'utilisateur autorisé et utilisant les fonctions
*bgw_schema.pg_background_...()*, cela devrait permettre un meilleur
controle des risques de sécurité.

Performances dblink vs pg_background :
--------------------------------------

Il est intéressant de comparer les performances entre ces deux extensions,
*dblink* et *pg_background*. Les benchmarks ont été réalisés sur mon PC de
bureau avec 1 CPU AMD FX(tm)-8350 - 8 cœurs, d'où le peu de performances
mais cela donne un ordre d'idée. 

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background.png" title="Results dblink vs pg_background"/>

Sur ce premier test avec les fonctions générées par Ora2Pg, on peut constater
que les performances sont équivalentes jusqu'à 10 clients en parallèle. Ensuite,
l'extension *pg_background* prend clairement l'avantage.

Sur le test suivant, j'ai utilisé des appels asynchrones tant du côté *dblink*
que *pg_background*. Voici les résultats mais le problème est que je suis
très vite arrivé aux limites de ma machine avec *pg_background*. Je me suis
donc limité à un test sur 8 clients en parallèle.

<img src="http://blog.dalibo.com/assets/media/dblink_vs_pg_background_async.png" title="Results dblink vs pg_background asynchronous"/>

En mode asynchrone, *pg_background* est clairement beaucoup plus performant mais
on atteint très vite les limites de ma machine concernant l'allocation dynamique
des segments de mémoire partagée, et ce dès 6 clients en parallèle :
```
ERROR:  unable to map dynamic shared memory segment
```
Cela donne tout de même une idée des performances que l'on peut attendre de ces
deux modules pour la gestion des transactions autonomes. Si l'applicatif utilise
intensivement les transactions autonomes, *pg_background* peut en améliorer les
performances en plus de simplifier la gestion de ces transactions.

Pour le mode asynchrone, voici la fonction utilisée avec *dblink* :

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

et pour *pg_background* :

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
END;
$body$
LANGUAGE plpgsql SECURITY DEFINER;
```
