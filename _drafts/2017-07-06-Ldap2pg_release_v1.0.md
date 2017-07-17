---
layout: post
title: Ldap2pg: release v1.0
author: Étienne Bersac, Léo Cossic
twitter_id: dalibolabs
github_id: dalibo
tags: [ldap, ldap2pg, postgresql, tool, opensource, dalibolabs, dalibo, labs, release]

---

*Paris, le 29 juin 2017*

Dalibo annnonce la première version officielle de son dernier projet [`ldap2pg`](https://ldap2pg.readthedocs.org), votre couteau-suisse pour synchroniser les rôles depuis n'importe quel annuaire LDAP. La version 1.0 apporte la gestion complète des rôles.


<!--MORE-->


Les administrateurs de bases de donnée et les administrateurs système le savent : l'authentification de [PostgreSQL s'intègre bien avec LDAP](https://www.postgresql.org/docs/current/static/auth-methods.html#AUTH-LDAP). Le postulat est seulement que les rôles soient déjà définis dans l'instance Postgres. C'est là que `ldap2pg` se rend utile : il synchronise les rôles dans Postgres à partir de requêtes LDAP.





2.0.4 (WIP)

    Do not install docs anymore (Ronan Dunklau)
    Add a workaround for sampling problems with getrusage(), new parameter pg_stat_kcache.linux_hz is added. By default, this parameter is discovered at server startup (Ronan Dunklau).
    Fix issue when concurrently created entries for the same user, db and queryid could lost some execution counters (Mael Rimbault)

3.1.1 (WIP)

    Bugfix:
        Make sure we wait at least powa.frequency between two snapshot (Marc Cousin and Julien Rouhaud)
        Fix win32 portability of compute_powa_frequeny() (Julien Rouhaud)
        Don't try to read dbentry->tables if it's NULL (Julien Rouhaud)
        Fix compilation for platform with HAVE_CLOCK_GETTIME (Julien Rouhaud, reported by Maxence Ahlouche)
    Miscellaneous:
        Add pg10 Compatibility (Julien Rouhaud)
        Only execute once the powa_stat functions (Julien Rouhaud)
1.0.3:
  Bugfix:
    - Fix a missing call to InstrEndLoop (Tomas Vondra)
    - Sample all nested queries when top level statement is sampled (Julien
      Rouhaud)
    - Make sure hash keys can be compared using memcmp (Julien Rouhaud)
    - Fix behavior with parallel queries (Julien Rouhaud based on a patch by
      Tomas Vondra)
    - Fix bug on TEXTCONST not being byval (Ronan Dunklau)
    - Fix 64bits counters on pass-by-ref float8 architectures (Julien Rouhaud)
    - Fix bug in pg_qualstats_names (Ronan Dunklau)
    - Fix bug in const position (Julien Rouhaud)
    - Fix pg_qualstats_pretty to use text instead of regoper, allowing usage of
      pg_upgrade when pg_qualstats is installed (Julien Rouhaud)
  Miscellaneous:
    - Add pg 10 compatibility (Julien Rouhaud)
- Do not install docs anymore (Ronan Dunklau)





`ldap2pg` est sous license Postgres, toutes contributions sont les bienvenues, même et surtout les plus petites !  Le projet est [publié sur GitHub](https://github.com/dalibo/ldap2pg) avec tests unitaires et tests fonctionnels exécutés par CircleCI. Le projet est particulièrement testé sur CentOS 7, pour python2.7 et python3.4.

La prochaine étape majeure de `ldap2pg` est de gérer les ACLs: nettoyer les ACLs avant de supprimer un rôle, s'assurer qu'un rôle a tout ses accès et pas plus, etc. Une mécanique complexe mais pas insolvable, qui simplifiera beaucoup le travail d'intégration de PostgreSQL dans votre infrastructure et améliorera la confiance dans votre gestion des accès à vos données.
