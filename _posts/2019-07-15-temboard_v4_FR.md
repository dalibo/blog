---
layout: post
title: temboard - la version 4.0 arrive
author: Laura Ricci, Julien Tachoires
twitter_id: dalibolabs
github_id: dalibo
tags: [temboard, postgresql, gestion, interface, notification, supervision, dalibolabs]
---

*Paris, 15 juillet 2019*

temboard, l'interface de gestion pour PostgreSQL, sort sa version 4.0 ! Parmi les nouvelles fonctionnalités, découvrez la très utile **notification**.

<!--MORE-->

![img/temboard_H_couleur](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/temboard_H_couleur.png)


## La nouveauté : la notification

Il est désormais possible d'être alerté lorsqu'un problème est détecté par une sonde de supervision sans être connecté à l'interface.
Le nouveau greffon de *Supervision* est étendu avec des fonctionnalités de *Notification* et permet en effet aux administrateurs de bases de données ou système de **recevoir des
notifications par email ou SMS** lorsqu'un problème est détecté.

Plus d'information sur le [greffon notification](https://temboard.readthedocs.io/en/latest/temboard-howto-alerting/).


## Et plus…

De nombreux autres améliorations et correctifs sont inclus, notamment :

   *  Support de la réindexation d'un ensemble de tables ou d'une base de données ;
   *  Support des opérations de maintenance *analyze* et *vacuum* pour une base de données.
   
Retrouvez les détails des changements dans le [CHANGELOG](https://dali.bo/temboard_changelog).


## Liens
  * [Site web](https://dali.bo/temboard)  
  * [Page GitHub](https://dali.bo/temboard_github)


**Projet Dalibo Labs, temboard est principalement développé par Julien Tachoires, Pierre Giraud et Étienne Bersac.**
