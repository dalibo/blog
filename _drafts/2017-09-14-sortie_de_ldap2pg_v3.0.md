---
layout: post
title: Sortie de ldap2pg version 3.0 
author: Étienne Bersac, Léo Cossic
twitter_id: @Dalibolabs
github_id: Dalibo
tags: [PostgreSQL, ldap, ldap2pg, sortie, release]

---

---
*Lyon, le 14 septembre 2017*

Ldap2pg est un outils de synchronisation des rôles et des ACL dans PostgreSQL à partir d’un annuaire compatible LDAP. 

<!--MORE-->

La configuration est simple et puissante. Ldap2pg permet également d’auditer une instance PostgreSQL. Ldap2pg facilite l’intégration et la sécurisation de PostgreSQL dans votre infrastructure.

**Changelog depuis la version 2.0:**

    Breakage: Use Python {} format string for ACL queries instead of named printf style.
    Supporte les outils d'installation.
    Fix undefined LDAP password traceback.
    Fix case sensitivity in grant rule.
    ACL inspect query should now return a new column indicating partial grant.
    Allow to customize query to inspect roles in cluster.
    Add check mode: exits with 1 if changes. Juste like diff.
    Add --quiet option.
    Add __all__ schema wildcard for looping all schema in databases.
    Add ACL group to ease managing complex ACL setup.
    Add Cookbook in documentation.

__Vous trouverez la documentation, des procédures et le support communautaire à ces liens:__

* Consultez la documentation: http://ldap2pg.readthedocs.io/en/latest/
* Installez ldap2pg: https://github.com/dalibo/ldap2pg

Pour toute question technique, le projet recommande d'utiliser l'adresse: 
