---
layout: post
title: Sortie de pgBadger 9
author: Gilles Darold
twitter_id: pgbadger
github_id: 
tags: [PostgreSQL, performance, pgBadger]
---
DALIBO est fier d'annoncer la sortie de pgBadger 9.0.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour
produire rapidement des rapports détaillés à partir de vos fichiers
de logs Postgres.

<!--MORE-->

Cette nouvelle version majeure intègre la librairie Bootstrap 3 et
une mise à jour de toutes les librairies Javascripts et ressources
CSS utilisées par pgBadger. Elle intègre aussi un certain nombre de
corrections de bugs et d'améliorations de fonctionnalités.

La compatibilité avec les anciens rapports générés en mode incrémental
a été préservée dans cette version majeure par la création d'un sous
répertoire dédié aux nouveaux fichiers de ressources et éviter ainsi
l'écrasement des fichiers javascript et css précédents.

Pour la liste complète des améliorations et corrections, consultez
la note de la nouvelle version : [https://github.com/dalibo/pgbadger/blob/master/ChangeLog](https://github.com/dalibo/pgbadger/blob/master/ChangeLog)

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et
les utilisateurs ayant remonté des bugs et des demandes, notamment
Guillaume Lelarge, Julien Tachoires, clomdd, jacksonfoz, Michael Paquier
et surtout Christoph Berg pour son aide dans la standardisation de
la distribution pour les paquets Debian.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
