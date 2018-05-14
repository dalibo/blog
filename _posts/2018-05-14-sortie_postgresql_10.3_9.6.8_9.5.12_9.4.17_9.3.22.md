---
layout: post
title: Sortie de PostgreSQL 10.3, 9.6.8, 9.5.12, 9.4.17, 9.3.22
author: Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [opensource, postgresql, postgres, release, maj, dalibo]
---

---

*Paris, le 15 mai 2018*



Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 10.4, 9.6.9, 9.5.13, 9.4.18 et 9.3.23.

<!--MORE-->

Cette mise à jour inclut une mise à jour de sécurité et plusieurs problèmes signalés ces trois derniers mois.
Il est conseillé à tous les utilisateurs de PostgreSQL d'appliquer cette mise à jour dès que possible.

Voir les notes sur la "Mise à jour" plus bas pour les étapes post-mise à jour pour les correctifs de sécurité et le correctif des problèmes de volatilité et de parallélisme de certaines fonctions.

Merci de noter que PostgreSQL a changé son système de numérotation avec la sortie de la v10.0 : le passage à la 10.4 depuis l'une des versions 10.0, 10.1, 10.2, 10.3 est donc considéré comme une mise à jour mineure.
 
## Problèmes de sécurité

Une vulnérabilité a été corrigée par cette mise à jour :

   * CVE-2018-1115 : Access Control List trop permissive sur la fonction "pg_logfile_rotate()"

Voir la section "Mise à jour" plus bas pour les étapes d'après mise à jour.
 
## Corrections de bugs et améliorations

Cette mise à jour corrige plus de 50 bugs signalés ces derniers mois. Certains problèmes concernent uniquement la version 10 mais beaucoup affectent toutes les versions supportées :

   * Correction de la volatilité et du degré de sûreté au parallélisme de plusieurs fonctions pour assurer que l'optimisation mènera à des plans d'exécution corrects
   * Plusieurs corrections pour le partitionnement, dont des crashs potentiels, ainsi que l'ajout de la possibilité d'utiliser "TRUE" ou "FALSE" comme borne de partition
   * Correction de la possibilité pour une nouvelle valeur TOAST de se voir assigner un TOAST OID mort mais non encore traité par "VACUUM", ce qui provoquerait une erreur similaire à "unexpected chunk number 0 (expected 1) for toast value nnnnn"
   * Correction de la commande "CREATE TABLE ... LIKE" avec des spécifications d'identité "bigint" sur des plates-formes 32 bits
   * Correction d'une fuite mémoire durant l'exécution d'une requête exécutant des "hash joins" successifs
   * Plusieurs corrections de crash sur des requêtes utilisant "GROUPING SET"
   * Correction visant à éviter un échec si un signal d'annulation de requête ou de fin de session se produit pendant la validation d'une transaction préparée
   * Réduction du verrouillage durant la planification des workers pour l'autovacuum, qui pouvait gêner leur fonctionnement en parallèle
   * Correction d'une possible lenteur d'exécution de la commande "REFRESH MATERIALIZED VIEW CONCURRENTLY"
   * Plusieurs corrections sur des plans d'exécution utilisant des noeuds de type "index-only scan"
   * Correction visant à éviter des deadlocks lors de l'utilisation concurrente de commandes "CREATE INDEX CONCURRENTLY" aux niveaux d'isolation sérialisable ("SERIALIZABLE") ou lecture répétée ("REPEATABLE READ")
   * Plusieurs corrections sur les index SP-GiST, dont une sur les recherches sur une colonne "text" prenant en compte le collationnement
   * Plusieurs corrections liées au comptage du nombre de tuples dans des index partiels GiST, SP-GiST et Bloom
   * Plusieurs corrections sur le décodage logique et la réplication
   * Correction de l'encadrement par guillemets dans les dumps des variables GUC contenant des listes (par ex. local_preload_libraries, session_preload_libraries, shared_preload_libraries, temp_tablespaces)
   * Plusieurs corrections pour "pg_stat_activity"
   * Plusieurs corrections pour "ecpg"
   * Correction pour "pg_recvlogical" pour assurer la compatibilité avec les versions de PostgreSQL antérieures à la version 10
   * Plusieurs corrections pour "pg_rewind"

Cette mise à jour contient aussi la version 2018d de tzdata, avec des mises à jour pour la Palestine et Antarctique (Base antarctique Casey), ainsi que des corrections historiques pour le Portugal et ses colonies, pour Enderbury, la Jamaïque, les Îles Turques-et-Caïques et l'Uruguay.
 
## Mise à jour
Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres releases mineures, les utilisateurs n'ont pas besoin de sauvegarder et recharger leur base de données ou d'utiliser "pg_upgrade" pour appliquer cette mise à jour ; vous pouvez simplement arrêter PostgreSQL et mettre à jour ses binaires.
 
Merci de voir également la note "Étapes après mise à jour pour le marquage des fonctions" à propos de la volatilité et du parallélisme des fonctions pour les éventuelles étapes supplémentaires après l'application de la mise à jour.
 
Les utilisateurs n'ayant pas appliqué une ou plusieurs des mises à jour précédentes peuvent avoir besoin d'appliquer d'autres étapes post-mise à jour ; voir les notes des versions précédentes pour les détails.
 
**Étapes après mise à jour pour la CVE-2018-1115**
Si vous avez installé "adminpack" sur une version 9.6 ou 10 de PostgreSQL, il sera nécessaire que l'administrateur de bases de données exécute la commande suivante sur toutes les bases de données dans lesquelles "adminpack" est installé :
 
   * ALTER EXTENSION adminpack UPDATE;

 
**Étapes après mise à jour pour le marquage des fonctions**

Fonctions qui devraient être marquées "volatile" :
 
   * cursor_to_xml
   * cursor_to_xmlschema
   * query_to_xml
   * query_to_xml_and_xmlschema
   * query_to_xmlschema
 
Fonctions qui devraient être marquées "parallel-unsafe" :
 
   * binary_upgrade_create_empty_extension,
   * brin_desummarize_range
   * brin_summarize_new_values
   * brin_summarize_range
   * cursor_to_xml
   * cursor_to_xmlschema
   * gin_clean_pending_list
   * pg_import_system_collations
   * ts_rewrite
   * ts_stat
 
Si vous utilisez l'une des fonctions ci-dessus, vous pouvez mettre à jour le marquage en passant par l'une des méthodes suivantes :
 
_Option 1 :_ Mettre à jour les marquages manuellement dans la table "pg_proc" de chaque base de données qui utilisent ces fonctions. Les commandes suivantes exécutées en tant que super-utilisateur permettent de réaliser cela :
   
    /* Functions that should be marked "volatile" */
    ALTER FUNCTION pg_catalog.cursor_to_xml(refcursor, int, boolean, boolean, text) VOLATILE;
    ALTER FUNCTION pg_catalog.cursor_to_xmlschema(refcursor, boolean, boolean, text) VOLATILE;
    ALTER FUNCTION pg_catalog.query_to_xml(text, boolean, boolean, text) VOLATILE;
    ALTER FUNCTION pg_catalog.query_to_xml_and_xmlschema(text, boolean, boolean, text) VOLATILE;
    ALTER FUNCTION pg_catalog.query_to_xmlschema(text, boolean, boolean, text) VOLATILE;


    /* Functions that should be marked "parallel-unsafe" */
    ALTER FUNCTION pg_catalog.binary_upgrade_create_empty_extension(text, text, bool, text, _oid, _text, _text) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.brin_desummarize_range(regclass, bigint) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.brin_summarize_new_values(regclass) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.brin_summarize_range(regclass, bigint) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.cursor_to_xml(refcursor, int, boolean, boolean, text) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.cursor_to_xmlschema(refcursor, boolean, boolean, text) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.gin_clean_pending_list(regclass) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.pg_import_system_collations(regnamespace) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.ts_rewrite(tsquery, text) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.ts_stat(text) PARALLEL UNSAFE;
    ALTER FUNCTION pg_catalog.ts_stat(text, text) PARALLEL UNSAFE;


_Option 2 :_ Exécuter "pg_upgrade" vers une version qui contient le marquage correct (par ex. 10.4 et au-delà)

## Liens

   * [Annonce Officielle](https://www.postgresql.org/about/news/1851/)
   * [Téléchargement](https://www.postgresql.org/download/)
   * [Notes de Version](https://www.postgresql.org/docs/current/static/release.html)
   * [Securité](https://www.postgresql.org/support/security/)
   * [Cycle des Versions](https://www.postgresql.org/support/versioning/)
  
  
