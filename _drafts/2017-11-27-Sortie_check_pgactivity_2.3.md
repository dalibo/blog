---
layout: post
title: Sortie de check_pgactivity versio 2.3
author: Thomas Reiss, Léo Cossic
twitter_id: dalibo 
github_id: dalibo
tags: [postgresql, check_pgactivity, release, sortie]
---

---
*Paris, le 27 novembre 2017*

`check_pgactivity` est un plugin Nagios de supervision d'instances PostgreSQL. Ce plugin est écrit spécifiquement pour fournir un jeu de données de performances très riche, et il permet de superviser tous les différents aspects d'une instance PostgreSQL. 

<!--MORE-->

**Important:** notez que la sonde `check_pgactivity` intègre désormais le suport de la version 10 de PostgreSQL

Changelog :

    Ajout du support complet pour PostgreSQL version 10, incluant les fonctionnalités de monitoring non-priviligié
    Ajout de documentation pour aider les nouveaux contributeurs
    Ajout de la capacité à utiliser l'unité de temps comme seuil dans le service de backend_status
    Correction de bug dans le service de backend_status
    Correction de plusieurs "issues"

Vous pouvez retrouver le changelog en version anglophone sur le lien suivant: [release Github](https://github.com/OPMDG/check_pgactivity/releases/tag/REL2_3)

Retrouvez ci-dessous l'ensemble des liens nécessaires pour utiliser, étudier et contribuer à `check_pgactivity`:

  * [check_pgactivity-2.3.tgz](https://github.com/OPMDG/check_pgactivity/releases/download/REL2_3/check_pgactivity-2.3.tgz)
  * [nagios-plugins-pgactivity-2.3-1.noarch.rpm](https://github.com/OPMDG/check_pgactivity/releases/download/REL2_3/nagios-plugins-pgactivity-2.3-1.noarch.rpm)
  * [Source code (zip)](https://github.com/OPMDG/check_pgactivity/archive/REL2_3.zip)
  * [Source code (tar.gz)](https://github.com/OPMDG/check_pgactivity/archive/REL2_3.tar.gz)
    
    
