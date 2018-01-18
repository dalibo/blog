---
layout: post
title: temBoard - administrez simplement votre parc d'instances PostgreSQL
author: Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [temboard, opensource, postgresql, instances, administration, gestion, manage, supervision, outil]
---

---
*Paris, le 18 janvier 2018*

`temBoard` est un outil de gestion puissant pour PostgreSQL. Ce dernier permet de centraliser la supervision et l'administration d'un parc d'instances PostgreSQL. Grâce à cet outil, gérez vos bases de données simplement et de manière centralisée.

<!--MORE-->

L'outil est composé de 2 éléments distincts:

   * Un agent léger à installer sur chacun de vos serveurs PostgreSQL pour les surveiller et les gérer.
   * Un serveur central en charge de contrôler les agents et d'enregistrer les données de supervision. Il se présente sous la forme d'une interface web.
 
Vous trouverez une vidéo de présentation ainsi que l'ensemble des informations concernant `temBoard` sur le site du projet : [http://temboard.io/](http://temboard.io/)

Vous pouvez également installer un environnement de test complet grâce à docker, en suivant le guide [QUICKSTART](https://github.com/dalibo/temboard/blob/master/QUICKSTART.md) détaillé.

Pour une installation complète sur vos instances, suivez le Guide d'installation fournit: [readthedocs](http://temboard.readthedocs.io/en/latest/installation/)

`temBoard` est développé principalement par Julien Tachoires, Étienne Bersac et Pierre Giraud.
