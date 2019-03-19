---
layout: post
title: temboard - découvrez la version 3.0 !
author: Léo Cossic, Laura Ricci
twitter_id: dalibolabs
github_id: dalibo
tags: [temboard, opensource, postgresql, instances, administration, gestion, manage, supervision, manager, outil, tool, software, version, 3.0]
---

Paris, 21 mars 2019

Sortie de la version 3.0 de temboard, l'outil de gestion puissant pour PostgreSQL !

<!--MORE-->

![logo-temboard](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/temboard-bandeau-orange-catchphrase-ombre.png)


## Nouvelle fonctionnalité : Maintenance

Le plugin de maintenance donne un **aperçu** de la base de données, des **schémas**, **tables** ou **indexes** (respective size ?).

It est très utile d'obtenir des informations sur BLOAT et TOAST. Les utilisateurs peuvent **évaluer leurs problèmes potentiels**, et comprendre ou prévenir ceux concernant la **performance** à cause d'un espace mal utilisé. Le plugin donne aussi accès à des actions de maintenance comme VACUUM, ANALYZE ou REINDEX pour résoudre les problèmes d'espace ou de performance.

## Changelog

   * Affichage en plein écran dès la page d'accueil et le tableau de bord 
   * Limitation de la double authentification (to not read only APIs ?)
   * Plugin Maintenance
   * Barre latérale masquable 
   * Délai de copie et de connexion, fichiers temporaires (-> New monitoring probes: replication lag and connection, temporary files)
   * Tests de fonctionnalité de l'IU 
   * Support Tornado 4.4 and 5
   * Ajout du script d'auto-configuration 
   * Affichage des requêtes en attente ou bloquées dans la barre d'activité (-> Show number of waiting/blocking req in activity tabs)
   * Affichage du statut de disponibilité sur la page d'accueil 
   * Tableau de bord comme page d'accueil (-> Dashboard like home page)
   * Amélioration des vues de l'activité 
   * Révision du framework web 
   * Mise à jour des paquets Debian 
   * Suppression de pg_hba.conf et pg_ident.conf edition du plugin pgconf
   * Correction du traitement des données de contrôle coincées dans la file d'envoi
   * Correction et mise à jour de la documentation 
   * Réduction des commandes rollback inutiles dans les requêtes de lecture (base de données du dépôt)

## Démo

## Liens
  * Site web : [http://dali.bo/temboard] 
  * Documentation: [https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/] 
  * ChangeLog: [https://temboard.readthedocs.io/en/latest/CHANGELOG/] 
  * GitHub: [https://github.com/dalibo/temboard] 


**temboard est développé principalement par Julien Tachoires, Étienne Bersac et Pierre Giraud.**
