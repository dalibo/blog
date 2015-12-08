---
layout: post
title: Sortie de POWA 3.0.0
author: Julien Rouhaud
twitter_id: rjuju123   
github_id: rjuju
tags: [PostgreSQL, optimisation, performance, monitoring]

---
*Paris, le 7 décembre 2015*

DALIBO est fière de présenter la troisième version de PoWA, l'analyseur de trafic en temps réel pour PostgreSQL.

<!--MORE-->

## Trafic en temps réel et graphes dynamiques

PoWA est un analyseur de trafic, qui vous donne une vision claire de l’activité de vos serveurs PostgreSQL par le biais d’un graphe présentant les temps d’exécution, un graphe des blocks hit/read ainsi qu’un tableau listant les requêtes les plus coûteuses sur la période sélectionnée.

En zoomant sur l'un ou l'autre des graphes, le tableau s’ajuste et vous affiche les requêtes qui se sont exécutées sur cette période.

En cliquant sur une requête spécifique, vous obtiendrez des graphiques supplémentaires tels que temps de lecture/écriture, nombre de lignes affectées, hit locaux et partagés, etc. 

## Meilleur analyseur de prédicats

L'extension [pg\_qualstats](https://github.com/dalibo/pg_qualstats) stocke de nouvelles métriques.

Il est maintenant possible de connaître les prédicats les plus exécutés en relation avec toutes les requêtes correspondantes.

Il trace aussi les requêtes non-normalisées, permettant ainsi d'exécuter un EXPLAIN de chaque requête normalisée tracée par pg\_stat\_statements.

## Optimisation globale de vos bases de données 

PoWA est maintenant capable d'utiliser les statistiques de tous les prédicats, utilisés par toutes les requêtes exécutées sur une base de données afin de suggérer le plus petit jeu d'index optimisant chacun de ces prédicats.

En particulier, l’heuristique met un lourd accent sur la consolidation de plusieurs index en un seul, en donnant la préférence à des définitions englobant de multiples colonnes. 

Ceci peut amener de nouvelles informations sur la charge réelle et la corrélation entre des prédicats, habituellement difficile à détecter pour l'administrateur de bases de données.

## Contrôle de suggestion d'index

Grâce à l'extension [HypoPG](https://github.com/dalibo/hypopg), les bénéfices de la création des index suggérés peuvent être automatiquement vérifiés en exécutant les requêtes avec des index hypothétiques.

Vous pouvez immédiatement voir si l'index suggéré est pertinent et à quel point cela va améliorer la requête.

## Remerciements

DALIBO souhaite remercier tous les utilisateurs et développeurs ayant contribué à cette version.

PoWA est un projet ouvert disponible sous licence PostgreSQL. Toute contribution pour améliorer l’outil est la bienvenue. 

Vous pouvez envoyer vos idées, vos demandes et vos patchs via Github ou directement à l’adresse [powa-users@googlegroups.com](https://groups.google.com/forum/?hl=fr#!forum/powa-users)

## Liens

Pour PoWA 3.0.0 :

  * Téléchargement : [dalibo.github.io/powa](http://dalibo.github.io/powa/)
  * Démo : [demo-powa.dalibo.com](http://demo-powa.dalibo.com) (login/pass = powa/demo)
  * Doc : [powa.readthedocs.org](http://powa.readthedocs.org)
  * Mailing list : [https://groups.google.com/forum/?hl=fr#!forum/powa-users](https://groups.google.com/forum/?hl=fr#!forum/powa-users)
  * Problèmes/Questions : [github.com/dalibo/powa/issues](https://github.com/dalibo/powa/issues)

Pour les extensions statistiques :

  * pg\_qualstats: [github.com/dalibo/pg\_qualstats](https://github.com/dalibo/pg_qualstats)
  * pg\_stat_kcache: [github.com/dalibo/pg\_stat\_kcache](https://github.com/dalibo/pg_stat_kcache)
  * HypoPG: [github.com/dalibo/hypopg](https://github.com/dalibo/hypopg)

## À propos de POWA 

PoWA est un analyseur de trafic PostgreSQL qui collecte des statistiques et affiche des tableaux et des graphes en temps réel pour vous aider à superviser et optimiser vos serveurs PostgreSQL.
Code & Demo sur [dalibo.github.io](http://dalibo.github.io/)
