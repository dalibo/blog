---
layout: post
title: Sortie de PostgreSQL 11.2, 10.7, 9.6.12, 9.5.16, 9.4.21
author: Damien Clochard, Stefan Fercot, Christophe Courtois
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, sécurité, sortie, issue, 11]
---

*Paris, le 14 février 2019*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour 
toutes les versions supportées de PostgreSQL, à savoir : 11.2, 10.7, 9.6.12, 
9.5.16 et 9.4.21.

<!--MORE-->

Cette mise à jour change le comportement de PostgreSQL vis-à-vis de `fsync()` 
et inclus des corrections concernant le partitionnement ainsi que plus de 70 
autres bugs reportés lors de ces trois derniers mois.

      
## Changement de comportement avec fsync()

Lorsque disponible sur le système et activé dans la configuration (ce qui est 
le comportement par défaut), PostgreSQL utilise la fonction du noyau `fsync()` 
pour s'assurer que les données sont écrites sur disque.
Sur certains systèmes fournissant cette fonction, lorsque le noyau ne peut 
écrire les données, il renvoie un code d'erreur mais vide de son cache les 
données qui étaient supposées être écrites.

L'effet secondaire néfaste de ce vidage de cache est que si PostgreSQL essaie 
d'écrire à nouveau ces données sur disque en appelant la fonction `fsync()`, 
celle-ci ne retournera plus d'erreur, mais les données que PostgreSQL croyait 
sauvegardées sur disque n'auront en réalité pas été écrites. Cela représente 
un possible scénario de corruption de données.

Cette mise à jour modifie la façon dont PostgreSQL gère les erreurs à l'appel 
de la fonction `fsync()`. PostgreSQL ne retentera plus d'appeler à nouveau 
cette fonction mais entrera en mode "PANIC".
Dans ce cas, PostgreSQL peut ré-appliquer les données depuis les journaux de 
transactions (WAL) pour s'assurer que les données soient bien écrites. 
Alors que cela peut ne pas sembler être une solution optimale, il n'existe 
actuellement que peu d'alternatives et, d'après les erreurs rapportées, 
ce cas de figure ne se produit que très rarement.

Un nouveau paramètre serveur `data_sync_retry` a été ajouté pour gérer ce 
comportement. Si vous êtes certain que le noyau ne vide pas les données 
non écrites dans de tels cas, passez `data_sync_retry` à `on` restaure 
l'ancien comportement.


## Corrections de bugs et améliorations

Cette mise à jour introduit un changement dans la manière de présenter 
les notes de version ("release notes"). À partir de cette mise à jour, toutes
les versions supportées de PostgreSQL contiendront uniquement les notes
relatives à la version majeure en question. Par exemple, PostgreSQL 11
contiendra uniquement les notes pour les versions 11.2, 11.1 et 11.0. Les 
notes de version des versions non supportées (PostgreSQL 9.3 et précédentes) 
seront disponibles dans les anciennes publications et dans une archive 
qui sera prochainement disponible sur le site web de PostgreSQL.

 Cette mise à jour corrige également plus de 70 bugs qui ont été rapportés durant les 
 derniers mois. Certains de ces problèmes affectent uniquement la version 11,
 mais beaucoup concernent toutes les versions supportées :

Ces corrections concernent notamment :
          
 * Correction de la gestion des index uniques avec colonnes incluses ( `INCLUDE`)
 sur les tables partitionnées 
 * Garantir que les contraintes `NOT NULL` sur une table partitionnée sont 
    respectées dans les partitions
* Plusieurs corrections concernant les contraintes sur les tables partitionnées
* Corrections de problèmes lors de l'application de `ON COMMIT DROP` et  
   `ON COMMIT DELETE ROWS ` sur des tables partitionnées et sur les tables
   ayant des tables enfants (héritage)
* Interdiction de `COPY FREEZE`  sur les tables partitionnées
* Plusieurs corrections pour la commande   `ALTER TABLE .. ADD COLUMN` 
   avec une valeur par défaut non-null, incluant un possible risque de corruption d'index
*  Plusieurs corrections sur les index GIN, notamment pour éviter un blocage de verrou
pendant un VACUUM et l'ajout d'index de manière concurrente (ce changement 
annule partiellement une amélioration de performance introduite dans la version 10) 
*  Correction de crash potentiels de la réplication logique lorsque des index sont
   utilisés avec des  expressions ou des prédicats
*  Plusieurs corrections concernant les journaux de transactions (WAL)
*  Correction d'un crash potentiel de requêtes `UPDATE` avec plusieurs clauses
    `SET`  utilisant des sous-requêtes `SELECT`
*  Correction d'un crash lorsqu'aucune ligne n'est fournie aux fonctions 
    `json[b]_populate_recordset()` ou `json[b]_to_recordset()`   
*  Plusieurs corrections liée à la gestion des collations, notamment le décodage
   des expressions sensibles à la collation dans les arguments d'une requête `CALL`
* Plusieurs correctifs du planificateur, incluant une amélioration de la vitesse de la planification pour de grands groupes d'héritage ou tables partitionnées
* Plusieurs correctifs pour `TRUNCATE`
* S'assurer que `ALTER TABLE ONLY ADD COLUMN IF NOT EXISTS` est traité correctement
* Permet `UNLISTEN` en mode standby (réplica)
* Correction du parsing des listes de noms de serveurs séparées par des espaces dans le paramètre ldapserver des entrées LDAP de `pg_hba.conf`
* Plusieurs correctifs pour ecpg
* Plusieurs correctifs pour psql, dont le fonctionnement de `\g target` avec  `COPY TO STDOUT`
* Le générateur de nombres aléatoires de `pgbench` avec `--random-seed=N` est à présent totalement déterministe et indépendant de la plateforme
* Correction de  `pg_basebackup` et `pg_verify_checksums` pour ignorer correctement les fichiers temporaires
* Plusieurs correctifs pour `pg_dump`, incluant la présence  de commandes `ALTER INDEX SET STATISTICS`
* Prévenir de fausses alertes de corruption d'index par contrib/amcheck causées par des données compressées en ligne
* Support de nouvelles variables de Makefile pour la construction d'extensions
      
Cette mise à jour contient la version 2018i des modifications légales des fuseaux horaires
au Kazakhstan, à Metlakatla et Saó Tomé et Principe. La zone Qyzylorda au Kazakhstan
est coupée en deux, créant une nouvelle zone  Asia/Qostanay, car certains endroits n'ont pas changé d'écart par rapport à UTC.
Corrections historiques pour Hong Kong et plusieurs îles du Pacifique.

## Fin de vie pour PostgreSQL 9.4

La version 9.4 sera en fin de vie à compter du 13 février 2020. Pour de plus 
amples explications, reportez-vous à la politique de versionnement.

## Mise à jour

Toutes les mises à jour PostgreSQL sont cumulatives. Tout comme les autres
versions mineures, il n’est pas utile pour les utilisateurs de décharger et
recharger leur base de données ou d’utiliser pg_upgrade pour appliquer cette
mise à jour. Vous devrez simplement arrêter votre instance PostgreSQL et
mettre à jour les exécutables.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures
pourraient avoir besoin de lancer des étapes supplémentaires après la mise à
jour. Merci de consulter les notes de version des versions précédentes pour
plus de détails.

## Liens

* [Téléchargement](https://www.postgresql.org/download)
* [Notes de version](https://www.postgresql.org/docs/current/static/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)

      
