---
layout: post
title: Nouvelle version 17.2 d'Ora2Pg !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 24 Mars 2016*

La nouvelle version 17.2 d'Ora2Pg vient d'être publiée. Il s'agit d'une version mineure corrigeant un certain nombre de problèmes remontés par les utilisateurs depuis la version majeure [17.0](http://blog.dalibo.com/2016/02/22/Nouvelle_version_17.0_de_Ora2Pg.html). Elle ajoute aussi deux nouvelles fonctionnalités:

  * La possibilité de transformer à la volée les types NUMBER(x,y) en booléens.
  * La possibilité de relocaliser complètement l'installation d'Ora2Pg dans un répertoire avec la commande `perl Makefile.PL DESTDIR=/opt/ora2pg` avant l'installation par make.

<!--MORE-->

De nombreux correctifs ont été apportés, pour avoir la liste complète, consulter le [changelog](https://github.com/darold/ora2pg/changelog).

## Liens

  * Site Web : [http://ora2pg.darold.net/](http://ora2pg.darold.net/)
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

