---
layout: post
title: Sortie de sqlserver2pgsql 1.0 
author: Marc Cousin
twitter_id: 
github_id: 
tags: [PostgreSQL, SQLServer, migration]
---

Il y a bientôt 4 ans, naissait le logiciel sqlserver2pgsql. Au fil du temps, il s'est bien enrichi. Il est donc grand temps de le baptiser !
Nous avons donc le plaisir d'annoncer la sortie officielle de **sqlserver2pgsql version 1.0**.

Au fait, il sert à quoi ce logiciel ?
Comme son nom l'indique, cet outil facilite les migrations des bases MS-SQLServer vers PostgreSQL.

<!--MORE-->

Plus précisément, à partir d'un dump de schéma SQLServer, l'outil produit :

  * des scripts __psql__ permettant d'obtenir le **DDL PostgreSQL** équivalent,
  * des fichiers de description de jobs __Pentaho Data Integrator__ (Kettle) pour migrer les **données** en toute souplesse et efficacité avec cet ETL. Il est de plus possible de migrer les données de manière incrémentale pour faciliter le traitement des gros volumes.

Ainsi la plupart des structures et les contenus de données sont migrables facilement. Notez néanmoins que l'outil ne peut traiter le code __TSQL__, trop éloigné du __PL/pgSQL__ (ou de tout autre langage PL utilisable avec PostgreSQL).

Sponsorisé par Dalibo, sqlserver2pgsql est diffusé sous licence Open Source (GPL v3). Il est disponible sur github [https://github.com/dalibo/sqlserver2pgsql](https://github.com/dalibo/sqlserver2pgsql).

N'hésitez donc pas à le tester, à l'utiliser, à en abuser ... et nous remonter vos remarques, difficultés (s'il y en a) et retours positifs (au cas où...).

Liens & Remerciements

Nous souhaitons remercier les développeurs et utilisateurs ayant déjà fait des retours.

sqlserver2pgsql étant un projet ouvert, toute contribution est la bienvenue pour améliorer l'outil. Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub.

