---
layout: post
title:  Sortie de PostgreSQL 9.5 bêta
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [postgresql, upgrade, beta, 9, big data]

---



Le PostgreSQL Global Development Group vient de publier la première version bêta de PostgreSQL 9.5. 
Cette version de test pour permet d'avoir un avant-goût des nouveautés qui seront présentes dans la version finale 
qui dervait sortir dans quelques semaines.

<!--MORE-->

## Cap sur le Big Data !

A l'occasion de la sortie de la première version de bêta de PostgreSQL 9.5, voici un petit tour d'horizon des avancées de cette nouvelle mouture.

Avec une version majeure tous les ans, PostgreSQL est le SGBD le plus dynamique et le plus innovant du marché. 
Chaque nouvelle sortie apporte de nombreuses améliorations dans différents domaines et la version 9.5 ne déroge pas
à la règle avec des fonctionnalités très attendues comme UPSERT, encore plus de fonctions JSON et un ensemble
d'innovations pour le Big Data, notamment : TABLESAMPLE, des avancées sur tables externes (FOREIGN DATA WRAPPERS), 
des nouvelles fonctions OLAP, des index BRIN particulièrement adaptés aux grands volumes de données. 
Utilisées conjointement, toutes ses fonctionnalités propulsent PostgreSQL vers les entrepôts de données et 
permettent aux utilisateurs de stocker toujours plus de données.

## Une Version riche en fonctionnalités

PostgreSQL 9.5 sera tellement riche en nouveautés et améliroations qu'il est difficile d'en faireue liste eshaustive ! 
Voici néanmoins quelques fonctionnalités qui ont retenu notre attention :

*  [TABLESAMPLE] 
*  [ROLLUP, CUBE, and GROUPING SETS] 
*  [Index BRIN]
*  [IMPORT FOREIGN SCHEMA] 
*  [JOIN pushdown]
*  [Row Level Security]


## Un tour d'Horizon

La 24 septembre dernier, Magnus Hagander était dans les locaux de Mozilla à Paris pour présenter cette nouvelle version. 

Retrouvez l'intégralité de sa présentation sur dans cette video :

[![PostgreSQL 9.5](http://img.youtube.com/vi/qluVWI1UKiM/0.jpg)](https://youtu.be/qluVWI1UKiM?list=PLdz5EN2NV_7BXtGhlWNWepg0HCJ68KXRk)

## Liens: 

* [Téléchargement]
* [Notes de version]
* [Annonce officielle]
* [Comment tester]


[Téléchargement]: http://www.postgresql.org/download
[Notes de version]: http://www.postgresql.org/docs/devel/static/release-9-5.html
[Annonce officielle]: http://www.postgresql.org/about/news/1614/
[Comment tester]: http://www.postgresql.org/developer/beta/
[TABLESAMPLE]: https://wiki.postgresql.org/wiki/TABLESAMPLE_Implementation
[ROLLUP, CUBE, and GROUPING SETS]: http://www.postgresql.org/docs/devel/static/queries-table-expressions.html#QUERIES-GROUPING-SETS
[Index BRIN]: http://www.postgresql.org/docs/devel/static/brin-intro.html
[IMPORT FOREIGN SCHEMA]: http://www.postgresql.org/docs/devel/static/sql-importforeignschema.html
[JOIN pushdown]: http://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=e7cb7ee14555cc9c5773e2c102efd6371f6f2005
[Row Level Security]: https://wiki.postgresql.org/wiki/Row-security
