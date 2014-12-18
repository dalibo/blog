---
layout: post
title:   PostgreSQL 9.4 améliore la flexibilité, la scalabilité et les performances
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL]

---
Paris, le 18 décembre 2014

Le PostgreSQL Global Development Group annonce la sortie de PostgreSQL 9.4, la dernière version majeure de la base de données open source la plus avancée. Cette version apporte de nombreuses nouvelles fonctionnalités qui améliorent la flexibilité, la scalabilité et les performances de PostgreSQL pour la plupart des utilisateurs, avec notamment l'amélioration du support de JSON, de la réplication et des performances sur les index.

<!--MORE-->

Flexibilité
-----------

Avec le nouveau type de données JSONB, les utilisateurs de PostgreSQL n'ont plus besoin de choisir entre une organisation relationnelle et non-relationnelle des données : ils peuvent utiliser les deux en même temps.

JSONB permet d'effectuer des recherches rapides et d'exprimer des conditions de recherches simples en utilisant les index GIN (Generalized Inverted Index). Plusieurs nouvelles fonctions permettent aux utilisateurs d'extraire et de manipuler des données JSON, avec des performances égales voire supérieures à celles des bases de données orientées documents les plus populaires. Avec JSONB, les données relationnelles peuvent être facilement associées à des données issues de documents pour une intégration complète dans un même environnement de bases de données.

Pour Damien Clochard, Directeur de Opérations chez DALIBO : "L'arrivée de JSONB est une évolution majeure pour les développeurs Javascript. De nombreuses applications initialement basées sur MongoDB vont pouvoir bénéficier de la sécurité et de la robustesse de PostgreSQL, avec des performances équivalentes voire meilleures".


Scalabilité
-----------

En 9.4, le décodage logique apporte une nouvelle API pour lire, filtrer et manipuler le flux de réplication de PostgreSQL. Cette interface apporte le fondement de nouveaux outils de réplication, comme la réplication bi-directionnelle, qui autorise la création d'instances multi-maîtres PostgreSQL. D'autres améliorations ont été apportées au système de réplication comme les slots de réplication et les réplicats décalés dans le temps, améliorant la gestion et l'utilité des serveurs secondaires.

Selon Jean-Paul Argudo, directeur de DALIBO, cette avancée est une première étape qui promet un avenir radieux à PostgreSQL : "Le décodage logique ouvre la voie vers la réplication master-master, une fonctionnalité très attendue par nos clients.  Jusqu'à présent ce n'est possible que via des solutions externes. Pas à pas la communauté PostgreSQL répond aux attentes de sa base d'utilisateurs : avec le Hot Standby, la Streaming Replication et bientôt la réplication bi-directionnelle, PostgreSQL s'affirme comme un SGBD de référence en terme de haute-disponibilité"



Performance
-----------

La version 9.4 apporte de nombreuses améliorations des performances qui permettront à ses utilisateurs de mieux tirer profit de leurs serveurs PostgreSQL. Parmi ces améliorations :
  * Améliorations sur les index GIN, les rendant jusqu'à 50% plus petits et jusqu'à trois fois plus rapides.
  * Rafraîchissement non-bloquant des vues matérialisées pour produire des rapports à jour plus rapidement.
  * Chargement plus rapide du cache de la base après un redémarrage avec pg_prewarm.
  * Optimisation des écritures concurrentes dans les journaux de transactions.




Liens
-----

  * Downloads: [http://www.postgresql.org/downloads](http://www.postgresql.org/downloads)

  * Press Kit: [http://www.postgresql.org/about/press/presskit94](http://www.postgresql.org/about/press/presskit94)

  * Release Notes: [http://www.postgresql.org/documentation/current/static/release-9-4](http://www.postgresql.org/documentation/current/static/release-9-4)

  * What's New in 9.4: [https://wiki.postgresql.org/wiki/What%27s_new_in_PostgreSQL_9.4](https://wiki.postgresql.org/wiki/What%27s_new_in_PostgreSQL_9.4)
