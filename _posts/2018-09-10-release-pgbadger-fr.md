---
layout: post
title: Mise à Jour pgBadger v10.0 - corrections et changement de statut
author: Léo Cossic, Gilles Darold
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, temboard, foss, floss, version, 2, sortie, release, 2018]
---

---

*Paris, le 10 septembre 2018*

[Gilles Darold](http://www.darold.net/) publie aujourd'hui la version 10.0 de pgBadger, l'outil pour PostgreSQL qui analyse votre trafic SQL et vous livre un rapport complet avec des graphes dynamiques sur les performances de votre serveur et les axes d'optimisation possibles.

<!--MORE-->

## Sortie de la version 10.0
Cette mise à jour est majeure, il vous est conseillé de l'appliquer au plus vite. Celle-ci ajoute quelques nouvelles fonctionnalités et corrige l'ensemble des problèmes remontés depuis la dernière mise à jour :

  * ajout du support du format de fichier syslog de pgbouncer.
  * ajout du support de tous les formats auto_explain (text, xml, json et yaml).
  * ajout du support du motif %q dans log_line_prefix.
  * ajout du format jsonlog de l'extension de Michael Paquier, avec -f jsonlog pgbadger sera en mesure de parser le log.
  * remplacement de SQL formatter/beautify par la v3.0 de pgFormatter.

## Changement de statut
pgBadger ne fait plus partie de [DaliboLabs](https://github.com/dalibo). Gilles Darold (le créateur et mainteneur principal du projet) a décidé de s'occuper de la gestion et de la maintenance du projet par lui-même, et a ainsi récupéré le dépôt et le copyright de ce dernier.

DaliboLabs contribue à PostgreSQL en développant des outils open sources, en écrivant des articles et en organisant des événements pour la communauté. Les projets sont intégrés à DaliboLabs pour gagner en maturité, et pour profiter de l'expérience d'autres développeurs et d'un accompagnement à la promotion.

## Nouveaux liens vers le projet

 * Site web : [http://pgbadger.darold.net/](http://pgbadger.darold.net/)
 * Code source : [https://github.com/darold/pgbadger](https://github.com/darold/pgbadger)
