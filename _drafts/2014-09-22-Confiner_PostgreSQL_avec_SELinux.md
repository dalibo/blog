---
layout: post
title: Confiner PostgreSQL avec SELinux
author: Nicolas Thauvin
twitter_id: orgrim
github_id: orgrim
tags: [PostgreSQL, SELinux, sécurité]
---

Lorsqu'on utilise les paquets RPM du PGDG, les instances PostgreSQL ne
sont pas confinées par SELinux, voici comment configurer son système
pour remédier à cela.

<!--MORE-->

L'installation de PostgreSQL fournit par Red Hat dans sa distribution
par défaut est confinée par SELinux, par contre, la version majeure de
PostgreSQL est la version 8.4 dans RHEL/CentOS 6. Ce qui fait que les
paquets RPM fournis par le PGDG sont massivement utilisés : ils
permettent de choisir la version majeure de PostgreSQL qu'on installe
et plusieurs versions majeures peuvent cohabiter.

Le problème par rapport à SELinux est qu'il manque les file contexts
adaptés aux chemins particuliers de ces paquets. Faire cohabiter
plusieurs versions majeures n'a pas été prévu par Red Hat pour
PostgreSQL. De plus, l'utilisation de `pg_ctl` directement avec les
paquets Red Hat peut déconfiner le service.

Avant de commencer, il faut savoir administrer un minumum SELinux : si
vous ne savez pas qu'il existe des options `-Z`, ce que sont les
contexts, les types et les domaines, mieux vaut d'abord se documenter,
par exemple [chez Red Hat].

Voici donc les file contexts à ajouter dans un fichier *module.te* pour
confiner l'installation PostgreSQL du PGDG :

    /etc/rc\.d/init\.d/(se)?postgresql(-.*)?    --  gen_context(system_u:object_r:postgresql_initrc_exec_t,s0)
    /usr/pgsql-[0-9]+\.[0-9]+/bin/initdb        --  gen_context(system_u:object_r:postgresql_exec_t,s0)
    /usr/pgsql-[0-9]+\.[0-9]+/bin/pg_ctl        --  gen_context(system_u:object_r:postgresql_initrc_exec_t,s0)
    /usr/pgsql-[0-9]+\.[0-9]+/bin/postgres      --  gen_context(system_u:object_r:postgresql_exec_t,s0)
    /usr/pgsql-[0-9]+.[0-9]+/share/locale(/.*)?	    gen_context(system_u:object_r:locale_t,s0)
    /usr/pgsql-[0-9]+.[0-9]+/share/man(/.*)?        gen_context(system_u:object_r:man_t,s0)

Tout d'abord, pour l'init script et `pg_ctl`, on utilise le type
`postgresql_initrc_exec_t`, c'est ce qui permet de lancer PostgreSQL
dans le domaine confiné `postgresql_t` au boot, via l'init script, et
manuellement. La méthode la plus propre est de toujours utiliser
l'init script, idéalement par l'intermédiaire de `run_init` pour
démarrer, arrêter ou redémarrer le postmaster. On évite alors de
laisser trainer des choses dans `/var/{run,lock}`.

Les programmes `postgres` et `initdb` doivent avoir le type
`postgresql_exec_t` car ils exécutent le serveur PostgreSQL ; cela
doit se faire dans le domaine `postgresql_t`.

Enfin, on a placé les labels corrects sur les fichiers de traduction
et les pages de man, pour faire plus propre. Ce code source de module
SELinux alors doit être compilé et chargé.

Cette configuration est reprise dans le module SELinux disponible sur
[github]. On peut aussi l'ajouter manuellement avec `semanage` :

    semanage fcontext -a -t postgresql_initrc_exec_t '/etc/rc\.d/init\.d/(se)?postgresql(-.*)?'
    semanage fcontext -a -t postgresql_exec_t '/usr/pgsql-[0-9]+\.[0-9]+/bin/initdb'
    semanage fcontext -a -t postgresql_initrc_exec_t '/usr/pgsql-[0-9]+\.[0-9]+/bin/pg_ctl'
    semanage fcontext -a -t postgresql_exec_t '/usr/pgsql-[0-9]+\.[0-9]+/bin/postgres'
    semanage fcontext -a -t locale_t '/usr/pgsql-[0-9]+.[0-9]+/share/locale(/.*)?'
    semanage fcontext -a -t man_t '/usr/pgsql-[0-9]+.[0-9]+/share/man(/.*)?'

Il existe un certain nombre de booleans pour la configuration des
droits SELinux de PostgreSQL, le plus important concerne `rsync`,
souvent nécessaire pour faire des base backups. Il s'agit de
`postgresql_can_rsync`, pour l'activer :

    semanage boolean -m --on postgresql_can_rsync

Si on lance l'instance sur un port TCP différent de 5432, il faut
l'autoriser dans la configuration locale de SELinux :

    semanage port -a -t postgresql_port_t -p tcp <port>

Enfin, il ne faut pas oublier d'appliquer les contexts aux fichiers
soit avec `restorecon`, un relabel complet au reboot ou `chcon`.

[github]: http://github.com/dalibo/selinux-pgsql-pgdg
[chez Red Hat]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/index.html