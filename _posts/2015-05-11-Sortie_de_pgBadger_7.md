---
layout: post
title: Sortie de pgBadger 7
author: Gilles Darold
twitter_id: pgbadger
github_id: 
tags: [PostgreSQL, performance, pgBadger]
---
DALIBO est fier d'annoncer la sortie de pgBadger 7.0.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->

Cette nouvelle sortie majeure apporte plusieurs nouveaux rapports et fonctionnalités. L'une des principales nouveautés est l'ajout du support des traces de l'extension auto_explain, fonctionnalité demandée depuis longtemps. Le plan résultant de l'EXPLAIN est ainsi ajouté avec les requêtes les plus lentes dans le rapport pgBadger. Un lien est même disponible pour afficher ce plan directement sur le site  [http://explain.depesz.com/](http://explain.depesz.com/).
  
Liste des autres nouveaux rapports dans cette version :

  * Distribution des événements (panic, fatal, error et warning) par période de 5 minutes;
  * Détails sur l'utilisation par application (durée cumulée et nombre d'exécutions) pour les top requêtes. Les détails sont visibles en cliquant sur un bouton nommé "App(s) involved";
  * Les temps cumulés d'exécution de requêtes par utilisateur.

Trois nouveaux rapports vont permettre de mieux identifier les requêtes annulées sur les serveurs secondaires :

  * Nombre de requêtes annulées par période de 5 minutes (graphe);
  * Les requêtes provoquant le plus d'annulations (N);
  * Requêtes individuelles les plus annulées.

Pour la liste complète des améliorations, consultez la note de la nouvelle version :
[https://github.com/dalibo/pgbadger/blob/master/ChangeLog](https://github.com/dalibo/pgbadger/blob/master/ChangeLog)

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant remonté des bugs et des demandes, notamment Mael Rimbault, Thomas Reiss, Korriliam, rlowe and Antti Koivisto.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
