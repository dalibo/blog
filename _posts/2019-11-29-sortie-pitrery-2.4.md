---
layout: post
title: Sortie de pitrery 2.4
author: Thibaut Madelaine, Etienne Bersac
twitter_id: dalibolabs
github_id: dalibo
tags: [Dalibo Labs, Pitrery, upgrade, PostgreSQL, PITR, backup]
---

*Caen, le 20 novembre 2019*

Pitrery, le logiciel simplifiant le PITR, est disponible en version 2.4, supportée par une équipe de développeurs de Dalibo renouvelée.

<!--MORE-->

![logo-pitrery](https://github.com/dalibo/blog/blob/gh-pages/img/pitrery_bandeau-catchphrase-ombre.png?raw=true)

Pitrery est un ensemble de script Bash permettant de gérer les sauvegardes de
type _Point In Time Recovery_ de PostgreSQL créé voici plus de 8 ans par
Nicolas Thauvin.

Le but de Pitrery est de gérer de la façon la plus simple possible l’archivage
des journaux de transactions, l'automatisation des sauvegardes physiques et la
restauration de votre instance à un temps donné.


## Nouvelle équipe de développement

Nicolas Thauvin a souhaité passer la main sur ce logiciel pour lequel il a su
pousser Bash dans ses retranchements. La nouvelle équipe de développement est
composée actuellement de :

  * Thibaut Madelaine, mainteneur du projet,
  * Etienne Bersac, en charge du packaging et des tests automatiques,
  * Thibaud Walkoviak, travaillant sur le support de PostgreSQL 12.

## La version 2.4


La façon de gérer les paramètres de restauration évoluent en version 12. Le
fichier `recovery.conf` disparaît et les clés de configuration seront
maintenant spécifiées dans le fichier `postgresql.conf`. Pour ces raisons,
Pitrery informera des incompatibilités de versions majeures lors d'une
restauration.

Pitrery supporte actuellement PostgreSQL jusqu'à la version 11. Le support de
la nouvelle version 12 est codée. Un effort reste à faire sur la documentation
et le packaging.

## Installation de Pitrery

La localisation des paquets Debian/Ubuntu et RedHat/CentOS a changé. Les
sources de Pitrery sont dorénavant sur [GitHub
releases](https://github.com/dalibo/pitrery/releases).

Les paquets des distributions sont disponibles dans les dépôts Dalibo Labs
[YUM](https://yum.dalibo.org/labs) et [APT](https://apt.dalibo.org/labs). Voir
la page [downloads](http://dalibo.github.io/pitrery/downloads.html) pour plus
d'informations.

## Liens importants
    
 * La documentation est en ligne sur [dalibo.github.io](http://dalibo.github.io/pitrery/documentation.html).
 * Pour mettre à jour, vous pouvez vous référez à la [page
   suivante](http://dalibo.github.io/pitrery/upgrade.html).
