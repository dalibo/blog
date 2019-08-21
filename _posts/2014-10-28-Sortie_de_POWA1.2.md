---
layout: post
title: Sortie de POWA 1.2 !
author: Thomas Reiss
twitter_id: frostsct1   
github_id: frost242
tags: [PostgreSQL, optimisation, performance, monitoring, PoWA]

---
*Paris, le 28 octobre 2014*

DALIBO vous présente une nouvelle version de POWA, un outil d’optimisation et de suivi pour PostgreSQL.

<!--MORE-->

## Analyse de trafic en temps réel et graphes dynamiques


POWA est un analyseur de trafic (“workload analyzer”) qui va vous donner une vision claire de l’activité en cours sur vos serveurs PostgreSQL par le biais d’un graphe présentant les temps d’exécution, un graphe des blocks hit/read ainsi qu’un tableau listant les requêtes les plus coûteuses sur la période sélectionnée.

En zoomant sur l’un des graphes, le tableau s’ajuste et vous affiche les requêtes qui se sont exécutées sur cette période. En cliquant sur une requête spécifique, vous obtenez des graphiques supplémentaires : temps de lecture/écriture, nombre de lignes affectées, etc.

Un ensemble de fonctions PL est également disponible pour accéder et gérer les statistiques.


## Nouvelles métriques et améliorations de l'interface


Cette nouvelle version inclut un certain nombre de correctifs et de nouvelles fonctionnalités depuis.

Le noyau de PoWA est chargé de collecter des statistiques en s'appuyant sur pg_stat_statements. Le premier changement majeur consiste à ne stocker que les informations réellement utiles, les ordres DEALLOCATE et BEGIN sont maintenant ignorés lors des collectes. Un problème d'horodatage a aussi été résolu. Afin de faciliter les sauvegardes et les diagnostics, les tables de stockage d'historiques de PoWA ont été marquées comme devant être sauvegardées par pg_dump. En terme de performance, les calculs de certains agrégats ont été améliorés. Enfin, de nouvelles métriques font leur apparition à travers l'API SQL: données temporaires, chronométrage des I/O et temps d'exécution moyen.

L'interface Web de PoWA a aussi reçu son lot d'améliorations. En plus de l'affichage des nouvelles métriques disponibles, certaines nouvelles fonctionnalités apparaissent. En premier lieu, l'intervalle de temps sélectionné est maintenant transmis de page en page. Les métriques sont maintenant affichées dans une forme lisible plus facilement. La page montrant le détail d'une requête montre maintenant un tableau résumant les différentes métriques de la requête sur la période concernée. Chaque page affiche d'ailleurs un titre en fonction de son contexte. Ensuite, afin d'agrandir la surface d'affichage, le sélecteur de base de données originel a disparu. Un menu vient le remplacer pour permettre à l'utilisateur de naviguer plus facilement d'une base à l'autre. Enfin, un certain nombre de bugs ont été corrigés, notamment un bug qui entrainait l'apparition de graphes vides. À noter que le format du fichier de configuration de l'interface a été modifié depuis la dernière version, il suffit de se conformer à la documentation pour connaître les changements.

Pour une liste complète des changements, veuillez consulter les [notes de version](https://github.com/dalibo/powa/blob/master/CHANGELOG.md)

Pour obtenir une procédure d'installation ou de mise à jour, veuillez consulter la [documentation](https://github.com/dalibo/powa/blob/master/README.md)


## Remerciements

DALIBO souhaite remercier tous les développeurs ayant contribué à cette version, notamment Christopher Liu, menardorama, Victor D, Justin Miller, Arthur Lutz.

POWA est un projet ouvert disponible sous licence PostgreSQL. Toute contribution pour améliorer l’outil est la bienvenue. Vous pouvez envoyer vos idées, vos demandes et vos patchs via Github ou directement à l’adresse [powa@dalibo.com](powa@dalibo.com)

## Liens


  * Télécharger : [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)
  * Démo : [http://demo-powa.dalibo.com](http://demo-powa.dalibo.com)  (login/pass = powa/demo)

----

**À propos de POWA** :

PoWA est un analyseur de trafic PostgreSQL qui collecte des statistiques en temps réel et affiche des tableaux et des graphes en temps réel pour vous aider à superviser et optimiser vos instances PostgreSQL. C’est un outil similaire à Oracle AWR ou SQL Server MDW.

Code & Demo sur [http://dalibo.github.io/powa/](http://dalibo.github.io/powa/)

----

**À propos de DALIBO :**

DALIBO est le spécialiste français de PostgreSQL et propose du support, de la formation et du conseil depuis 2005. La société est active au sein de la communauté PostgreSQL de différentes manières, notamment : des développements, des articles, de la traduction, des conférences ouvertes à tous et des ateliers gratuits.

Retrouvez les projets open source de DALIBO sur [http://dalibo.github.io](http://dalibo.github.io)
