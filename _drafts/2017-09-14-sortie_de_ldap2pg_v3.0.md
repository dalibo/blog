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

`ldap2pg` est un outils de synchronisation des rôles et des ACL dans PostgreSQL à partir d’un annuaire compatible LDAP. Une nouvelle version 3.0 vient de sortir avec quelques correctifs et améliorations particulièrement autour des ACL.

La configuration est simple et puissante, via un fichier YAML. Ldap2pg permet également d’auditer une instance PostgreSQL. Ldap2pg facilite l’intégration et la sécurisation de PostgreSQL dans votre infrastructure.

<!--MORE-->

**Changements depuis la version 2.0:**

La version 3.0 apporte une rupture de compatibilité: cette version change le formatage des requêtes SQL des ACL pour utiliser le format `{}` de Python plutôt que le style printf, moins pratique avec SQL à cause du conflit de sens du caractère `%`.

Point important, on peut désormais surcharger la requête SQL d'inspection des rôles. Cela permet de séparer de manière logique des rôles ou même de désactiver la gestion des rôles pour ne faire que les ACL.

Lors de la définiton d'ACL, cela peut être pénible d'automatiser l'application d'ACL sur *tout* les schémas. `ldap2pg` gère maintenant un pseudo-schéma `__all__` dans le YAML qui demande d'appliquer les `GRANT` ou `REVOKE` à chaque schéma. En outre, les ACL complexes peuvent être groupées en ACL simple. Cela facilite l'écriture de requête d'introspection des ACL.

Pour faciliter l'intégration avec la supervision ou l'audit, `ldap2pg` a désormais un mode de contrôle avec l'option `--check`. Dans ce mode, `ldap2pg` retourne un code d'erreur `1` si la base n'est pas synchronisée. Couplée avec l'option `--dry`, il permet de faire un rapport et de lever une erreur en cas de base non synchronisée. Cela facilite la surveillance de rôles ou de `GRANT` surnuméraires.

__Vous trouverez la documentation, des procédures et le support communautaire à ces liens:__

* Consultez la documentation : http://ldap2pg.readthedocs.io/en/latest/
* Le projet sur GitHub : https://github.com/dalibo/ldap2pg

La documentation contient désormais des exemples réels d'intégration et de requêtes d'intropsection des ACLs. Pour toute question technique, le projet recommande d'utiliser la page du projet sur GitHub.
