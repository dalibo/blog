---
layout: post
title: Sortie de PostgreSQL 9.5.1, 9.4.6, 9.3.11, 9.2.15 et 9.1.20
author: Gilles Darold
twitter_id: dalibo
github_id: dalibo
tags: [PostgreSQL, sécurité, upgrade, 9]

---
*Paris, le 11 février 2016*

Le PostgreSQL Global Development Group a publié une mise à jour de toutes les versions supportées du SGBD, incluant les versions 9.5.1, 9.4.6, 9.3.11, 9.2.15 et 9.1.20. Ces versions mineures corrigent deux problèmes de sécurité, ainsi qu'un certain nombre de problèmes découverts sur les quatre derniers mois. Les utilisateurs vulnérables aux problèmes de sécurité doivent mettre à jour leur installation immédiatement; les autres doivent planifier la mise à jour dès que possible.

<!--MORE-->

## Correction d'un problème de sécurité dans les expressions régulières, PL/Java

Cette publication clôt la faille de sécurité CVE-2016-0773, un problème avec l'analyse d'expressions régulières (regex). Le code précédent permettait à l'utilisateur de passer dans les expressions des valeurs en dehors de l'intervalle de caractères unicodes, déclenchant l’arrêt brutal du backend. Ce problème est critique pour les systèmes PostgreSQL avec des utilisateurs non approuvés (untrusted) ou qui génèrent des regex basées sur une entrée utilisateur.

Cette mise à jour corrige aussi CVE-2016-0766, un problème d'élévation de privilège pour les utilisateurs de PL/Java. Certains paramètres de configuration particuliers (GUCS) pour le PL/Java sont maintenant seulement modifiables par le super-utilisateur de la base de données.

## Autres corrections et améliorations

En plus des corrections indiquées ci-dessus, de nombreuses corrections de problèmes rapportés par les utilisateurs ces derniers mois ont été inclues. Ceci inclut notamment de nombreuses corrections sur les nouvelles fonctionnalités introduites en version 9.5.0, ainsi que la réécriture de pg_dump pour éliminer des problèmes chroniques dans la sauvegarde des extensions. Parmi eux il y a :


* Correction de nombreux problèmes dans pg_dump avec certains types d'objets
* Prévention de l'affaissement over-eager des clauses HAVING pour les GROUPING SETS
* Correction de la transformation en chaîne de caractères des erreurs avec les clauses ON CONFLICT ... WHERE
* Correction d'erreurs de tableoid pour postgres_fdw
* Prévention d'exception sur les floating-point dans pgbench
* Fait en sorte que \det recherche toujours les noms de tables distantes
* Correction de l'encadrement par quote des noms de contraintes des domaines dans pg_dump
* Prévention d'introduire des objets étendus dans les noeuds Const
* Permet la compilation du PL/Java sur Windows
* Correction de l'erreur "unresolved symbol" dans l'exécution de code PL/Python
* Permet l'utilisation de Python2 et Python3 dans la même base de donnée
* Ajout du support de Python 3.5 dans le PL/Python
* Corrige un problème avec la création de sous répertoire pendant l'initdb
* Fait en sorte que pg_ctl rapporte le statut correctement sur Windows
* Supprime une erreur apportant de la confusion quand pg_receivexlog est utilisé avec de vieux serveurs
* Nombreuses corrections et ajouts dans la documentation
* Correction de calculs de hash erronés dans gin_extract_jsonb_path()

Cette publication contient aussi la version 2016a de tzdata, qui réalise les mises à jour des timezones pour les zones Iles Caiman, Metlakatla, Trans-Baikal Territory (Zabaykalsky Krai), et Pakistan.

## Comment mettre à jour ?

Les utilisateurs des versions 9.4 devront reindexer tout index jsonb_path_ops déjà créé, pour corriger un problème persistant d'entrées manquantes dans ces index.

Comme avec les autres versions mineures, les utilisateurs n'ont pas besoin de sauvegarder et restaurer les bases de données ou d'utiliser pg_upgrade pour mettre en place cette mise à jour. Vous pouvez simplement arrêter PostgreSQL, mettre à jour les binaires et le redémarrer. Les utilisateurs qui ont ignoré plusieurs mises à jour mineures peuvent avoir besoin de réaliser des opérations après mise à jour. Voir les notes de version pour les détails.

Liens:

  * Téléchargement: [http://postgresql.org/download](http://postgresql.org/download)
  * Notes de version: [http://www.postgresql.org/docs/current/static/release.html](http://www.postgresql.org/docs/current/static/release.html)


