---
layout: post
title: Nouvelle version 1.5 de pgFormatter !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, sql]

---
*Paris, le 19 Octobre 2015*

La nouvelle version 1.5 de pgFormatter est sortie aujourd'hui. Elle corrige certains problèmes et ajoute le support des nouveaux mots clefs relatifs à PostgreSQL 9.5. 
Elle inclut aussi une réécriture majeure du code par Hubert depesz Lubaczewski.
pg_format fonctionne comme auparavant (permettant les deux interfaces, CGI et CLI), mais vous pouvez accéder directement à ces fonctionnalités au niveau développement en utilisant les modules pgFormatter::*.

<!--MORE-->

Les nouveaux mots clés supportés sont : BERNOULLI, CUBE, GROUPING SETS, SKIP
LOCKED, LOGGED, POLICY, ROLLUP, TABLESAMPLE. Et les nouvelles fonctions sont :
jsonb_pretty, jsonb_set, pg_last_committed_xact, pg_xact_commit_timestamp.

Il y a aussi une astuce ajoutée à la documentation qui est très utile aux
utilisateurs de vi. Vous pouvez formater le code SQL directement depuis
vi en ajoutant une simpl ligne au fichier .vimrc. Pour plus de détails
consultez la documentation.  Cette astuce est issue du blog de David Fetter
[http://people.planetpostgresql.org/dfetter/index.php?/archives/78-Formatting!.html](http://people.planetpostgresql.org/dfetter/index.php?/archives/78-Formatting!.html)

## Liens

  * Site Web : [http://sqlformat.darold.net/](http://sqlformat.darold.net/)
  * Télécharger : [http://sourceforge.net/projects/pgformatter/](http://sourceforge.net/projects/pgformatter/)
  * Développement : [https://github.com/darold/pgFormatter](https://github.com/darold/pgFormatter)
  * ChangeLog : [https://github.com/darold/pgFormatter/blob/master/ChangeLog](https://github.com/darold/pgFormatter/blob/master/ChangeLog)

----

## À propos de pgFormatter :

pgFormatter est un outil Open Source gratuit qui permet de formater/embellir le code SQL. Il supporte
les mots clefs du SQL-92, SQL-99, SQL-2003, SQL-2008, SQL-2011 et les mots clefs spécifiques à PostgreSQL.
Il partage le même code que pgBadger, ainsi, la plupart des modifications et améliorations faites sur
pgFormatter sont reportées dans pgBadger. C'est un projet créé et maintenu par l'auteur de pgBadger, Gilles Darold.

