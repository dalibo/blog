---
layout: post
title: Sortie de pgBadger 9.1
author: Gilles Darold
twitter_id: pgbadger
github_id: 
tags: [PostgreSQL, performance, pgBadger]
---
DALIBO est heureux d'annoncer la sortie de pgBadger 9.1.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement des rapports détaillés à partir de vos fichiers de logs PostgreSQL.

<!--MORE-->
Il s'agit d'une version de maintenance corrigeant un certain nombre de bugs mineurs.
Elle apporte aussi un nouveau rapport affichant le répartition des classes d'erreurs
et quelques améliorations de fonctionnalités :

  * Ajout d'un rapport sur la distribution des classes d'erreurs lorsque le code SQLState est disponible dans les traces, ce qui implique d'avoir `%e` positionné dans le log_line_prefix.
  * Mise à jour du formatage SQL à partir de la version v1.6 de pgFormatter.
  * Amélioration de la normalisation des messages d'erreur.
  * Ajout de l'option `--normalized-only` pour la génération d'un fichier texte contenant toutes les requêtes normalisées trouvées dans les traces ainsi que leur nombre.
  * Autorise l'utilisation de `%c` (id de session) en remplacement de `%p` (le pid) comme identifiant unique de session indeispensable au bon fonctionnement de pgBadger.
  * Les messages `waiting for lock` sont maintenant remontés dans le rapport des événements pour pouvoir être visualisé si l'option `-w` ou `--watch-mode` est utilisée.
  * Ajout de l'option `--start-monday` pour commencer les semaines le lundi sur l'index du mode incrémental au lieu du dimanche.

Pour la liste complète des améliorations et corrections, consultez la note de la nouvelle version :
[https://github.com/dalibo/pgbadger/blob/master/ChangeLog](https://github.com/dalibo/pgbadger/blob/master/ChangeLog)

Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant remonté des bugs et des demandes, notamment jacks33, clomdd, Nicolas Gollet, Thibaut Madelaine, Eric Jensen, Jesus Adolfo Parra, Jon Nelson, Jerryliuk, Yosuke Tomita, Joosep Mae, Yves Martin, mark-a-s et Michael Chesterton.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
