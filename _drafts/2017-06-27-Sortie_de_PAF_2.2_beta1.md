---
layout: post
title: Sortie de la beta de PAF v2.2.0
author: Léo Cossic
twitter_id: dalibolabs
github_id: dalibo
tags: [Ldap, ldap2pg, postgresql, tool, opensource, dalibolabs, dalibo, labs]

---

*Paris, le 29 juin 2017*

Étienne, un des développeurs de notre "agence dev", a prit l'initiative, pour répondre au besoin d'un client, de créer un outil permettant de synchroniser les ACL Postgres depuis LDAP.


<!--MORE-->


Continuous Integration report Code coverage report

Ldap2pg est un couteaux suisse permettant de synchroniser les listes de contôles des accès depuis n'importe quel répertoire LDAP.

Fonctionnalités:

    Creates and drops PostgreSQL roles from LDAP queries.
    Manage role options (CREATE and ALTER).
    Dry run.
    logs LDAP queries as ldapsearch commands.
    logs every SQL queries.
    Reads settings from YAML config file.

$ cat ldap2pg.yml
sync_map:
  ldap:
    base: ou=people,dc=ldap2pg,dc=local
    filter: "(objectClass=organizationalRole)"
    attribute: cn
  role:
    name_attribute: cn
$ ldap2pg
 INFO Starting ldap2pg 0.1.
 INFO Creating new role alice.
WARNI Dropping existing role toto.
 INFO Synchronization complete.
$

See versionned ldap2pg.yml for further options.
Installation

Install it from GitHub tarball:

pip install https://github.com/dalibo/ldap2pg/archive/master.zip

ldap2pg is licensed under PostgreSQL license.
