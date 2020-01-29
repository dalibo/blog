---
layout: post
title: Sortie de pitrery 3.0
author: Thibaut Madelaine
twitter_id: dalibolabs
github_id: dalibo
tags: [Dalibo Labs, Pitrery, upgrade, PostgreSQL, 12, PITR, backup]
---

*Caen, le 29 janvier 2020*

Pitrery, le logiciel simplifiant le PITR, est disponible en version 3.0. Il
apporte le support de PostgreSQL en version 12.

<!--MORE-->

![logo-pitrery](https://github.com/dalibo/blog/blob/gh-pages/img/pitrery_bandeau-catchphrase-ombre.png?raw=true)

Pitrery est un ensemble de script Bash permettant de gérer les sauvegardes de
type _Point In Time Recovery_ de PostgreSQL.

Le but de pitrery est de gérer de la façon la plus simple possible l’archivage
des journaux de transactions, l'automatisation des sauvegardes physiques et la
restauration de votre instance à un temps donné.


## Nouveautés

### Support de la Version 12

Dans cette version, PostgreSQL a modifié la façon de gérer le paramétrage des
informations de _recovery_.  
Le fichier `recovery.conf` a disparu :
  - Les clés de configuration keys sont maintenant récupérées de la
    configuration de PostgreSQL : _postgresql.conf_ ou _postgresql.auto.conf_.
    Lors de la restauration par pitrery, les paramètres liés à la restauration
    sont écrits à la fin du fichier _postgresql.conf_.
  - Un fichier vide `recovery.signal` ou `standby.signal` sera utilisé par
    l'instance à son démarrage pour connaître l'action à effectuer.  
  - Une nouvelle option est ajoutée à la configuration de pitrery :
    **RESTORE_MODE**. Il est possible de la préciser en ligne de commande par
    l'argument `-m`. Cette option peut être fixée à `recovery` ou `standby`.
  - De multiples clés de configuration du type `recovery_target*` ne sont plus
    acceptées. PostgreSQL effectuera une vérification au démarrage.
  - Par défaut, PostgreSQL avancera à la dernière timeline (`recovery_target_timeline=latest`).

### Renommage de `xlog` to `wal`

Depuis la version 10 de PostgreSQL, `xlog` a été renommé en `wal`. La même évolution a été faite dans pitrery :
  - Le script `archive_xlog` a été renommé en `archive_wal`.
  - Le script `restore_xlog` a été renommé en `restore_wal`.
  - La clé de configuration `PGXLOG` a été renommée en `PGWAL`.
  - Le répertoire d'archivage des journaux de transactions (fichiers WAL),
    `ARCHIVE_DIR` est fixé par défaut à `$BACKUP_DIR/archived_wal`.
  - S'ils existent à la mise à jour, les paquets deb et rpm maintiennent un
    lien symbolique vers les anciens scripts en `*_xlog`.

## Installation de pitrery

Les sources de pitrery sont récupérables sur [GitHub
releases](https://github.com/dalibo/pitrery/releases).

Les paquets des distributions sont disponibles dans les dépôts Dalibo Labs
[YUM](https://yum.dalibo.org/labs) et [APT](https://apt.dalibo.org/labs). Voir
la page [downloads](http://dalibo.github.io/pitrery/downloads.html) pour plus
d'informations.

## Liens importants
    
 * La documentation est en ligne sur [dalibo.github.io](http://dalibo.github.io/pitrery/documentation.html).
 * Pour mettre à jour, vous pouvez vous référer à la [page
   suivante](http://dalibo.github.io/pitrery/upgrade.html).
   
------

**Thibaut Madelaine, Étienne Bersac et Thibaud Walkoviak sont les mainteneurs de pitrery, un projet du [Dalibo Labs](https://labs.dalibo.com/).**
