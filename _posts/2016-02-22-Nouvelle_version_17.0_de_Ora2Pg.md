---
layout: post
title: Nouvelle version 17.0 d'Ora2Pg !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 22 Fevrier 2016*

La nouvelle version 17.0 d'Ora2Pg vient d'être publiée. Il s'agit d'une version majeure apportant un nouveau type d'action permettant d'obtenir un décompte de tous les objets, clé primaires, contraintes, index, triggers, etc., des deux cotés, Oracle et PostgreSQL.

<!--MORE-->

Pour réaliser une comparaison entre les deux bases de données et vérifier que la migration s'est bien déroulée, il suffit de définir la connexion vers Oracle et vers PostgreSQL dans le fichier de configuration, puis d'exécuter ora2pg comme suit:

   ora2pg -c config/ora2pg.conf -t TEST > migration_diff.txt

Un nouvelle option de ligne de commande a aussi été ajoutée au script ora2pg:

  * --count_rows : permet de demander à ora2pg de réaliser le comptage exact du nombre de ligne des deux cotés, Oracle et PostgreSQL après la migration. Uniquement disponible avec l'action TEST.

Pour voir un exemple de rapport de comparaison de migration, reportez vous à la documentation.

De nombreux correctifs ont été apportés, pour avoir la liste complète, consulter le [changelog](https://github.com/darold/ora2pg/changelog).

## Liens

  * Site Web : [https://ora2pg.darold.net/](https://ora2pg.darold.net/)
  * Télécharger : [https://sourceforge.net/projects/ora2pg/](https://sourceforge.net/projects/ora2pg/)
  * Développement : [https://github.com/darold/ora2pg](https://github.com/darold/ora2pg)

----

## À propos d'Ora2Pg :

Ora2Pg est un outil Open Source gratuit qui permet de convertir les bases de données Oracle et MySQL en PostgreSQL.
Il se connecte à la base Oracle ou MySQL, scanne la base, en extrait les structures de données puis génère des scripts
SQL qui permettront en les injectant dans PostgreSQL d'avoir la même base de données, mais en format PostgreSQL.
Il permet aussi la migration automatique des données de la base Oracle en passant par des fichiers ou de les
charger directement dans PostgreSQL. Certaines fonctionnalités très avancées permettent l'audit d'une base
Oracle et la génération d'un rapport d'estimation du coût de la migration vers PostgreSQL.

