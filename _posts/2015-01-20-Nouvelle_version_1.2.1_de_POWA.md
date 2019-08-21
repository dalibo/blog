---
layout: post
title: Nouvelle version 1.2.1 de POWA !
author: Julien Rouhaud
twitter_id: rjuju123   
github_id: rjuju
tags: [PostgreSQL, optimisation, performance, monitoring, PoWA, release]

---
*Paris, le 20 janvier 2015*

DALIBO est fier de vous présenter la nouvelle version 1.2.1 de POWA, un outil d’optimisation et de suivi pour PostgreSQL.

Le projet a maintenant une mailing list dédiée, disponible sur [powa-users@googlegroups.com](https://groups.google.com/forum/?hl=fr#!forum/powa-users).

N'hésitez pas à nous y rejoindre et à poser toutes vos questions.

<!--MORE-->

## Analyse de trafic en temps réel et graphes dynamiques

POWA est un analyseur de trafic (“workload analyzer”) qui va vous donner une vision claire de l’activité en cours sur vos serveurs PostgreSQL par le biais d’un graphe présentant les temps d’exécution, un graphe des blocks hit/read ainsi qu’un tableau listant les requêtes les plus coûteuses sur la période sélectionnée.
En zoomant sur l’un des graphes, le tableau s’ajuste et vous affiche les requêtes qui se sont exécutées sur cette période. En cliquant sur une requête spécifique, vous obtenez des graphiques supplémentaires : temps de lecture/écriture, nombre de lignes affectées, etc.
Un ensemble de fonctions PL est également disponible pour accéder et gérer les statistiques.

![PoWA screenshot]({{ site.production_url }}/img/powa_20150120.png)

## Nouvelles fonctionnalités et changements dans l'interface Web

  * L'interface Web est maintenant compatible avec mojolicious 5.0 et plus
  * L'interface Web peut maintenant se connecter à de multiples serveurs, et des identifiants peuvent être spécifiés pour chaque serveur 
  * L'horodatage s'affiche désormais au format ISO 8601 
  * La variable POWA_CONFIG_FILE a été ajoutée pour permettre un emplacement et/ou nom spécifique pour le fichier de configuration
  * Amélioration de l'affichage des tableaux pour de plus petits écrans

## Remerciements

DALIBO souhaite remercier tous les utilisateurs et développeurs ayant contribué à cette version, notamment Ahmed Bessifi et Luis Pinto Da Costa.

POWA est un projet ouvert disponible sous licence PostgreSQL. Toute contribution pour améliorer l’outil est la bienvenue. Vous pouvez envoyer vos idées, vos demandes et vos patchs via Github ou directement à l’adresse : [powa-users@googlegroups.com](https://groups.google.com/forum/?hl=fr#!forum/powa-users)

## Links

  * Télécharger : [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)
  * Démo : [http://demo-powa.dalibo.com](http://demo-powa.dalibo.com) (login/pass = powa/demo)

----

## À propos de POWA :

PoWA est un analyseur de trafic PostgreSQL qui collecte des statistiques en temps réel et affiche des tableaux et des graphes en temps réel pour vous aider à superviser et optimiser vos instances PostgreSQL. C’est un outil similaire à Oracle AWR ou SQL Server MDW.

Code & Démo sur [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)

----

## À propos de DALIBO :

DALIBO est le spécialiste français de PostgreSQL et propose du support, de la formation et du conseil depuis 2005. La société est active au sein de la communauté PostgreSQL de différentes manières, notamment : des développements, des articles, de la traduction, des conférences ouvertes à tous et des ateliers gratuits.
Retrouvez les projets open source de DALIBO sur : [http://dalibo.github.io](http://dalibo.github.io)
