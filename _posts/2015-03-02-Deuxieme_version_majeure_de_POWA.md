---
layout: post
title:  PoWA 2, A la recherche de l'index manquant 
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, optimisation, performance, monitoring]

---
*Paris, le 2 mars 2015*

DALIBO est fière de présenter la deuxième version majeure de PoWA, un analyseur de trafic en temps réel pour PostgreSQL.


<!--MORE-->

Le premier changement majeur est le nouveau design de l'IHM : nous avons tout reconstruit à partir de zéro et placé le code dans un module indépendant nommé [powa-web](https://github.com/dalibo/powa-web). Désormais il est plus simple d'installer l'interface utilisateur en dehors du serveur PostgreSQL.

La nouvelle interface est basée sur la version précédente et elle apporte beaucoup d'améliorations, notamment : 

* Plus de graphes
* De nouveaux types de graphes : Histogrammes / Camemberts
* Nouvelle vue : configuration 
* Un widget pour la suggestion d'index
* Un graphe pour suivre l'usage des ressources physiques 
* Un tableau de requêtes amélioré
* Un fil d'ariane sur chaque page
* Compatibilité avec Python 2.6, 2.7 and 3.4
* Meilleur support des différents navigateurs

Screenshot:

![http://powa.readthedocs.org/en/latest/stats_extensions/pg_stat_statements.html#where-is-it-used-in-powa-web](http://powa.readthedocs.org/en/latest/_images/pg_stat_statements.png)

## Statistiques avancées 

Deuxième amélioration: le moteur de PoWA a également été placé dans un module indépendant, nommé [powa-archivist](https://github.com/dalibo/powa-archivist) et nous l'avons transformé pour qu'il puisse archiver toutes sortes de stats internes. La source principale d'info reste l'extension pg_stat_statements, mais nous avons aussi intégré deux autres extensions: [pg_qualstats](https://github.com/dalibo/pg_qualstats) et [pg_stat_kcache](https://github.com/dalibo/pg_stat_kcache).

Grace à pg_stat_kcache, PoWA est maintenant capable de collecter des statistiques sur les accès aux disques et sur la consommation CPU pour chaque backend PostgreSQL. Cela permet aux DBA d'avoir une estimation du ratio "cache hit" au niveau OS.

Screenshot:

![http://powa.readthedocs.org/en/latest/stats_extensions/pg_stat_kcache.html#where-is-it-used-in-powa-web](http://powa.readthedocs.org/en/latest/_images/pg_stat_kcache_1.png)

##  Détecteur d'index manquant + Analyseur de clauses WHERE 

Troisième amélioration majeure: avec pg_qualstats, PoWA peut désormais collecter des métriques sur les opérateurs dans la clause WHERE de chaque requête. Avec ces données, il est possible de connaître les valeurs les plus communes dans les requêtes SQL et le taux de "sélectivité" de chaque opérateur. Pour la colonne ayant une sélectivité très forte, PoWA pourra proposer la création d'un index approprié si ce n'est pas déjà fait.  

Screenshot:

![http://powa.readthedocs.org/en/latest/stats_extensions/pg_qualstats.html#where-is-it-used-in-powa-web](http://powa.readthedocs.org/en/latest/_images/pg_qualstats.png)


## Des changements radicaux

Le choix était difficile, mais pour implémenter des fonctionnalités innovantes comme le détecteur d'index manquant, nous avons besoin des dernières fonctionnalités de PostgreSQL. Dès lors nous avons décidé d'abandonner la compatibilité avec PostgreSQL 9.3.

Bien sûr, nous allons continuer à maintenir PoWA v1.2 et vous pouvez continuer à utiliser cette version sur vos instances PostgreSQL 9.3. En deux mots, voici nos recommandations :  

* Si vous utilisez PostgreSQL 9.4, nous vous encourageons à utiliser PoWA 2.0 
* Si vous utilisez PostgreSQL 9.3, vous pouvez conserver PoWA 1.2 ou mettre à jour votre instance PostgreSQL et passer à PoWA 2.0

Voici une explication détaillée sur les raisons qui nous ont poussés à effectuer ces changements radicaux:  [Moving Fast and Breaking Things](
https://github.com/dalibo/powa/wiki/Moving-Fast-and-Breaking-Things)

## Remerciements & Licence 

DALIBO remercie toutes les personnes qui ont contribué à cette version: Rodolphe Quiedeville, Hyunjun Kim, Grégoire Pineau, Ahmed Bessifi, exordium-frozen, Christopher Liu, menardorama et en particulier Ronan Dunklau et Julien Rouhaud pour leur travail de fond sur l'interface graphique.  

POWA est un projet ouvert sous licence PostgreSQL. Toute contribution constructive est la bienvenue. Vous pouvez envoyer vos remarques, vos idées et vos patchs via les outils github ou à l'adresse powa@dalibo.com

## Liens :

Pour PoWA 2.0:

* Téléchargement: [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)
* Démo: [http://demo-powa.dalibo.com](http://demo-powa.dalibo.com)  (login/pass = powa/demo)
* Doc: [http://powa.readthedocs.org/](http://powa.readthedocs.org/)
* Liste de discussion: [https://groups.google.com/forum/?hl=fr#!forum/powa-users](https://groups.google.com/forum/?hl=fr#!forum/powa-users)
* Issues: [https://github.com/dalibo/powa/issues](https://github.com/dalibo/powa/issues)

Pour les nouvelles extensions :

* [pg_stat_kcache](https://github.com/dalibo/pg_stat_kcache)
* [pg_qualstats](https://github.com/dalibo/pg_qualstats) 

Pour une liste complète des changements, vous pouvez consulter la note de version : [http://powa.readthedocs.org/en/latest/releases/v2.0.html](http://powa.readthedocs.org/en/latest/releases/v2.0.html)



--------------

**À propos de POWA** :

PoWA est un analyseur de trafic PostgreSQL qui collecte des statistiques en temps réel et affiche des tableaux et des graphes en temps réel pour vous aider à superviser et optimiser vos instances PostgreSQL. C'est un outil similaire à Oracle AWR ou SQL Server MDW.

Code & Demo sur [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)

Retrouvez les projets open source de DALIBO sur http://dalibo.github.io
