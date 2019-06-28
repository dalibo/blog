---
layout: post
title: Sortie de PostgreSQL 11.4, 10.9, 9.6.14, 9.5.18, 9.4.23 et de la version 12 Bêta 2 !
author: David Bidoc, Christophe Courtois, Laura Ricci
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, sécurité, sortie, issue, 11.4, 10.9, 9.6, 9.5, 9.4, 12, beta]
---

*Paris, le 24 juin 2019*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL,
à savoir : 11.4, 10.9, 9.6.14, 9.5.18, 9.4.23, et la 12 bêta 2.

<!--MORE-->

Ces versions corrigent une faille de sécurité et plus de 25 bugs depuis la dernière version de mai dernier.

Ces versions sont publiées hors du planning normal des mises à jour car une faille de sécurité a été identifiée
comme assez critique pour que le correctif soit diffusé le plus rapidement possible.

**Les utilisateurs de PostgreSQL 10, PostgreSQL 11 ou de PostgreSQL 12 bêta 2 doivent mettre à jour dès que possible.**

Les autres utilisateurs doivent prévoir une mise à jour au prochain arrêt de maintenance.


## Correctifs de sécurité

Cette version corrige une faille de sécurité :

* CVE-2019-10164 : Dépassement de pile lors de l'entrée d'un mot de passe.
Versions concernées : 10, 11, 12 bêta.

Un utilisateur authentifié peut générer un dépassement de pile en remplaçant son propre mot de passe par une valeur
choisie à dessein.
Non seulement cela peut être utilisé pour faire planter le serveur PostgreSQL, mais cela peut être également utilisé
pour exécuter n'importe quel code sous le compte système de PostgreSQL.
De plus, un serveur compromis pourrait envoyer un message à un client utilisant la libpq lors de l'authentification SCRAM
en vue de le faire planter, ou de lui faire exécuter du code arbitraire avec le compte système du client.

Ce problème est corrigé en mettant à jour votre serveur PostgreSQL et en le redémarrant, ainsi que vos clients utilisant
la libpq.

**Tous les utilisateurs utilisant PostgreSQL 10, 11, and 12 bêta doivent se mettre à jour dès que possible.**

Le projet PostgreSQL remercie Alexander Lakhin pour avoir rapporté ce problème.

## Corrections de bugs et améliorations

Cette mise à jour corrige 25 bugs depuis la mise à jour cumulative précédente en mai. Certains de ces problèmes
n'affectent que la version 11, mais beaucoup affectent toutes les versions supportées.

Certains de ces correctifs incluent :

* Correction d'erreurs diverses dans l'élagage à l'exécution de partitions pouvant conduire à des réponses erronées dans
les requêtes sur les tables partitionnées.
`pg_dump` recrée maintenant les partitions de tables en utilisant `CREATE TABLE` et `ALTER TABLE... ATTACH PARTITION`
plutôt que `PARTITION OF` dans la commande de création.
* Améliore la façon dont initdb choisit le fuseau horaire système s'il existe des noms équivalents pour le fuseau horaire.
Préfère aussi explicitement l'`UTC` à l'`UCT`.
* Correction d'une défaillance de `ALTER TABLE... ALTER COLUMN TYPE` lorsque la table a une contrainte d'exclusion partielle.
* Correction de l'échec de la commande `COMMENT` pour les commentaires sur les domaines.
* Plusieurs corrections liées à l'agrégation.
* Correction d'une génération erronée de plans merge-append pouvant conduire à des erreurs « could not find pathkey item
to sort »
* Correction d'échecs de dump/restore quand les vues contenaient des requêtes avec des noms de jointure en double.
* Correction de la conversion des littéraux de chaîne JSON en colonne de sortie de type JSON dans `json_to_record()`
et `json_populate_record()`
* Correction de l'optimisation incorrecte des quantificateurs `{1,1}` dans les expressions régulières
* Corrige un problème sur les index B-Tree dans des cas particuliers impliquant des colonnes répertoriées dans la clause
`INCLUDE`, qui se manifestait par des erreurs lors du `VACUUM`. Si vous êtes concerné par ce problème, vous devez
réindexer l'index en question.
* Correction d'un problème de concurrence lors de la vérification qu'un segment de mémoire partagée préexistant est encore
utilisé par un autre postmaster.
* Correction du processus walreceiver pour éviter un crash ou un blocage à l'arrêt.
* Éviter que la libpq se fige lors de l'utilisation de SSL quand le tampon de données d'OpenSSL en attente contient un
multiple exact de 256 octets.
* Correction de l'ordre des commandes `GRANT` émises par `pg_dump` et `pg_dumpall` pour les bases de données et les
tablespaces.
* Corrections d'erreurs trompeuses en sortie de `reindexdb`.
* S'assure que `vacuumdb` renvoie un état correct en cas d'erreur lors de l'utilisation de jobs en parallèle.
* Correction de `contrib/auto_explain` pour ne pas causer de problèmes dans les requêtes parallélisées, ce qui entraînait
des échecs comme « could not find key N in shm TOC »
* Prise en compte d'éventuelles modifications de données par des triggers `BEFORE ROW UPDATE` locaux dans
`contrib/postgres_fdw`
* Sous Windows, évite les échecs lorsque l'encodage de la base de données est défini sur `SQL_ASCII` et que nous essayons
d'enregistrer une chaîne non ASCII.

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. 
Comme pour les autres mises à jour mineures, les utilisateurs n'ont pas à sauvegarder et recharger leur base de données
ou à utiliser `pg_upgrade` pour appliquer cette mise à jour : vous pouvez simplement arrêter PostgreSQL
et mettre les binaires à jour.

Si certains de vos index B-Tree utilisant une clause `INCLUDE` sont affectés par le problème mentionné plus haut,
vous devrez les réindexer. Le problème se manifeste sous la forme d'erreurs au moment d'un `VACUUM`. 
Vous pouvez lire la documentation sur la réindexation ici : https://www.postgresql.org/docs/current/sql-reindex.html

Les utilisateurs ayant sauté une ou plusieurs mises à jour peuvent avoir à exécuter certaines étapes supplémentaires
après installation ; merci de consulter les notes des versions précédentes pour les détails.

PostgreSQL 9.4 ne recevra plus de correctifs après le 13 février 2020. 
Merci de consulter notre [politique de versionnement](https://www.postgresql.org/support/versioning/) pour plus d’informations.

**Planning des bêtas**

Ceci inclut la deuxième bêta de la version 12. Le projet PostgreSQL sortira d'autres bêtas pour des besoins de test,
suivies d'une ou plusieurs versions candidates. 
Pour plus d'informations, voir la page de [test des bêtas](https://www.postgresql.org/developer/beta/).


## Liens

* [Téléchargement](https://www.postgresql.org/download/)
* [Notes de versions](https://www.postgresql.org/docs/11/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/) 
* [Informations sur les bêtas](https://www.postgresql.org/developer/beta/).
* [Notes de version sur PostgreSQL 12 Bêta](https://www.postgresql.org/docs/devel/release-12.html)
* [Problèmes en cours sur PostgreSQL 12](https://wiki.postgresql.org/wiki/PostgreSQL_12_Open_Items)
* [Remontez un bug](https://www.postgresql.org/account/submitbug/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)
