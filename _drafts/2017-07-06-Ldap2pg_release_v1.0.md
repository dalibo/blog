---
layout: post
title: Ldap2pg: release v1.0
author: Léo Cossic
twitter_id: dalibolabs
github_id: dalibo
tags: [ldap, ldap2pg, postgresql, tool, opensource, dalibolabs, dalibo, labs, release]

---

*Paris, le 29 juin 2017*

`ldap2pg` est votre couteau-suisse pour synchroniser les rôles depuis n'importe quel répertoire LDAP. La version 1.0 avec la gestion complète des rôles est livrée. 


<!--MORE-->


`ldap2pg` est sous license Postgres, toutes contributions sont les bienvenues, même et surtout les plus petites !  Le projet est publié sur GitHub avec tests unitaires et tests fonctionnels exécutés par CircleCI. Le projet est testé sur CentOS 7, pour python2.7 et python3.4.
 
 
Fonctionnalités de la version 1.0:
 
- Créer et supprimer les rôles PostgreSQL depuis les requêtes LDAP
- Gérer les options des rôles (en création et en modification).
- Exécution en mode audit (*dry run*).
- Affiche les requêtes LDAP comme commandes ldapsearch.
- Affiche **toutes** les requêtes SQL.
- Configurable depuis un fichier YAML.
- Compatible Python 3 et python 2.7.

*ldap2pg* est disponible sous Licence PostgreSQL sur PyPI. La version 2.0 gèrera les ACL (*GRANT* et *REVOKE*).

### Installation

*ldap2pg* est testé sur CentOS7 avec OpenLDAP et Postgres 9.6. Installer simplement via pip.

``` console
# pip install ldap2pg
```

Il faut ensuite adapter la configuration selon la structure de votre annuaire.

### Configuration

Le [fichier de configuration proposé dans le projet](https://github.com/dalibo/ldap2pg/blob/master/ldap2pg.yml) est largement commenté.

La première partie contient les options de connexions. Vous pouvez aussi configurer les connexions depuis des variables d'environnement. Attention, si le fichier contient des mots de passe, il doit être en accès limité (`0600`) !

``` yaml
ldap:
  host: ldap2pg.local
  port: 389
  bind: cn=admin,dc=ldap2pg,dc=local
  password: SECRET

postgres:
  dsn: postgres://user:SECRET@host:port/dbname
```

La deuxième partie décris la carte de synchronisation : il s'agit d'une liste de de requêtes LDAP, avec pour chaque requête une ou plusieurs règles d'extraction de rôle Postgres.

``` yaml
sync_map:
 - ldap:
    base: cn=dba,ou=groups,dc=ldap2pg,dc=local
    filter: "(objectClass=groupOfNames)"
    attribute: member
  role:
    name_attribute: member.cn
    options: LOGIN SUPERUSER NOBYPASSRLS
- ldap:
    base: ou=groups,dc=ldap2pg,dc=local
    filter: "(&(objectClass=groupOfNames)(cn=app*))"
    attributes: [cn, member]
  - name_attribute: cn
    members_attribute: member.cn
    options: [NOLOGIN]
  - name_attribute: member.cn
    options:
    LOGIN: yes
```

Avec sa license libre, sa configurabilité et sa batterie de tests, `ldap2pg` s'intègre bien dans la famille des outils Dalibo Labs ! Ldap2pg est développé par [Étienne](https://github.com/bersace), développeur à Dalibo.
