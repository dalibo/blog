---
layout: post
title: Sortie de PostgreSQL 9.5.4, 9.4.9, 9.3.14, 9.2.18 et 9.1.23
author: Julien Rouhaud
twitter_id: rjuju123
github_id: rjuju
tags: [PostgreSQL, sécurité, upgrade]

---

---
*Paris, le 11 août 2016*

Le PostgreSQL Global Development Group a publié une mise à jour pour toutes les versions supportées de notre système de base de données, les versions 9.5.4, 9.4.9, 9.3.14, 9.2.18 et 9.1.23. Cette version corrige deux problèmes de sécurité. Elle résout aussi un certain nombre de bugs rapportés sur les trois derniers mois. Les utilisateurs qui s'appuient sur l'isolation entre les utilisateurs de base de données devraient appliquer cette mise à jour au plus vite. Les autres devraient planifier cette mise à jour à la prochaine interruption de service planifiée.

<!--MORE-->

## Problèmes de sécurité

Deux failles de sécurité ont été corrigées dans cette version:


* CVE-2016-5423: certaines imbrications d'expressions CASE peuvent déclencher un crash serveur
* CVE-2016-5424: les noms de base ou de rôle contenant des caractères spéciaux peuvent permettre l'injection de code durant les commandes administratives comme pg_dumpall.

Le correctif du second problème ajoute aussi une option, --reuse-previous, à la commande \connect de psql. pg_dumpall refusera par ailleurs les nombs de base ou de rôle contenant des retours de chariot après cette mise à jour. Pour plus d'information sur ces problèmes et en quoi ils affectent la compatibilité ascendante, voyez les notes de version.

## Correctifs de bug et améliorations

Cette mise à jour corrige aussi un certain nombre de bugs rapportés sur les derniers mois. Certains problèmes ne touchent que la version 9.5, mais certains touchent toutes les versions supportées:

* Correction de comportements erronés sur IS NULL/IS NOT NULL avec des valeurs composites
* Correction de trois cas où INSERT ... ON CONFLICT ne fonctionnait pas correctement avec d'autres fonctionnalités SQL
* INET et CIDR rejettent maintenant les valeurs IPv6 incorrectes
* Correction d'un crash dans l'opérateur "point ## lseg" pour une entrée NaN
* Correction d'un possible crash dans pg_get_expr()
* Correction de plusieurs lectures d'un octet surnuméraire sur des tampons dans to_number()
* Économie de la planification d'une requête si WITH NO DATA est spécifié
* Correction d'un état intermédiaire dangereux en cas de crash dans le code de heap_update()
* Correction de la mise à jour du hint bit durant le rejeu WAL pour les opérations de verrouillages d'enregistrement
* Suppression des mmessages "could not serialize access" inutiles lors de FOR KEY SHARE
* Suppression d'un crash avec postgres -C quand la variable spécifiée est une chaîne null
* Correction de deux problèmes avec le décodage logique et les sous-transactions
* Garantie que les backends (processus serveur) voient des statistiques à jour pour les catalogues partagés
* Protection contre un échec possible lors du vacuum d'id multixact sur une base mise à jour par pg_upgrade
* Lors d'un ANALYZE manuel sur des colonnes spécifiques, plus de remise à zéro de changes_since_analyze
* Correction d'une surestimation de n_distinct pour des colonnes comportant des null
* Correction d'un bug sur le traitement de mark/restore des b-tree
* Correction de la création de grands index hash (plus grands que shared_buffers)
* Correction d'une boucle infinie dans la création d'un index GiST avec des valeurs NaN
* Correction d'un crash possible durant un indexscan «nearest-neighbor» (plus proches voisins d'une valeur)
* Correction de l'erreur "PANIC: failed to add BRIN tuple"
* Correction d'un possible crash durant l'arrêt d'un background worker
* Nombreuses corrections pour des problèmes dans pg_dump et pg_restore en mode parallèle
* pg_basebackup accepte maintenant -Z 0 comme "pas de compression"
* Les tests de non-régression sont maintenant sûrs pour les locales Danoise et Galloise


La librairie lipbq accepte maintenant les versions de PostgreSQL à deux chiffres, pour les versions ultérieures. Cette mise à jour contient aussi la version 2016f de tzdata, avec des mises à jour pour Kemerovo, Novosibirsk, l'Azerbaijan, la Biélorussie et le Maroc.

## Avertissement d'EOL (End Of Life, fin de vie) pour la version 9.1.

PostgreSQL 9.1 sera en fin de vie en septembre 2016. Le projet prévoit de ne sortir qu'une seule version supplémentaire pour cette version. Nous encourageons fortement les utilisateurs à commencer à planifier une mise à jour vers une version plus récente dès que possible. Voyez la politique de version pour plus d'informations

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres versions mineures, les utilisateurs n'ont pas besoin d'exporter et réimporter leur base, ni d'utiliser pg_upgrade pour appliquer cette mise à jour. Vous pouvez simplement éteindre PostgreSQL et mettre à jour les binaires.

Les utilisateurs qui ont sauté une ou plusieurs mises à jousr mineures pourraient avoir besoin de lancer des étapes supplémentaires après la mise à jour; merci de consulter les notes de version des versions précédentes pour plus de détails.

## Liens


* Téléchargement: [http://postgresql.org/download](http://postgresql.org/download)
* Notes de version: [http://www.postgresql.org/docs/current/static/release.html](http://www.postgresql.org/docs
/current/static/release.html)

