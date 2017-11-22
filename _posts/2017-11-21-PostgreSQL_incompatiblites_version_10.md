---
layout: post
title: "Migrer vers PostgreSQL 10 : les points à surveiller"
author: Damien clochard
twitter_id: daamien
github_id: daamien
tags: [postgresql, 10, upgrade, nouvelle, version, incompatibilités, MàJ, mise à jour]
---

A chaque nouvelle version de PostgreSQL 10, des changements majeurs peuvent
provoquer des incompatibilités avec les versions précédentes.

Voici un rapide tour d'horizon des points à surveiller lors d'une mise à jour de
vos instances avec la version 10.

<!--MORE-->


## `xlog` devient `wal`

Le terme `xlog` était jusqu'ici utilisé pour nommer les journaux de
transactions ( `Write Ahead Logging` ou WAL). Ceci provoquait des confusions
avec les traces applicatives (`log`). Par exemple certains utilisateurs
supprimaient le contenu du répertoire `pg_xlog` ou utilisaient la commande
`pg_resetxlog` en pensant effacer simplement des logs applicatifs. Cela
pouvait conduire à des pertes de données.

La situation est maintenant clarifiée avec l'usage systématique de l’abréviation
`wal` à la place `xlog` pour désigner les journaux de transactions dans les
noms de répertoires, de fonctions et les paramètres.

Sur le même principe, le terme `clog` devient `xact`, et le terme
`location` est remplacé par `lsn` pour désigner l'emplacement des journaux
de transactions.

**Attention** : Si vous avez développé des scripts ou des outils de sauvegarde,
de gestion ou de monitoring, vous devez mettre à jour le code pour prendre en
compte ce changement.

Les répertoires suivants sont renommés :
  * `pg_xlog` devient `pg_wal`
  * `pg_clog` devient `pg_xact`

Par ailleurs, selon le système de paquets que vous utilisez, le répertoire des
traces applicatives sera peut-être renommé de `pg_log` à simplement `log`.

De nombreuses fonctions d'administration ont été renommées pour utliser `wal`
et `lsn` :

  * `pg_current_xlog_flush_location` ->	`pg_current_wal_flush_lsn`
  * `pg_current_xlog_insert_location`  ->	`pg_current_wal_insert_lsn`
  * `pg_current_xlog_location`	 -> `pg_current_wal_lsn`
  * `pg_is_xlog_replay_paused`  ->	`pg_is_wal_replay_paused`
  * `pg_last_xlog_receive_location` ->	`pg_last_wal_receive_lsn`
  * `pg_last_xlog_replay_location` ->	`pg_last_wal_replay_lsn`
  * `pg_switch_xlog` ->	`pg_switch_wal`
  * `pg_xlog_location_diff` ->	`pg_wal_lsn_diff`
  * `pg_xlog_replay_pause` ->	`pg_wal_replay_pause`
  * `pg_xlog_replay_resume` ->	`pg_wal_replay_resume`
  * `pg_xlogfile_name` ->	`pg_walfile_name`
  * `pg_xlogfile_name_offset` ->	`pg_walfile_name_offset`

De plus les attributs de certaines vues système et fonctions ont changé :

  * Pour la vue `pg_stat_replication` :
    * `write_location` -> `write_lsn`
    * `sent_location` -> `sent_lsn`
    *  `flush_location` -> `flush_lsn`
    * `replay_location` -> `replay_lsn`
  * Pour `pg_create_logical_replication_slot`: `wal_position` -> `lsn`
  * Pour `pg_create_physical_replication_slot`: `wal_position` -> `lsn`
  * Pour `pg_logical_slot_get_changes`: `location` -> `lsn`
  * Pour `pg_logical_slot_peek_changes`: `location` -> `lsn`

Enfin plusieurs outils en ligne de commande ont été renommés :

  * `pg_receivexlog` -> `pg_receivewal`
  * `pg_resetxlog` -> `pg_resetwal`
  * `pg_xlogdump` -> `pg_waldump`
  * `initdb` et `pg_basebackup` ont une option `--waldir` à la place de
    `--xlogdir`
  * `pg_basebackup` a une option `--wal-method` au lieu de `--xlog-method`


## Numérotation des versions

À partir de la version 10, PostgreSQL remplace les noms de version à 3 nombres
par des noms de version à 2 nombres. En conséquence :

  * la version **majeure** est dorénavant identifiée par un seul nombre (10), et
    non plus les deux premiers (9.6) ;
  * la version **mineure** reste identifiée par le dernier nombre du numéro de
    version complet (10.1, 9.6.3)

Pour les différences entre version majeure et mineure, voir cette page :

<https://www.postgresql.org/support/versioning/>

Si vous avez développé des scripts ou des outils qui détectent la version de
PostgreSQL, ce changement vous concerne directement. Il est fortement recommandé
de modifier vos outils pour qu'ils se basent sur le paramètre GUC
`server_version_num` ou sur la fonction `PQserverVersion` de libpq pour
détecter la version de PostgreSQL. Vous obtiendrez un numéro de version sur 6
chiffres qui sera plus simple d'usage :

| Nom de Version  |  Majeure|  Patch de Sécurité  |  server_version_num  |
|-----------------|---------|---------------------|----------------------|
| 9.6.0	          |  9.6    |    0	              |   090600             |
| 9.6.3	          |  9.6    |    3	              |   090603             |
| 10.0	          |  10	    |    0	              |   100000             |
| 10.1	          |  10	    |	 1                  |   100001             |



## SQL

  * Les index Hash doivent être impérativement être reconstruits si vous faites
    une montée de version avec `pg_upgrade`. Un script est fourni pour le
   faire.

  * Les fonctions retournant des ensembles (`set-returning functions`) sont
    désormais évaluées avant l'évaluation des expressions scalaires dans la
    liste des `SELECT`, comme si elles étaient placées dans une clause `LATERAL`
    `FROM`. Voir la section [37.4.8](https://docs.postgresql.fr/10/xfunc-sql.html#XFUNC-SQL-FUNCTIONS-RETURNING-SET)
    de la documentation pour plus de précisions.

  * Le mot-clé `ROW` peut maintenant être utilisé dans la syntaxe `UPDATE ...
    SET (column_list) = row_constructor`. Il est d'ailleurs requis si une seule
    colonne est spécifiée dans la liste des colonnes (`column_list`).

  * Quand une requête `ALTER TABLE ... ADD PRIMARY KEY` marque des colonnes
    comme `NOT NULL`, le changement est maintenant propagé à toutes les tables
    filles également.

  * Les triggers au niveau requête (`statement-level triggers`) ne peuvent
    plus être executés plus d'une fois par requête. Dans les versions
    précédentes des cas très particuliers impliquant des requêtes CTE mettant à jour
    la même table ou une requête CTE lancée par un trigger `BEFORE STATEMENT` ou
    `AFTER STATEMENT`, pouvaient provoquer plusieurs déclenchements de certains
    triggers. Ce comportement était contraire au standard SQL et il est désormais
    corrigé.


## Arrêt du support de timestamps flottants

Les timestamps flottants (`floating-point timestamps`) était activables via
une option de compilation spécifique et dans les faits ils semblaient très peu
utilisés. Si vous faites partie des utilisateurs de cette option, il est
impératif de faire une montée de version par sauvegarde/restauration (pas de
`pg_upgrade` !).


## pg_dump ne fonctionne plus pour les versions antérieures à PostgreSQL 8.0


**Attention** : si vous avez encore des versions 7.4 en production ! Vous ne
pourrez pas récupérer vos données avec la version 10 de `pg_dump` et de
`pg_dumpall`. Vous devrez utiliser une version intermédiaire par exemple le
binaire `pg_dump` de la 9.6 pour extraire les données de l'instance.  Plus que
jamais si vous avez une version non supportée de PostgreSQL il est urgent de
prévoir une montée de version !


## Configuration par défaut de la réplication

Nouvelles valeurs par défaut :

  * `wal_level = replica`
  * `max_wal_senders = 10`
  * `max_replication_slots = 10`


## Parallélisme 

Le paramètre `min_parallel_relation_size` est remplacé par les deux paramètres
suivants :
  * `min_parallel_table_scan_size`
  * `min_parallel_index_scan_size`

## pg_basebackup 

Si elle n'est pas spécifiée explicitement, l'option `--wal-method` (`-X`) de
l'outil `pg_basebackup` (qui remplace l'ancienne option `--xlog-method`) est
maintenant positionnée à `stream`. Cela permet d'obtenir des sauvegardes
complètes et cohérentes par défaut, sans nécessiter une configuration de
l'archivage des WAL par exemple.
Pour retrouver le même comportement que les anciennes versions (pas de
récupération des WAL lors de l'exécution de la commande), il faut utiliser
`--wal-method=none`.

L'option `--xlog` (`-x`) est supprimée. Pour retrouver son comportement, il
faut utiliser `--wal-method=fetch`.


## Suppression du module contrib/tsearch2

Tsearch2 est un module contrib très ancien qui était précurseur en matière de
recherche plein-texte. La recherche plein texte est parfaitement intégrée dans
PostgresQL depuis des années et ce module était conservé pour maintenir la
compatibilité avec les anciennes installations. Ce module est désormais supprimé
et ne sera plus distribué avec PostgreSQL. Les utilisateurs qui utilisent ce
module depuis la version 8.3 doivent désormais compiler tsearch2 par eux-mêmes ou
de préférence utiliser les fonctions de recherche plein texte intégrées dans
PostgreSQL 10.


## Sécurité

Il est désormais impossible de stocker des mots en passe non chiffrés. Le
paramètre `password_encryption` n'accepte plus les valeurs `off` ou
`plain`, la valeur par défaut est `md5`. L'option `UNENCRYPTED` n'existe
plus pour `CREATE/ALTER USER ... PASSWORD`. Les mots de passe non chiffrés
seront chiffrés automatiquement dans cette nouvelle version.

Ajout du paramètre `ssl_dh_params_file` pour préciser le fichier contenant les
paramètres OpenSSL DH .

Augmentation de la taille par défaut des paramètres OpenSSL DH à 2048 bits.


## Changements mineurs

  * Fin du support du protocole FE/BE 1.0, déprécié depuis 1998 (les versions
    client antérieures à PostgreSQL 6.3 sont susceptibles d'être affectées)
  * La valeur par défaut de `log_directory` passe de `pg_log` à `log`
  * Le module d'auto-chargement de PL/Tcl est remplacé par les paramètres
    `pltcl.start_proc` et `pltclu.start_proc`
  * Suppression des outils en ligne de commande : `createlang` et
    `droplang`. Utiliser `CREATE` et `DROP EXTENSION` à la place
  * Suppression du  paramètre `sql_inheritance` qui permettait d'exclure par
    défaut les tables filles lors d'une requête sur la table mère, car il était
    contraire au standard SQL et déprécié depuis plusieurs versions
  * Les valeurs du paramètre `shared_preload_libraries` ne sont plus
    transformées automatiquement en minuscule
  * L'option `wait` (`-w`) de `pg_ctl` est activée par défaut et implique
    donc que `pg_ctl` attend dorénavant la fin des tâches lancées avant de
    rendre la main
  * Autoriser le passage de tableaux à dimensions multiples en entrée et en
    sortie (//nested Python lists//) des fonctions PL/Python
  * Les données internes sur les séquences sont déplacées dans une table système
    nommée `pg_sequence`.
  * Le format de sortie de la commande `\d` dans l'outil `psql` a été
    entièrement revu
  * Fin du support de la convention d'appel « version 0 » pour les fonctions en
    C (voir : <https://docs.postgresql.fr/10/xfunc-c.html>)
