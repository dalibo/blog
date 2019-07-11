---
layout: post
title: Sortie de pgBadger 8
author: Gilles Darold
twitter_id: pgbadger
github_id: 
tags: [postgresql, performance, pgbadger, dalibolabs]
---
DALIBO est fier d'annoncer la sortie de pgBadger 8.0.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->

Cette nouvelle version majeure apporte plusieurs nouveaux rapports et fonctionnalités. L'une des principales nouveautés est l'ajout du support des traces du pooler de connexion pgbouncer. 
  
Liste des autres nouveaux rapports dans cette version :

  * Traffic du nombre de requêtes
  * Traffic du nombre d'octets en E/S
  * Durées moyennes des requêtes
  * Nombre de sessions simultannées
  * Histogramme des durées de sessions
  * Répartition des sessions par base de données
  * Répartition des sessions par utilisateurs
  * Répartition des sessions par adresses ip
  * Nombre de connections établies
  * Répartition des connexions par base de données
  * Répartition des connexions par utilisateurs
  * Répartition des connexions par adresses ip
  * Pools de connexions réservés les plus utilisés
  * Erreurs/Evénements les plus fréquents

Les fichers de logs pgbouncer peuvent être traités par pgBadger ensemble avec les logs PostgreSQL, les logs pgbouncer sont détectés automatiquement.

Il y a aussi deux nouvelles options de ligne de commande :

  * --pgbouncer-only pour ne montrer que les rapports relatifs à pgbouncer.
  * --rebuild pour pouvoir regénérer les rapports HTML à partir des fichiers binaires encore disponibles dans le répertoires des rapports incrémentaux.

Cette nouvelle version corrige aussi un bug majeur introduit avec le support de journalctl qui empéchait l'utilisation des fonctionnalités de parallèlisation.

Pour la liste complète des améliorations et corrections, consultez la note de la nouvelle version :
[https://github.com/dalibo/pgbadger/blob/master/ChangeLog](https://github.com/dalibo/pgbadger/blob/master/ChangeLog)

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant remonté des bugs et des demandes, notamment Nicolas Gollet, Oskar Wiksten, Ronan Dunklau et Laurenz Albe.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
