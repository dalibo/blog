---
layout: post
title: Sortie de PostgreSQL 10.3, 9.6.8, 9.5.12, 9.4.17, 9.3.22
author: David Bidoc
twitter_id: dalibo
github_id: dalibo
tags: [opensource, postgresql, release, mineure, dalibo]
---

---
*Paris, le 01 mars 2018*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 10.3, 9.6.8, 9.5.12, 9.4.17 et 9.3.22.

<!--MORE-->

Le but de cette version est de corriger la vulnérabilité CVE-2018-1058, qui décrit comment un utilisateur peut créer des objets du même nom dans différents schémas qui peuvent modifier le comportement des requêtes d'autres utilisateurs et provoquer un comportement inattendu ou malveillant, également connu sous le nom d'attaque « cheval de Troie ». Une grande partie de cette version est centrée sur de la documentation supplémentaire décrivant le problème et comment prendre des mesures pour atténuer l'impact sur les bases de données PostgreSQL.

Nous encourageons fortement tous nos utilisateurs à consulter [A Guide to CVE-2018-1058: Protect Your Search Path](https://wiki.postgresql.org/wiki/A_Guide_to_CVE-2018-1058:_Protect_Your_Search) pour une explication détaillée du CVE-2018-1058 et pour savoir comment protéger vos installations PostgreSQL.

Après avoir lu la documentation du CVE-2018-1058, un administrateur de base de données peut avoir besoin d'en suivre les étapes sur ses instances PostgreSQL pour s'assurer qu'elles sont protégées contre l'exploitation de la vulnérabilité.

### Problèmes de Sécurité 

Une faille de sécurité est corrigée dans cette version :

  * CVE-2018-1058: Elément de chemin de recherche (_search_path_) non contrôlé dans pg_dump et autres applications clientes

Veuillez consulter [A Guide to CVE-2018-1058: Protect Your Search Path](https://wiki.postgresql.org/wiki/A_Guide_to_CVE-2018-1058:_Protect_Your_Search) pour une explication complète du CVE-2018-1058.

### Corrections et améliorations de bugs

Cette mise à jour corrige plusieurs bugs rapportés depuis la dernière mise à jour cumulative. Certains de ces problèmes n'affectent que la version 10, mais beaucoup concernent toutes les versions supportées. Ces correctifs incluent :

  * Empêcher la réplication logique d'essayer de répliquer les changements pour des relations non publiables, telles que les vues matérialisées et les tables « information_schema » ;
  * Correction d'une expression de table commune (clause WITH) qui renvoie des résultats corrects lorsqu'elle est référencée dans un sous-plan avec des revérifications de mise à jour simultanées ;
  * Correction d'une erreur inattendue du planificateur de requêtes dans certains cas où des clauses de jointure de fusion (_merge join_) se chevauchent dans un OUTER JOIN ;
  * Correction d'une corruption de données potentielle avec des vues matérialisées après l'exécution de pg_upgrade. Si vous rencontrez des erreurs telles que « could not access status of transaction » ou « found xmin from before relfrozenxid » sur des vues matérialisées, veuillez utiliser « REFRESH MATERIALIZED VIEW » sans « CONCURRENTLY » pour corriger ;
  * Plusieurs correctifs pour pg_dump, y compris un correctif pour aider avec le travail futur des statistiques sur plusieurs tables ;
  * Correction pour rapporter une trace de pile PL/Python relative aux fonctions internes PL/Python ;
  * Permettre à contrib/auto_explain de monter jusqu'à INT_MAX, soit environ 24 jours ;
  * Marquage des variables de configuration assorties en tant que PGDLLLIMPORT, pour faciliter le portage des modules d'extension vers Windows.
    
### Remerciements

Le PostgreSQL Global Development Group voudrait remercier Arseniy Sharoglazov pour avoir rapporté le CVE-2018-1058 à l'équipe de sécurité.

### Liens

  * [A Guide to CVE-2018-1058: Protect Your Search Path](https://wiki.postgresql.org/wiki/A_Guide_to_CVE-2018-1058:_Protect_Your_Search)
  * [Télécharger](https://www.postgresql.org/download)
  * [Notes de versions](https://www.postgresql.org/docs/current/static/release.html)
  * [Sécurité](https://www.postgresql.org/support/security/)
  * [Cycle de version](https://www.postgresql.org/support/versioning/)

