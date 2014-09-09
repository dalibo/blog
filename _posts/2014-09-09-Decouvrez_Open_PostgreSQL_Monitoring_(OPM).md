---
layout: post
title: Découvrez Open PostgreSQL Monitoring (OPM) 
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, monitoring, graphs, dashboard]
---
##Surveillez et gérez vos serveurs PostgreSQL

//Paris, le 9 septembre 2014//

Le Groupe de Développement OPM (voir ci-dessous) est fier de présenter la première version publique du projet Open PostgreSQL Monitoring (OPM), une suite de monitoring entièrement libre pour PostgreSQL.

<!--MORE-->

##Obtenez graphiques et statistiques de vos instances PostgreSQL !

PostgreSQL est probablement la base de données la plus avancée au monde, mais son plus grand handicap était jusqu'alors le manque d'outils Open Source consacrés au monitoring. La communauté PostgreSQL n'a pas encore produit d'outils semblables à Oracle Grid Control, MySQL Workbench ou SQL Server Management Studio.

Aujourd'hui nous vous présentons le projet OPM: une suite entièrement Open Source, conçue pour fournir des graphiques dynamiques, des statistiques personnalisées, des analyses de performances, des vues d'ensemble de la santé des vos serveurs, etc. Si vous avez plusieurs instances PostgreSQL en production, OPM est l'outil idéal pour observer l'activité courante de vos bases de données, avec des statistiques utiles pour les DBA telles que la volumétrie des bases de données, le ratio de lecture en cache (hit/miss ratio), la latence de la réplication, la charge du système, les requêtes les plus longues, la génération des journaux de transactions, les verrous, le statut des processus backends, etc.

##Priorité à l'extensibilité

Cette version publique initiale est évidemment un premier pas vers plus de fonctions et de polyvalence. 

OPM est composé d'agents distants, d'un système de stockage de statistiques et d'une interface Web. La majorité du code a été écrit en Perl et la collecte des statistiques est basée sur Nagios. Cependant, la suite entière est conçue pour être étendue à d'autres frameworks de monitoring et d'autres langages. Il est possible de créer votre propre agent distant, un stockage de statistiques spécifique ou même une interface utilisateur alternative.

Le projet OPM a débuté en 2012 et a été utilisé en production pendant plusieurs mois, contrôlant parfaitement un grand nombre de serveurs. Nous publions aujourd'hui la version 2.3 avec l'espoir que cela sera utile à d'autres utilisateurs PostgreSQL dans le monde entier.

##Liens & Remerciements

Le Groupe de Développement OPM remercie tous les développeurs ayant contribué au projet, particulièrement Sébastien Fauveau de "Art is Code" pour ses compétences de design UI/UX.
 
OPM est un projet ouvert et disponible conformément à la Licence PostgreSQL. Toute contribution pour construire un meilleur outil est la bienvenue. Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur contact@opm.io.


* Site web : [http://opm.io/](http://opm.io/)
* Demo : [http://demo.opm.io/](http://demo.opm.io) (login/pass = opm/demo) 
* Twitter : [http://twitter.com/__opm__](@__opm__)

----

##A propos d'OPM :

Open PostgreSQL Monitoring est un Logiciel Libre conçu pour vous aider à gérer vos serveurs PostgreSQL. C'est un outil flexible qui suivra l'activité de chaque instance. Il peut rassembler des statistiques, des tableaux de bord d'affichage et envoyer des alertes lorsque quelque-chose tourne mal. Le but à long terme du projet est de fournir des fonctions semblables à celles d'Oracle Grid Control ou SQL Server Management Studio, pour PostgreSQL.

Code & Demo sur [http://opm.io/](http://opm.io/)

##A propos du Groupe de Développement OPM

Ce projet est conduit par le Groupe de Développement OPM (OPMDG), une équipe de développeurs réunis pour construire des outils de contrôle efficaces pour PostgreSQL. Jusqu'ici le sponsor principal de ce projet est DALIBO, le leader PostgreSQL en France. Cependant l'équipe projet est ouverte aux idées et aux contributions: les personnes et les entreprises qui partagent les buts de l'OPMDG sont invités à rejoindre l'équipe!
