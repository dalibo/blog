---
layout: post
title: POWA ! Analysez votre trafic PostgreSQL en direct !
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, optimisation, performance, monitoring, PoWA, pg_stat_statements, analyse]
---
DALIBO vous présente la première version publique de POWA, un nouvel outil d'optimisation et de suivi pour PostgreSQL.

<!--MORE-->

## Analyse de trafic en temps réel et graphes dynamiques 

POWA est un analyseur de trafic ("workload analyzer") qui va vous donner une vision claire de l'activité en cours sur vos serveurs PostgreSQL par le biais d'un graphe présentant les temps d'exécution, un graphe des blocks hit/read ainsi qu'un tableau listant les requêtes les plus coûteuses sur la période sélectionnée.

En zoomant sur l'un des graphes, le tableau s'ajuste et vous affiche les requêtes qui se sont exécutées sur cette période. En cliquant sur une requête spécifique, vous obtenez des graphiques supplémentaires : temps de lecture/écriture, nombre de lignes affectées, etc.

Un ensemble de fonctions PL est également disponible pour accéder et gérer les statistiques.


## Au-delà de pg_stat_statements

Concrètement POWA est une extension PostgreSQL conçue pour historiser les informations fournies par l'extension pg_stat_statements. Elle fournit des fonctions SQL qui collectent les informations utiles à une fréquence définie.

Cette première version est prête pour être mise en production même s'il reste bien sûr de nombreux axes d'amélioration. Installez-la (ou testez notre site demo) et faites nous savoir ce que vous en pensez.
Nous avons besoin actuellement de vos remarques et de vos idées, notamment pour améliorer l'IHM...

POWA est disponible sous licence PostgreSQL. Le code est écrit en C et en SQL. L'interface est basée sur Perl et Mojolicious. Évidement les stats sont stockées dans une base PostgreSQL :-)

Pour une liste exhaustive des changements, consultez les notes de version : 
[https://github.com/dalibo/powa/blob/master/CHANGELOG.md](https://github.com/dalibo/powa/blob/master/CHANGELOG.md)

## Remerciements

DALIBO souhaite remercier tous les développeurs ayant contribué à cette version, notamment : Marc Cousin pour l'idée originale et Julien Rouhaud pour ses efforts sur l'IHM.

POWA est un projet ouvert disponible sous licence PostgreSQL. Toute contribution pour améliorer l'outil est la bienvenue. Vous pouvez envoyer vos idées, vos demandes et vos patchs via Github ou directement à l'adresse powa@dalibo.com

## Liens :

  * Télécharger : [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)
  * Demo : [http://demo-powa.dalibo.com](http://demo-powa.dalibo.com)  (login/pass = powa/demo)

--------------

**À propos de POWA** :

PoWA est un analyseur de trafic PostgreSQL qui collecte des statistiques en temps réel et affiche des tableaux et des graphes en temps réel pour vous aider à superviser et optimiser vos instances PostgreSQL. C'est un outil similaire à Oracle AWR ou SQL Server MDW.

Code & Demo sur [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)

--------------

**À propos de DALIBO** :

DALIBO est le spécialiste français de PostgreSQL et propose du support, de la formation et du conseil depuis 2005. La société est active au sein de la communauté PostgreSQL de différentes manières, notamment : des développements, des articles, de la traduction, des conférences ouvertes à tous et des ateliers gratuits. 

Retrouvez les projets open source de DALIBO sur [http://dalibo.github.io](http://dalibo.github.io)


</markdown>
