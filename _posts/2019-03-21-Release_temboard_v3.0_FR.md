---
layout: post
title: temboard - découvrez la version 3.0 !
author: Léo Cossic, Laura Ricci
twitter_id: dalibolabs
github_id: dalibo
tags: [temboard, opensource, postgresql, instances, administration, gestion, manage, supervision, manager, outil, tool, software, version, 3.0]
---

Paris, 21 mars 2019

Voici la version 3.0 de temboard, l'interface de gestion pour PostgreSQL !

<!--MORE-->

![logo-temboard](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/temboard-bandeau-orange-catchphrase-ombre.png)


## Nouvelle fonctionnalité : Maintenance

Le nouveau greffon *Maintenance* donne un **aperçu** de la taille des bases de données, des **schémas**, **tables** ou **index**, avec une estimation du bloat et la taille des données TOAST. L'interface permet de déclencher ou planifier ANALYZE, VACUUM et REINDEX pour gérer les problèmes de performances et de stockage révélés par les indicateurs.

Plus d'information sur le [greffon maintenance](https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/).

## Améliorations de l'interface

L'interface de temboard continue de se bonifier. Cette version 3.0 présente les instances en grille sur la page d'accueil pour mieux gérer les grands parcs. Le menu latéral a été réorganisé et l'utilisateur peut le replier pour mettre en avant le contenu de la page. La page d'accueil et la page *Dashboard* ont désormais un mode plein écran mieux adapté à l'affichage sur écran de supervision.


## Et plus…

De nombreux autres améliorations et correctifs sont inclus, notamment :

   * La double authentification sur l'agent a été limitée aux opérations d'administration ;
   * Nouvelles sondes de supervision : délai de réplication, fichier temporaires ;
   * Affichage du nombre de requêtes en attente ou bloquées dans la barre d'activité ;
   * Suppression de l'édition de `pg_hba.conf` et `pg_ident.conf` du greffon pgconf.

Retrouver les détails des changements dans le [CHANGELOG](https://temboard.readthedocs.io/en/latest/CHANGELOG/).


## Installation plus facile

L'installation de temBoard et de son agent sont plus simples grâce à un script d'auto-configuration et une documentation allégée. Les paquets rpm et debian sont disponibles dans les dépôts Dalibo Labs. 

Plus d'informations dans la [documentation en ligne de temboard](https://temboard.readthedocs.io/en/v3/).


## Démo vidéo

Vous trouverez une démo de cette dernière version sur le compte Youtube de Dalibo, en cliquant sur l'image ci-dessous :

[![demo-temboard](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/screen-temboard.png)](
https://youtu.be/0gSzKYTHEEw "Demo temboard")


## Liens
  * [Site web](https://dali.bo/temboard)  
  * [Page GitHub](https://github.com/dalibo/temboard)


**temboard est développé principalement par Julien Tachoires, Pierre Giraud et Étienne Bersac.**
