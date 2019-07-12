---
layout: post
title: check_pgbackrest - découvrez la version 1.5 !
author: Stefan Fercot
twitter_id: dalibolabs
github_id: dalibo
tags: [check_pgbackrest, pgbackrest, dalibolabs, nagios, plugin, supervision, sauvegarde, update]
---

Voici la version 1.5 de [check_pgbackrest](https://github.com/dalibo/check_pgbackrest), 
le plugin de supervision de sauvegardes de [pgBackRest](http://pgbackrest.org/) !

<!--MORE-->

-----

## Nouvelles fonctionnalités

  * Ajout de l'option `--debug` pour ajouter des messages de debug.
  * Nouveau paramètre `ignore-archived-since` pour ignorer les WALs archivés 
  dans l'interval spécifié.
  * `--latest-archive-age-alert` permet de définir l'age maximum du dernier 
  WAL archivé avant d'émettre une alerte.

Ces nouvelles fonctionnalités ont principalement pour cible le service de 
vérification des archives.

En effet, principalement pour des raisons de performance, pgBackRest ne 
vérifie pas que l'entièreté des WALs archivés sont réellement présents. 
check_pgbackrest est clairement conçu pour cela.

Plusieurs cas de figures peuvent mener à l'absence (temporaire ou non) de ces 
archives. Par exemple :
  * l'archivage asynchrone;
  * le paramètre `archive-push-queue-max`.

-----

## Exemple d'utilisation

Étant donné le message d'information de pgBackRest suivant :

```bash
$ sudo -iu postgres pgbackrest info --stanza=some_cool_stanza_name
stanza: some_cool_stanza_name
    status: ok
    cipher: none

    db (current)
        wal archive min/max (11-1): 000000010000000000000003/00000001000000000000000C

        full backup: 20190325-142918F
            timestamp start/stop: 2019-03-25 14:29:18 / 2019-03-25 14:29:28
            wal start/stop: 000000010000000000000003 / 000000010000000000000003
            database size: 23.5MB, backup size: 23.5MB
            repository size: 2.8MB, repository backup size: 2.8MB
```

Nous devrions retrouver les archives entre `000000010000000000000003` et 
`00000001000000000000000C` :

```bash
$ ls /var/lib/pgbackrest/archive/some_cool_stanza_name/11-1/0000000100000000/
000000010000000000000003.00000028.backup
000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz
000000010000000000000004-3f9de64182e110ddcfe34d1191ad71c90f4fef3e.gz
00000001000000000000000C-c90e3f9fbac504f51f44e1446c653d8a124dbd86.gz
```

**Il en manque !**

Utilisons check_pgbackrest, avec son affichage "humain" pour le vérifier :

```bash
$ ./check_pgbackrest --stanza=some_cool_stanza_name --service=archives 
                     --repo-path=/var/lib/pgbackrest/archive --format=human
Service        : WAL_ARCHIVES
Returns        : 2 (CRITICAL)
Message        : wrong sequence or missing file @ '000000010000000000000005'
Long message   : latest_archive_age=9m54s
Long message   : num_archives=3
Long message   : archives_dir=/var/lib/pgbackrest/archive/some_cool_stanza_name/11-1
Long message   : min_wal=000000010000000000000003
Long message   : max_wal=00000001000000000000000C
Long message   : oldest_archive=000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz
Long message   : latest_archive=00000001000000000000000C-c90e3f9fbac504f51f44e1446c653d8a124dbd86.gz
```

Ignorons la dernière archive générée produisant l'alerte :

```bash
$ ./check_pgbackrest --stanza=some_cool_stanza_name --service=archives 
                     --repo-path=/var/lib/pgbackrest/archive --format=human 
                     --debug --ignore-archived-since=15m
DEBUG: file 000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz as interval since epoch : 36m52s
DEBUG: file 000000010000000000000004-3f9de64182e110ddcfe34d1191ad71c90f4fef3e.gz as interval since epoch : 33m58s
DEBUG: file 00000001000000000000000C-c90e3f9fbac504f51f44e1446c653d8a124dbd86.gz as interval since epoch : 11m45s
DEBUG: max_wal changed to 000000010000000000000004
DEBUG: checking WAL 000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz
DEBUG: checking WAL 000000010000000000000004-3f9de64182e110ddcfe34d1191ad71c90f4fef3e.gz
Service        : WAL_ARCHIVES
Returns        : 0 (OK)
Message        : 2 WAL archived, latest archived since 33m58s
Long message   : latest_archive_age=33m58s
Long message   : num_archives=2
Long message   : archives_dir=/var/lib/pgbackrest/archive/some_cool_stanza_name/11-1
Long message   : min_wal=000000010000000000000003
Long message   : max_wal=000000010000000000000004
Long message   : oldest_archive=000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz
Long message   : latest_archive=000000010000000000000004-3f9de64182e110ddcfe34d1191ad71c90f4fef3e.gz
```

Il est également possible de générer une alerte si le dernier WAL archivé est 
trop ancien :

```bash
$ ./check_pgbackrest --stanza=some_cool_stanza_name --service=archives 
                     --repo-path=/var/lib/pgbackrest/archive --format=human 
                     --ignore-archived-since=20m --latest-archive-age-alert=10m
Service        : WAL_ARCHIVES
Returns        : 2 (CRITICAL)
Message        : latest_archive_age (39m16s) exceeded
Long message   : latest_archive_age=39m16s
Long message   : num_archives=2
Long message   : archives_dir=/var/lib/pgbackrest/archive/some_cool_stanza_name/11-1
Long message   : min_wal=000000010000000000000003
Long message   : max_wal=000000010000000000000004
Long message   : oldest_archive=000000010000000000000003-5050f0829090a98c5f92ff112417a2bf6c115ffa.gz
Long message   : latest_archive=000000010000000000000004-3f9de64182e110ddcfe34d1191ad71c90f4fef3e.gz
```

L'exemple détaillé complet est disponible [ici](https://pgstef.github.io/2019/03/26/pgbackrest_archiving_tricks.html).

-----

## Liens
  * [Téléchargement](https://github.com/dalibo/check_pgbackrest/releases)  
  * [Support](https://github.com/dalibo/check_pgbackrest/issues)

Pour une présentation plus détaillée de l'outil:
  * [README](https://github.com/dalibo/check_pgbackrest/blob/master/README)
  * [Blog](https://pgstef.github.io/2019/02/20/monitor_pgbackrest_backups_with_nagios.html)
