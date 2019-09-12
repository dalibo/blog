---
layout: post
title: Sortie de ldap2pg version 4.0 
author: Étienne Bersac
twitter_id: Dalibolabs
github_id: Dalibo
tags: [PostgreSQL, ldap, ldap2pg, migration, release, Dalibo Labs, synchronisation, sécurité]
---

---
*Paris, le 22 décembre 2017*

[ldap2pg](http://ldap2pg.rtfd.io/en/latest/) est un outil de synchronisation des
rôles et des ACL dans PostgreSQL à partir d’un annuaire compatible LDAP. La
configuration est simple et puissante, via un [fichier
YAML](http://ldap2pg.rtfd.io/en/latest/config). `ldap2pg` facilite l’intégration
et la sécurisation de PostgreSQL dans votre infrastructure.

Juste avant les fêtes, [ldap2pg
4.0](http://ldap2pg.rtfd.io/en/latest/changelog/#ldap2pg-40) arrive avec des
[ACL prédéfinies](http://ldap2pg.rtfd.io/en/latest/wellknown), le support
[CentOS 6](http://ldap2pg.rtfd.io/en/latest/install/), la gestion des caractères
unicode et son lot de correctifs.

Joyeux Noël !

<!--MORE-->

Fonctionner sur **CentOS 6** demande d'être compatible avec Python 2.6 et
[Psycopg](http://initd.org/psycopg/docs/) 2.0. Deux bibliothèques
supplémentaires sont requises pour la compatibilité ascendante :
[python-logutils](https://pythonhosted.org/logutils/) et
[python-argparse](https://github.com/ThomasWaldmann/argparse/). Ces
bibliothèques sont disponibles dans CentOS 6.9 avec les dépôts `updates` et
`epel-release`. Attention, la `libpq` de CentOS 6 ne supporte pas les URL de la
forme `postgres://utilisateur:motdepasse@hote`.

`ldap2pg` révoque finement les privilèges de la base. Cela évite de faire une
révocation générale des ACL avant de réaccorder les privilèges. Cette
introspection des privilèges accordés demande des connaissances pointues des
entrailles d'une instance Postgres. Pour rendre la gestion des ACL plus facile,
`ldap2pg` fournit des **ACL prédéfinies**, fruit de notre expérience à Dalibo.

Un nouveau type d'ACL apparaît avec cette version pour gérer `ALTER DEFAULT
PRIVILEGES`. Les privilèges par défaut sont liés à la création des roles et non
à la création du schéma. En gérant de paire les rôles et les ACL, `ldap2pg`
garantie la cohérence des ACL. Lorsqu'une ACL par défaut est accordée, `ldap2pg`
accorde le privilège par défaut sur tout les superutilisateurs du cluster au
role privilégié. De même, en cas de nouveau superutilisateur, les privilèges par
défaut sont accordés à tous les roles privilégiés.


__ Retrouvez la documentation, des procédures et le support communautaire à ces
adresses :__

* [Nouveautés de la
  4.0](http://ldap2pg.rtfd.io/en/latest/changelog/#ldap2pg-40)
* Documentation en ligne : http://ldap2pg.rtfd.io/en/latest/
* Le projet sur GitHub : https://github.com/dalibo/ldap2pg

Pour toutes questions techniques, le projet recommande d'utiliser la page du
[projet sur GitHub](https://github.com/dalibo/ldap2pg/issues).
