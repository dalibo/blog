---
layout: post
title: Sortie de PostgreSQL 9.6.1, 9.5.5, 9.4.10, 9.3.15, 9.2.19 et 9.1.24
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, sécurité, upgrade]

---

---
*Paris, le 27 octobre 2017*

Le PostgreSQL Global Development Group a publié une mise à jour pour toutes les versions supportées de notre système de base de données, les versions 9.6.1, 9.5.5, 9.4.10, 9.3.15, 9.2.19 et 9.1.24, où la version 9.1.24 est la dernière de la branche 9.1. Cette version corrige un problème d'enregistrement dans les journaux de transaction (WAL) des relations tronquées pouvant conduire à une corruption de données. Elle résout aussi un certain nombre de bugs rapportés sur les trois derniers mois. Les utilisateurs qui sont affectés par cette corruption de données doivent faire la mise à jour immédiatement. Les autres devraient planifier cette mise à jour à la prochaine interruption de service planifiée.

<!--MORE-->

## Enregistrement dans les WAL des relations tronquées

Cette mise à jour corrige l'enregistrement dans les journaux de transaction (WAL) des relations tronquées, et assure maintenant que la carte des epaces libres (Free Space Map ou FSM ) est elle aussi tronquée lorsqu'une commande TRUNCATE est envoyée, qui conduisait à la corruption de données. Si la FSM n'était pas tronquée, une base PostgreSQL en mode réparation (recovery) pouvait retourner une page qui avait déjà été tronquée et retourner une erreur du type :

	ERROR:  could not read block 28991 in file "base/16390/572026": read only 0 of 8192 bytes

Si les checksum sont activés, des échecs de checksum sur la carte de visibilité (Visibility Map ou VM) peuvent aussi survenir.

Ce problème est présent dans les séries 9.3, 9.4, 9.5 et 9.6 des publications de PostgreSQL.

## Problèmes avec pg_upgrade sur les machines big-endian

Sur les machines big-endian (ex : plusieurs architectures non-Intel), pg_upgrade pourrait écrire de manière incorrecte les octets de la carte de visibilité conduisant pg_upgrade à l'échec.

Ce problème est présent uniquement dans les versions 9.6.0 de PostgreSQL.

## Correctifs de bug et améliorations

En plus de ce qui énoncé ci-dessus, cette mise à jour corrige aussi un certain nombre de bugs rapportés sur les derniers mois. Certains problèmes ne touchent que la version 9.6, mais certains touchent toutes les versions supportées. Il y a plus de 50 correctifs dans cette version, incluant :

* Correction d'un risque d'utilisation de variable après libération ("use-after-free") dans l'exécution des fonctions d'agrégats utilisant DISTINCT, pouvant conduire à un crash.
* Correction d'une manipulation incorrecte des agrégats polymorphes utilisés comme fonctions fenêtrées, pouvant conduire à des crashs.
* Correction de la création incorrecte des index GIN dans les enregistrements WAL sur les machines big-endian
* Correction de la perte de descripteur de fichier lorsqu'une relation temporaire de plus d'1 Go est tronquée
* Correction d'une fuite sur la durée de vie d'une requête en mémoire lors d'un UPDATE de masse sur une table avec une PRIMARY KEY ou un index REPLICA IDENTITY
* Correction des SELECT FOR UPDATE/SHARE pour verrouiller correctement les enregistrements qui ont été mis à jour par une transaction qui a été annulée par la suite
* Correction de COPY sur la liste de nom de colonne d'une table qui a la sécurité au niveau ligne (RLS) activée
* Correction de la suppression d'enregistrements TOAST spéculativement insérés en retour d'un INSERT ... ON CONFLICT
* Correction de la longueur du timeout quand un VACUUM est en attente d'un verrou exclusif sur une table pour qu'il puisse tronquer la table
* Correction de problèmes dans la fusion de contraintes CHECK héritées lorsque une table est créée ou altérée
* Correction du remplacement d'un tableau d'éléments dans jsonb_set()
* Correction d'une possible erreur de tri lors de l'interruption de l'utilisation des clés abrégées dans les index btree
* Sur Windows, nouvel essai de création du segment de control en mémoire partagée dynamique après une erreur sur accès refusé
* Correction d'une erreur de calcul de la latence moyenne dans pgbench
* Fait en sorte que pg_receivexlog fonctionne correctement avec --synchronous sans slots
* Force pg_rewind à désactiver synchronous_commit dans sa session sur le serveur source
* Suppression des tentatives de partage des contextes SSL au travers de multiples connections dans la libpq
* Support de OpenSSL 1.1.0
* Installation de l'infrastructure de tests TAP de façon à ce qu'elle soit disponible pour le test des extensions
* Plusieurs corrections pour le décodage logique des WAL et les slots de réplication
* Plusieurs corrections de problèmes mineurs dans pg_dump, pg_xlogdump, et pg_upgrade
* Plusieurs corrections de problèmes mineurs dans le planificateur de requêtes et dans la sortie d'EXPLAIN
* Plusieurs corrections dans le support de timezone

Cette mise à jour contient aussi le tzdata 2016h pour les changements légaux de DST en Palestine et Turquie, et des corrections historiques pour la Turquie et quelques régions de Russie. Basculement sur des abbréviations numériques pour quelques time zones en Antarctica, l'ancienne Union Soviétique, et le Sri Lanka.

La base de données des time zones de l'IANA renvoyait précédemment des abréviations textuelles pour les time zones, faisant que parfois ces abréviations n'avaient que peu ou pas cours auprès de la population locale. L'IANA est en cours de renversement de cette politique en faveur de l'utilisation des offsets UTC numériques dans les zones où il n'y a pas d'évidence de l'utilisation d'abréviation anglaise dans le monde réel. Pour le moment tout au moins, PostgreSQL continuera d'accepter les abréviations supprimées pour l'entrée de timestamp. Mais elles ne seront pas montrées dans la vue pg_timezone_names ni utilisés en sortie.

Dans cette mise à jour, AMT n'est plus montrée comme étant en cours d'utilisation pour signifier le temps en Arménie. Par conséquent, nous avons changé l'abréviation pour quelle soit interprétée par défaut comme Amazon Time, donc UTC-4 et pas UTC+4.

## Notification d'EOL (End Of Life, fin de vie) pour la version 9.1.

PostgreSQL 9.1 est maintenant en fin de vie (EOL). Le projet prévoit de ne plus sortir aucune version supplémentaire pour cette version. Nous encourageons fortement les utilisateurs à commencer à planifier une mise à jour vers une version plus récente dès que possible. Consultez la [politique de versionnement](https://www.postgresql.org/support/versioning/) pour plus d'informations

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres versions mineures, les utilisateurs n'ont pas besoin d'exporter et réimporter leur base, ni d'utiliser pg_upgrade pour appliquer cette mise à jour. Vous pouvez simplement éteindre PostgreSQL et mettre à jour les binaires.

Si votre système était affecté par le bug pg_upgrade sur big-endian, merci de lire [https://wiki.postgresql.org/wiki/Visibility_Map_Problems](https://wiki.postgresql.org/wiki/Visibility_Map_Problems) et suivez les instructions sur comment corriger ce problème sur vos instances PostgreSQL.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures pourraient avoir besoin de lancer des étapes supplémentaires après la mise à jour; merci de consulter les notes de version des versions précédentes pour plus de détails.

## Liens


* Téléchargement: [http://postgresql.org/download](http://postgresql.org/download)
* Notes de version: [http://www.postgresql.org/docs/current/static/release.html](http://www.postgresql.org/docs/current/static/release.html)
* Page sur la sécurité : [http://www.postgresql.org/support/security/](http://www.postgresql.org/support/security/)
* Politique de versionnement : [https://www.postgresql.org/support/versioning/](https://www.postgresql.org/support/versioning/)
