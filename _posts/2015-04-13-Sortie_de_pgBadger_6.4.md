---
layout: post
title: Sortie de pgBadger 6.4
author: Gilles Darold
twitter_id: dalibo
github_id: 
tags: [PostgreSQL, performance, pgBadger, Dalibo Labs]
---
DALIBO annonce la sortie de pgBadger 6.4, une version de maintenance.

PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement
des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->

Cette nouvelle sortie est principalement une version de maintenance. Elle corrige un problème majeur
qui conduisait à la disparition des opérateurs dans les requêtes SQL lors de leur réécritures pour
formattage et embellissement.

Il y a aussi des améliorations très interessantes :

  * Traitement complet des fichiers au format csvlog même après une erreur.
  * La partie anonymisation a été grandement améliorée :
    * Les mêmes valeurs sont dorénavant substituées par la même chaine de caractères.
    * Les formats de date (ex : 'DD/MM/YYYY HH24:MIN:SS') ne sont plus substitués.
    * Les intervalles (interval '1 days') non plus.

Pour la liste complète des améliorations, consultez la note de la nouvelle version :
https://github.com/dalibo/pgbadger/blob/master/ChangeLog

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant
remonté des bugs et des demandes, notamment Hubert Depesz Lubaczewski, Thomas Reiss et Sergey
Burladyan.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement
sur notre liste de diffusion.


