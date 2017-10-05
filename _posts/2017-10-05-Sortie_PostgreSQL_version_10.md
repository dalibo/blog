---
layout: post
title: Sortie de PostgreSQL version 10
author: Thibaut Madelaine, Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [sgbd, postgresql, version, 10, release, sgbdr]

---

*Paris, le 05 octobre 2017*

La version 10 de notre Système de Gestion de Base de Donnée (SGBD) préféré PostgreSQL est sortie. Après plusieurs mois de tests, PostgreSQL 10 sort officiellement, pour le plus grand plaisir de nos experts, mais également de nos clients.

<!--MORE-->

Ce que nous voulons savoir maintenant, ce sont les différences entre cette nouvelle version et l'ancienne (9.6). C'est pourquoi nous vous avons concocté un résumé des principales nouvelles fonctionnalités de cette version.


  * [Nouveau système de numérotation des versions](http://www.databasesoup.com/2016/05/changing-postgresql-version-numbering.html) :
Jusqu'à maintenant, la version majeure était exprimée sur 2 nombres (8.4, 9.5), on passe avec la 10 en version majeure sur un seul nombre. Ce point est important car un changement de version majeure implique une migration des données. Une opération beaucoup plus lourde que la seule mise à jour des exécutables !

  * [Le partitionnement déclaratif](http://pgday.fr/slides/darold_pgday_2017_partitionnement.pdf) : 
Le partitionnement est dorénavant intégré au moteur pour une administration simplifiée et de bien meilleures performances qu'avec le partitionnement par héritage.

  * [Réplication logique](https://blog.anayrat.info/2017/07/29/postgresql-10-et-la-replication-logique-fonctionnement/) : 
La réplication logique est possible depuis longtemps... mais grâce à des logiciels externes. Elle est désormais intégrée dans le coeur de PostgreSQL !

  * Performances : 
après les deux fonctionnalitées phares, les performances ne sont pas en reste avec entre autre 4 nouvelles opérations parallélisables, des gains sur les tris, sur les FDW, l'apparition des statistiques multi-colonnes, la journalisation des index hash.

  * Changements de nommage : 
attention, avec cette nouvelle version le mot 'xlog' est transformé en 'wal' dans les noms de fichiers et de fonctions. De même 'clog' devient 'xact'. Le fichier de log applicatif 'pg_log' est renommé en 'log'.

  * Pour encore plus de sécurité, le [protocole SCRAM-SHA-256 fait son apparition](http://paquier.xyz/postgresql-2/postgres-10-scram-authentication/) dans la liste des méthodes d'authentification.


N'ayez craintes, les outils Dalibo et communautaires seront tous compatible avec cette nouvelle version, d'ailleurs, bon nombre d'entre eux le sont déjà, entre autres: PoWA, HypoPG, PAF, check_pgactivity, ldap2pg, pgBadger, pgcluu, ora2pg et pg_activity.

Et maintenant, c'est fini ?
Evidemment que non, le projet a encore de nombreuses [pistes d'améliorations](https://wiki.postgresql.org/wiki/Todo) ([Voir également ici](https://wiki.postgresql.org/wiki/PostgreSQL11_Roadmap)) et un certain nombre d'entre elles seront dans la future version 11 qui sortira dans 12 mois.
Un article plus complet sera poster plus tard aujourd'hui, dès que PostgreSQL 10 sera disponible.
