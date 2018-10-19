---
layout: post
title: Sortie de PostgreSQL v11 - release note !
author: Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, 11, 10, release, note, sortie, version, foss, floss, 2018]
---

---

*Paris, le 19 octobre 2018*

**La version 11 de notre Système de Gestion de Base de Donnée (SGBD) préféré PostgreSQL est sortie. Après plusieurs mois de tests, PostgreSQL 11 sort officiellement, pour le plus grand plaisir de nos experts, qui vous ont traduit la "release note".**

<!--MORE-->

Le PostgreSQL Global Development Group a annoncé aujourd'hui la sortie de PostgreSQL 11, la nouvelle version de la base de données open-source la plus avancée au monde.

PostgreSQL 11 apporte aux utilisateurs une amélioration générale de ses performances, en particulier pour les bases de données de très gros volume ou supportant des charges de calcul importantes. De plus, PostgreSQL 11 améliore significativement le système de partitionnement des tables, ajoute le support des procédures stockées capables de gérer des transactions, améliore la parallélisation des requêtes et de certaines commandes de définition des données et introduit la compilation « à la volée » (JIT, _Just in Time_) afin d'accélérer l'exécution des expressions dans les requêtes.

*« Pour PostgreSQL 11, notre communauté de développeurs s'est concentrée sur l'ajout de fonctionnalités qui améliorent la capacité de PostgreSQL à gérer de très grosses bases de données » a déclaré Bruce Momjian, membre de la _Core team_ du PostgreSQL Global Development Group. « En plus de ses performances connues en environnement transactionnel, PostgreSQL 11 permet désormais aux développeurs de créer des applications de _big data_ à grande échelle. »*

PostgreSQL bénéficie de plus de 20 ans de développement open source et est devenu la base de données relationnelle open source préférée des développeurs. La reconnaissance du projet continue à s'étendre au sein de l'industrie et il a été désigné comme « DBMS of the Year 2017 » par DB-Engines et dans le SD Times 2018 100.

PostgreSQL 11 est la première version majeure depuis la sortie de PostgreSQL 10 le 5 octobre 2017. La prochaine version de PostgreSQL 11, contenant des corrections de bogues, sera la version 11.1. La prochaine mise à jour majeure avec de nouvelles fonctionnalités sera la version 12.

### Meilleures robustesse et performance dans le partitionnement

PostgreSQL 11 ajoute le partitionnement de données selon une clé de hachage,
aussi nommé «partition par hachage». Cette méthode s'ajoute aux partitionnements par valeurs ou par
intervalles déjà existants. PostgreSQL 11 améliore encore ses capacités de fédération de données
avec de nouvelles fonctionnalités concernant les partitions accessibles via postgres_fdw, le connecteur de tables distantes.

Pour faciliter la gestion des partitions, PostgreSQL 11 permet d'utiliser une partition par défaut pour les données qui ne correspondent à aucune autre partition. Il est aussi désormais possible de créer des clés primaires, des clés étrangères, des index et des triggers sur les tables partitionnées, qui sont tous propagés aux partitions. Enfin, en cas de modification de la valeur de la clé de partitionnement, PostgreSQL 11 supporte désormais le déplacement des lignes concernées vers la bonne partition.

PostgreSQL 11 améliore les performances des requêtes en utilisant une nouvelle stratégie d'exclusion des partitions non concernées. De plus, PostgreSQL 11 supporte enfin pour les tables partitionnée la fonctionnalité populaire « UPSERT », qui aide les utilisateurs à simplifier leur code et réduire le trafic réseau.


### Transactions dans les procédures stockées

Les développeurs peuvent créer leurs fonctions dans PostgreSQL depuis plus de 20 ans, mais ces fonctions étaient incapables de gérer leurs propres transactions. PostgreSQL 11 ajoute les procédures SQL, possédant toutes les capacités de gestion de transactions au sein d'une fonction, permettant aux développeurs de créer des applications toujours plus évoluées côté serveur, telles que celles responsables de chargements de données incrémentaux.

Les procédures SQL sont créées avec la commande `CREATE PROCEDURE`, et sont exécutées avec `CALL`. Côté serveur, elles peuvent être écrites avec les langages procéduraux PL/pgSQL, PL/Perl, PL/Python et PL/Tcl.


### Améliorations de la parallélisation des requêtes

PostgreSQL 11 améliore les performances des requêtes parallélisées, avec des gains concernants la parallélisation des parcours séquentiels et des jointures par hachage, ainsi qu'un parcours plus efficace des tables partitionnées. PostgreSQL peut désormais paralléliser des requêtes utilisant `UNION` si les requêtes sous-jacentes ne sont pas parallélisables.

PostgreSQL 11 supporte la parallélisation de plusieurs commandes de définition des données, notamment la création d'index B-tree générés par la commande `CREATE INDEX` habituelle. Plusieurs autres commandes qui créent des tables ou des vues matérialisées à partir de requêtes sont à présent parallélisables, y compris  `CREATE TABLE .. AS`, `SELECT INTO` et `CREATE MATERIALIZED VIEW`.

### JIT : compilation à la volée des expressions

PostgreSQL 11 introduit le support de la compilation JIT (_Just In Time_, « à la volée ») qui accélère l'exécution de certaines expressions au sein des requêtes. La compilation JIT repose sur le projet LLVM pour optimiser l'exécution d'expressions au sein des clauses WHERE, des listes résultat, des agrégats, des projections et de certaines opérations internes.

Pour profiter de la compilation JIT, vous devrez installer les dépendances LLVM et activer la compilation JIT dans le fichier de configuration avec  `jit = on` ou dans votre session PostgreSQL en exécutant `SET jit = on`.

### Améliorations générales pour l'utilisateur

Les améliorations de la base de données relationnelle PostgreSQL ne seraient pas possibles sans les retours d'une communauté active et le dur labeur des gens qui travaillent sur PostgreSQL. Nous présentons ici quelques unes des nombreuses fonctionnalités ajoutées à PostgreSQL 11 pour améliorer l'expérience utilisateur :

  * La commande `ALTER TABLE .. ADD COLUMN .. DEFAULT ..` sur une colonne `NOT NULL` n'a plus besoin de réécrire la table entière à l'exécution, ce qui apporte un gain de performance important à l'exécution de cette commande.
  * Les « index couvrants » permettent à l'utilisateur d'ajouter des colonnes supplémentaires dans un index avec la clause `INCLUDE`. Ces colonnes sont utiles pour privilégier des parcours d'index seuls, surtout avec des types de données habituellement non indexables par des index B-tree.
  * De nouvelles fonctionnalités des fonctions de fenêtrage, dont la possibilité de compléter `RANGE` par `PRECEDING`/`FOLLOWING`, `GROUPS` et des clauses d'exclusion.
  * Le support de `quit` et `exit` dans l'interface en ligne de commande rendent plus aisée la sortie de l'outil.


Pour la liste complète des nouvelles fonctionnalités de cette version, merci de lire les notes associées que trouverez à cette adresse : https://www.postgresql.org/docs/11/static/release-11.html

### À propos dePostgreSQL

PostgreSQL est le système de gestion de base de données open-source le plus performant au monde, avec une communauté internationale de milliers d'utilisateurs, contributeurs, entreprises et organisations. Le projet PostgreSQL se base sur plus de 30 ans d'ingéniérie informatique, dont le développement a débuté à l'Université de Californie à Berkeley et a depuis continué à une allure incomparable par sa communauté. 
PostgreSQL possède un ensemble de fonctionnalités matures, qui non seulement est au niveau des meilleures bases de données propriétaires, mais les dépasse dans les fonctionnalités avancées, l'extensibilité, la sécurité et la stabilité. Apprenez-en plus sur PostgreSQL et rejoignez notre communauté sur  https://www.postgresql.org.


### Liens)
 * Téléchargement : [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
 * Notes de version : [https://www.postgresql.org/docs/11/static/release-11.html](https://www.postgresql.org/docs/11/static/release-11.html)
 * Page sécurité : [https://www.postgresql.org/support/security/](https://www.postgresql.org/support/security/)
 * Politique de versionnement : [https://www.postgresql.org/support/versioning/](https://www.postgresql.org/support/versioning/)
 * Suivez @postgresql sur Twitter: [https://twitter.com/postgresql](https://twitter.com/postgresql)
