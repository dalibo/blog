---
layout: post
title: Sortie de pgBadger 6.3
author: Gilles Darold
twitter_id: dalibo
github_id: 
tags: [PostgreSQL, performance, pgBadger]
---
DALIBO est fier d'annoncer la sortie de pgBadger 6.3.

PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement
des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->

Cette nouvelle sortie majeure règle plusieurs problèmes et ajoute quelques nouvelles fonctionnalités :

  * Un nouveau rapport détaillant l'activité des utilisateurs (temps cumulé d'exécution et nombre d'exécutions)  par Top requête. Ces détails sont visibles à partir d'un nouveau bouton "User(s) involved".
  * Ajout d'informations statistiques supplémentaires dans l'onglet Sessions des statistiques globales : moyenne du nombre de requête par session et durée moyenne des requêtes par session.
  * Ajout d'un histogramme sur les temps de connexions.
  * Utilisation de graphes à barres pour tous les histogrammes.

Il y a aussi de nouvelles fonctionnalités et options très interessantes :

  * Ajout de l'option -L | --logfile-list pour permettre la lecture d'un fichier contenant une liste des fichiers de log à traiter. Très utile lorsque le nombre de fichiers à traiter dépasse la limite du nombres d'arguments de la ligne de commande.
  * Ajout du support de log_timezones avec les signes + et - dans les timestamps avec millisecondes (%m).
  * Ajout de l'option --noreport pour forcer pgbadger à ne pas générer de rapport mais seulement la création des fichiers binaires. Ainsi il est possible de collecter les statistiques toutes les 5 minutes par exemple et de ne générer les rapports que toutes les heures.
  * Ajout de l'auto-detection de client=%h ou remote=%h dans les logs pour prendre en compte l'adresse ip du client sans avoir à spécifier le prefixe en ligne de commande. Un préfixe du type : '%t [%p]: [%l-1] user=%u,db=%d,client=%h ' sera donc autodétecté par pgbadger.
  * Redéfinition des limites de l'histogramme sur les durées des sessions pour être plus pertinent.
  * Ajout de l'option -M | --no-multiline pour ne pas collecter les lignes orphelines (requêtes multilignes) et empêcher de stocker des lignes de debug ou autres lignes polluant le log. Cette option ne devrait jamais être utilisée en fonctionnement normal.
  * Ajout de l'otpion --log-duration pour forcer pgbadger a associer les entrées des logs générées par l'activation de log_duration et log_statement. Ceci fonctionnera correctement dans la limite où la ligne sur la durée suit immédiatement la ligne sur la requête, c'est à dire sur un serveur de faible activité.

Le script pgbadger_tools, permettant d'étendre les capacités de pgBadger, a aussi été amélioré avec l'ajout de nouvelles fonctionnalités :

  * Ajout d'un nouvel outil à pgbadger_tool pour exporter les Top requêtes au format CSV pour analyse différée où inclusion dans un autre outil.
  * Ajout de deux nouvelles options à l'outil de génération ou exécution automatique des requêtes EXPLAIN, --explain-time-consuming et --explain-normalized. Ces otpions permettent de générer des requêtes EXPLAIN pour les requêtes qui ont consommées le plus de temps et les requêtes les plus lentes.

Pour la liste complète des améliorations, consultez la note de la nouvelle version :
https://github.com/dalibo/pgbadger/blob/master/ChangeLog

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant
remonté des bugs et des demandes, notamment briklen, Guillaume Le Bihan, Rodolphe Quiedeville,
Mael Rimbault, mbecroft, Grzegorz Garlewicz, Bill Mitchell, Julien Rouhaud, jacksonfoz, Hubert
Depesz Lubaczewski, Paolo Cavallini, MarcoTrek, jirihlinka, Josh Kupershmid, jason, Guillaume
Lelarge and Bruno Almeida.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement
sur notre liste de diffusion.


