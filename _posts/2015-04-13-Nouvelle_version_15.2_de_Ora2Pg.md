---
layout: post
title: Nouvelle version 15.2 d'Ora2Pg !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 13 avril 2015*

La nouvelle version 15.2 d'Ora2Pg vient tout juste de sortir. L'outil libre et gratuit de migration des bases Oracle vers PostgreSQL propose toujours plus de fonctionnalités.

<!--MORE-->

## Nouvelles fonctionnalités

Parmis ces nouvelles fonctionnalités on peut citer l'ajout de deux nouvelles directives de configuration :

  * ORA_INITIAL_COMMAND pour permettre l'exécution d'une commande juste après la connexion à la base Oracle. Par exemple pour désactiver une police de sécurité avant de procéder à l'export des données.
  * INTERNAL_DATE_MAX permettant de changer le comportement d'Ora2Pg en ce qui concerne la transformation du format des dates dans les types définis par l'utilisateur. Ceci ne concerne que les types utilisateurs possédant une colonne timestamp, dans ce cas DBD::Oracle renvoi la date au format interne d'Oracle (01-JAN-77 12.00.00.000000 AM), toute année supérieure à 49 sera considérée comme datant de 1900 et toute date inférieure ou égale à 49 comme étant de 2000.

Cette version permet aussi l'ordonnancement de l'export des vues en prenant en compte leur interdépendances.

De nombreux correctifs ont été apportés, pour avoir la liste complète, consulter le [changelog](https://github.com/darold/ora2pg/changelog).

## Liens

  * Site Web : [http://ora2pg.darold.net/](http://ora2pg.darold.net/)
  * Télécharger : [https://sourceforge.net/projects/ora2pg/](https://sourceforge.net/projects/ora2pg/)
  * Développement : [https://github.com/darold/ora2pg](https://github.com/darold/ora2pg)

----

## À propos d'Ora2Pg :

Ora2Pg est un outil Open Source gratuit qui permet de convertir les bases de données Oracle en PostgreSQL.
Il se connecte à la base Oracle, scanne la base, en extrait les structures de données puis génère des scripts
SQL qui permettront en les injectant dans PostgreSQL d'avoir la même base de données, mais en format PostgreSQL.
Il permet aussi la migration automatique des données de la base Oracle en passant par des fichiers ou de les
charger directement dans PostgreSQL. Certaines fonctionnalités très avancées permettent l'audit d'une base
Oracle et la génération d'un rapport d'estimation du coût de la migration vers PostgreSQL.

