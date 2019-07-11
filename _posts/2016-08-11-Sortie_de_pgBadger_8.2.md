---
layout: post
title: Sortie de pgBadger 8.2
author: Gilles Darold
twitter_id: pgbadger
github_id: 
tags: [postgresql, performance, pgbadger, release, dalibolabs]
---
DALIBO est fier d'annoncer la sortie de pgBadger 8.2.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->
Il s'agit d'une version de maintenance corrigeant un certain nombre de bugs mineurs.
Elle apporte aussi une amélioration des performances, jusqu'à 20% sur les fichiers
de logs volumineux, et quelques nouvelles fonctionnalités intéressantes :

   * Le multiprocessus peut être utilisé avec les logs pgbouncer.
   * Les logs pgbouncer et PostgreSQL peuvent être traités ensemble en mode incremental.
   * Avec le même prefix ou celui par défaut, les fichiers de log stderr et syslog peuvent être traités en même temps, le format csvlog lui peut toujours être utilisé.
   * Utilisation d'une fenêtre de dialogue modale pour le téléchargement des graphes en images png.
   * Ajout des informations relatives aux fonctions pl/pgSQL dans le detail des requêtes d'exemples.

Pour la liste complète des améliorations et corrections, consultez la note de la nouvelle version :
[https://github.com/dalibo/pgbadger/blob/master/ChangeLog](https://github.com/dalibo/pgbadger/blob/master/ChangeLog)

Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant remonté des bugs et des demandes, notamment Thomas Reiss, tom__b, brafaeloliveira, Glyn Astill, Robert Vargason et Komeda Shinji.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
