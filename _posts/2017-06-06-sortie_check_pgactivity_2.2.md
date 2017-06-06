---
layout: post
title: "Sortie de check_pgactivity 2.2"
author: Léo Cossic
twitter_id: @dalibolabs
github_id: OPMDG
tags: [release, sortie, check_pgactivity]
---
*Paris, le 06 juin 2017*
---

check_pgactivity 2.2 est sortie
===================
L'OPMDG sort enfin la version 2.2 de check\_pgactivity . Une grande partie des
modifications ont été implémentées il y a quelques temps déjà, mais cette
version apporte enfin du support officiel pour PostgreSQL 9.6.

<!--MORE-->

Cette version apporte quelques nouvelles fonctionnalités:

* support pour PostgreSQL 9.6
* ajout du service sequences\_exhausted pour détecter les séquences épuisées
* ajout du service sequences_exhausted pour prévenir l'épuisement des séquences
* ajout du service stat_snapshot\_age pour détecter le blocage du collecteur de statistiques
* ajout du service pgdata_permission pour surveiller les droits du répertoire PGDATA.
* ajout de support pour les paramètres nécessitant un redémarrage pour être appliqués
* ajout de la timeline dans les données de performances du service service wal\_files
* ajout du seuil critique aux données de performance de streaming_delta
* les seuil sur le service streaming_delta sont maintenant optionnels

Quelques corrections et changements ont été également été réalisés :

* corrige backends\_status pour PostgreSQL 9.6
* améliore et renomme la sonde "ready_archives" en "archiver"
* corrige archive\_folder pour supporter les archives compressés
* corrige une condition d'exécution pour gérer correctement les exécutions concurrentes
* corrige un bug dans le format de sortie "human"
* corrige la documentation concernant la base de connexion par défaut
* utilise le paramètre server\_version\_num pour détecter la version de PostgreSQL

## Qu'est ce que check_pgactivity ?

check_pgactivity est une sonde compatible avec Nagios pour surveiller toutes les
fonctions clés d'un cluster PostgreSQL:

* Nombre de sessions, requètes les plus longues, sessions vérouillée, etc...
* taille de la base de donnée, tables et indexes fragmentées.
* fichier WAL, état de l'archiver, dumps de bases de données
* réplication en streaming, slots de réplication
* et bien d'autres

Check_pgactivity supporte plusieurs formats d'export/de sortie:

* Nagios, strict ou non
* Human-deadable
* binaire (compatible avec le langage Perl)

## Pourquoi check_pgactivity ?

L'OPMDG a été initialement formé par Dalibo pour supporter le développement de notre suite de contrôle OPM. L'OPMDG est un groupe informel contribuant à OPM et aux outils environnants. Il est indépendant de l'entreprise afin d’encourager d'autres contributeurs à soumettre des patches.

Dans un premier temps, nous pensions utiliser check_postgres pour la suite OPM, mais il lui manquait plusieurs données de performance dont nous avions besoin et le code source était difficile à maintenir. Nous avons donc décidé d'écrire notre propre sonde Nagios "from scratch", de manière à ce qu'il soit plus facile à maintenir et qu'il fournisse des données de performances plus riches.

Cependant, il est maintenant très simple d'étendre check\_pgactivity pour ajouter de nouveaux services ou le support d'une nouvelle version de PostgreSQL (le support de PostgreSQL 10 est déjà en chantier). Le format de sortie est automatiquement traité par check_pgactivity, un service a simpement besoin de retourner certaines variables.


## Téléchargement

**Toutes les versions peuvent être téléchargée sur github**: https://github.com/OPMDG/check_pgactivity/releases

**La page du projet**: https://github.com/OPMDG/check_pgactivity
