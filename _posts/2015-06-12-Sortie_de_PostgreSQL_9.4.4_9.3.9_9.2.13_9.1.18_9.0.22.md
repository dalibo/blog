---
layout: post
title: Sortie de PostgreSQL 9.4.4, 9.3.9, 9.2.13, 9.1.18 & 9.0.22
author: Julien Rouhaud
twitter_id: rjuju123
github_id: rjuju
tags: [PostgreSQL, sécurité, upgrade]

---
*Paris, le 12 juin 2015*

Le PostgreSQL Global Development Group a publié une mise à jour de toutes les
versions supportées du SGBD, incluant les versions 9.4.4, 9.3.9, 9.2.13, 9.1.18
et 9.0.22. Ces versions corrigent principalement des problèmes qui n'ont pas
complètement été résolus dans la dernière mise à jour mineure. Cette mise à jour
doit être appliquée au plus vite par tout utilisateur ayant appliqué la version
mineure précédente. Les autres utilisateurs peuvent appliquer les mises à jour
lors de la prochaine fenêtre de maintenance.

<!--MORE-->

## Correctionliées à la récupération après un crash

Les précédentes mises à jour ont essayé de corriger un problème dans PostgreSQL
9.3 et 9.4 lié au rebouclage du multixact, mais sans prendre en compte les
problèmes liés au nettoyage de pg_multixact lors d'une récupération suite à un
crash. Cela peut entraîner l'impossibilité à des serveurs de repartir à l'issue
d'un crash. C'est pourquoi les utilisateurs des versions 9.3 et 9.4 sont invités
à se mettre à jour au plus vite, en particulier ceux utilisant actuellement les
versions 9.3.7, 9.3.8, 9.4.2 et 9.4.3.

Les instances qui ont été mises à jour vers PostgreSQL 9.3 en utilisant
pg_upgrade, ce qui inclut également les instances mises à jour par la suite vers
PostgreSQL 9.4 suite à une autre mise à jour, peuvent rencontrer un comportement
surprenant d'autovacuum. Celui-ci peut en effet se déclencher sur l'ensemble des
tables après avoir appliqué la mise à jour. Pour les instances de taille
importante, il est important de programmer un VACUUM manuel avant l'application
de la mise à jour, afin de ne pas entraîner une baisse de performance liée à
cette maintenance critique. Se reporter aux notes de versions de la version
9.3.9 pour de plus amples détails.

## Autres corrections et améliorations

En plus du correctif décrit plus haut, un certain nombre d'autres problèmes ont
été corrigés dans cette version. Cela inclut :

* corrige des échecs pour invalider le fichier d'initialisation du cache de
* relation * évite les deadlocks provoqués entre de nouvelles sessions et
* l'exécution d'ordres CREATE/DROP DATABASE ; * améliore la planification des
* semi-jointures et des anti-jointures.

## Correctifs cumulatifs

Toutes les versions mineures de PostgreSQL sont cumulatives. Comme cette mise à
jour corrige un certain nombre de problèmes malencontreusement introduits par
des correctifs diffusés dans des versions précédentes, nous recommandons à tous
les utilisateurs d'appliquer cette mise à jour au lieu d'installer une version
plus ancienne qui comporte des problèmes connus. Cette mise à jour corrige
plusieurs bugs liés à multixact, le projet PostgreSQL ne prévoit donc plus de
mises à jour dans l'immédiat.

## Comment mettre à jour ?

Comme pour les autres mises à jour mineures, les utilisateurs n'ont pas besoin
d'exporter et de réimporter leur base de données ou d'utiliser pg_upgrade pour
appliquer les correctifs ; il suffit simplement d'arrêter PostgreSQL et de
mettre à jour ses binaires. Les utilisateurs qui n'ont pas réalisé de mises à
jour depuis longtemps devront réaliser un certain nombre d'opérations
complémentaires à la mise à jour ; se conformer aux notes de versions pour de
plus amples détails. Se reporter également à la note précédente pour les
utilisateurs ayant utilisé pg_upgrade pour mettre à jour une instance vers
PostgreSQL 9.3.

Liens:

- [Téléchargement](http://www.postgresql.org/download)
- [Notes de versions](http://www.postgresql.org/docs/current/static/release.html)
