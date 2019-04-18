---
layout: post
title: Du changement dans le packaging YUM !
author: Stefan Fercot, Christophe Courtois
twitter_id: 
github_id: dalibo
tags: []
---

Depuis le 15 avril 2019, il n'y a désormais plus qu'un seul RPM de création des 
dépôts YUM par distribution. Ce package contient maintenant les informations 
des dépôts pour toutes les versions majeures de PostgreSQL disponibles et 
supportées.

Ce changement, annoncé par Devrim sur la mailing list `pgsql-pkg-yum`, a 
quelques impacts.

<!--MORE-->

-----

## Annonce

L'annonce originale de Devrim se trouve [ici](https://www.postgresql.org/message-id/flat/6f1e601300d575195d4f0d8a066ef4abf4c90c99.camel%40gunduz.org).

  * Au lieu d'un RPM de dépôts par version majeure de PostgreSQL, nous avons 
  désormais un seul RPM contenant les informations des dépôts YUM pour 
  l'ensemble des versions supportées de PostgreSQL.

  * La version de ce RPM de dépôts a été passée à 42. Espérons que cela mettra 
  fin aux questions du genre "Le RPM de dépôts est en version 10-4, où puis-je 
  trouver le 10-7 afin de pouvoir installer PostgreSQL 10.7 ?".

  * Le suffixe "latest" a d'ailleurs été ajouté à tous les RPMs de dépôts afin 
  de toujours pointer sur la dernière version disponible.

-----

## Installation

Voyons par exemple l'impact de ces changements sur CentOS 7.

Comme d'habitude, aller sur `https://www.postgresql.org/download/linux/redhat/` 
et choisir la version (11), la plateforme (CentOS 7) et l'architecture (x86_64) 
qu'on souhaite installer.

Aujourd'hui, on obtient encore le lien vers le paquet 
[pgdg-centos11-11-2](https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm).

L'installer :

```bash
# yum install https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm
Loaded plugins: fastestmirror
pgdg-centos11-11-2.noarch.rpm
Examining /var/tmp/yum-root-5eSWGp/pgdg-centos11-11-2.noarch.rpm: pgdg-redhat-repo-42.0-4.noarch
Marking /var/tmp/yum-root-5eSWGp/pgdg-centos11-11-2.noarch.rpm to be installed

Resolving Dependencies
--> Running transaction check
---> Package pgdg-redhat-repo.noarch 0:42.0-4 will be installed
--> Finished Dependency Resolution

Dependencies Resolved
========================================================================================================
 Package                   Arch            Version            Repository                           Size
========================================================================================================
Installing:
 pgdg-redhat-repo          noarch          42.0-4             /pgdg-centos11-11-2.noarch          6.8 k

Transaction Summary
========================================================================================================
Install  1 Package

Total size: 6.8 k
Installed size: 6.8 k
```

En réalité, le nouveau paquet `pgdg-redhat-repo` va être installé...

Le fichier yum `.repo` contiendra désormais les URLs des dépôts pour toutes 
les versions supportées de PostgreSQL :

```bash
# cat /etc/yum.repos.d/pgdg-redhat-all.repo |grep "\["
[pgdg12]
[pgdg11]
[pgdg10]
[pgdg96]
[pgdg95]
[pgdg94]
...
```

Les dépôts des versions 9.4 à 11 sont d'ailleurs activés par défaut.

Les paquets PostgreSQL sont donc facilement atteignables et il est désormais 
facile d'installer deux versions différentes en une seule fois :

```bash
# yum install postgresql11-server postgresql10-server
...

Dependencies Resolved
========================================================================================================
 Package                        Arch              Version                       Repository         Size
========================================================================================================
Installing:
 postgresql10-server            x86_64            10.7-2PGDG.rhel7              pgdg10            4.5 M
 postgresql11-server            x86_64            11.2-2PGDG.rhel7              pgdg11            4.7 M
Installing for dependencies:
 libicu                         x86_64            50.1.2-17.el7                 base              6.9 M
 postgresql10                   x86_64            10.7-2PGDG.rhel7              pgdg10            1.6 M
 postgresql10-libs              x86_64            10.7-2PGDG.rhel7              pgdg10            355 k
 postgresql11                   x86_64            11.2-2PGDG.rhel7              pgdg11            1.6 M
 postgresql11-libs              x86_64            11.2-2PGDG.rhel7              pgdg11            360 k

Transaction Summary
========================================================================================================
Install  2 Packages (+5 Dependent packages)

Total download size: 20 M
Installed size: 80 M
```

Pour simplifier les articles de blogs ou les scripts automatisés, on peut 
simplement utiliser le lien vers le RPM de dépôts le plus récent, à savoir :

```
https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```

-----

## Mises à jour

Ce changement impacte également les installations existantes en cas de mise à 
jour.

Sur, par exemple, une version 11 précédemment installée :

```bash
# cat /etc/yum.repos.d/pgdg-11-centos.repo |grep "\["
[pgdg11]
...
```

La mise à jour va remplacer l'ancien paquet `pgdg-centos11` par le nouveau et 
créer le nouveau fichier `.repo` :

```bash
# yum update pgdg-centos11
...
Resolving Dependencies
--> Running transaction check
---> Package pgdg-centos11.noarch 0:11-2 will be obsoleted
---> Package pgdg-redhat-repo.noarch 0:42.0-4 will be obsoleting
--> Finished Dependency Resolution

Dependencies Resolved
========================================================================================================
 Package                        Arch                 Version                 Repository            Size
========================================================================================================
Installing:
 pgdg-redhat-repo               noarch               42.0-4                  pgdg11               5.6 k
     replacing  pgdg-centos11.noarch 11-2

Transaction Summary
========================================================================================================
Install  1 Package

Total download size: 5.6 k
```

-----

## Versions EOL

Alors que les dépôts YUM des versions EOL (qui ne sont plus supportées) 
existent encore, les RPMs de dépôts habituellement disponibles sur 
`https://yum.postgresql.org/repopackages.php#pg93`, ne le sont plus : 
`404 - Not Found`.

Il est toutefois encore possible d'ajouter manuellement ces dépôts en cas de 
besoin :

```bash
# cat /etc/yum.repos.d/pgdg-93-centos.repo 
[pgdg93]
name=PostgreSQL 9.3 $releasever - $basearch
baseurl=https://download.postgresql.org/pub/repos/yum/9.3/redhat/rhel-$releasever-$basearch
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-PGDG-93

[pgdg93-source]
name=PostgreSQL 9.3 $releasever - $basearch - Source
failovermethod=priority
baseurl=https://download.postgresql.org/pub/repos/yum/srpms/9.3/redhat/rhel-$releasever-$basearch
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-PGDG-93
```

Bien sûr, puisqu'il s'agit de versions qui ne sont plus supportées, vous ne 
devriez plus avoir à les utiliser...
