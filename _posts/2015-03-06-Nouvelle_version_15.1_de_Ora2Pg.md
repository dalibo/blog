---
layout: post
title: Nouvelle version 15.1 d'Ora2Pg !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 6 mars 2015*

La nouvelle version 15.0 d'Ora2Pg avec dans la foulée un correctif et une version 15.1 sont sortis le mois dernier. L'outil libre et gratuit de migration des bases Oracle vers PostgreSQL propose toujours plus de fonctionnalités.

<!--MORE-->

## Nouvelles fonctionnalités

Parmis ces nouvelles fonctionnalités on peut citer la possibilité d'exporter les BFILES tels quels en utilisant la nouvelle extension external_file [https://github.com/darold/external_file](https://github.com/darold/external_file), mais aussi le support des transactions autonomes avec l'utilisation de l'extension dblink et de fonctions d'encapsulation.

Cette version permet aussi :

  * l'export des DIRECTORY en lien avec l'extension external_file et notamment des privilèges d'accès à ces DIRECTORY ;
  * les DATABASE LINK d'Oracle sont maintenant exportés en tant que source de données externe (Foreign Data Wrapper) en utilisant l'extension oracle_fdw ;
  * les SYNONYMS que l'on retrouve souvent dans les schémas Oracle sont maintenant exportés en tant que vues. S'il s'agit de SYNONYM utilisant des DATABASE LINK, ils pourront être pris en compte en utilisant l'extension oracle_fdw ;
  * Ora2Pg ajoute deux directives de configuration supplémentaires, TRIM_TYPE et TRIM_CHAR, qui permettent de controler ce qui doit être fait lorsque l'on passe d'un CHAR(n) à un Character Varying (n). Par défaut Ora2Pg enlève tous les espaces en début et fin de chaine.
  * Les contraintes sur les types spatiaux sont maintenant automatiquement déduites des paramètres des index définis sous Oracle.
  * Ajout de l'export des sous partitions Oracle, jusqu'à présent Ora2Pg se limitait aux partitions principales.
  * les directives ALLOW et EXCLUDE ont été entièrement revues pour permettre un filtre au niveau des différents object.

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

