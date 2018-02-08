---
layout: post
title: Sortie de PostgreSQL 10.2, 9.6.7, 9.5.11, 9.4.16, 9.3.21
author: Christophe Courtois
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, securité, sortie, issue, 10]
---

---

*Paris, le 08 février 2018*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 10.2, 9.6.7, 9.5.11, 9.4.16 et 9.3.21.

<!--MORE-->

Cette mise à jour inclut deux mises à jour de sécurité. Elle règle aussi des problèmes avec le VACUUM, les index GIN et hash pouvant mener à des corruptions de données, ainsi que des correctifs pour les requêtes parallélisées et la réplication logique.

Il est conseillé à tous les utilisateurs de PostgreSQL d'appliquer cette mise à jour dès que possible. Voir les notes sur la "Mise à jour" plus bas pour les éventuelles étapes d'après-mise à jour.

Merci de noter que PostgreSQL a changé son système de numérotation avec la sortie de la v10.0 : le passage de 10.0 ou 10.1 à 10.2 est donc considéré comme une mise à jour mineure.

## Problèmes de sécurité

Deux vulnérabilités ont été corrigées par cette mise à jour :

* [CVE-2018-1052](https://access.redhat.com/security/cve/CVE-2018-1052) : Corrections dans le traitement des clés de partition contenant plusieurs expressions
* [CVE-2018-1053](https://access.redhat.com/security/cve/CVE-2018-1053) : Assurance que tous les fichiers temporaires créés par "pg_upgrade" ne sont pas lisibles par tous

## Corrections de bugs et améliorations

Cette mise à jour corrige plus de 60 bugs signalés ces derniers mois. Certains problèmes concernent uniquement la version 10 mais beaucoup affectent toutes les versions supportées :

* Correction d'un crash et d'une potentielle révélation de mémoire de processus d'arrière-plan lors du traitement de clés de partition contenant plusieurs expressions
* Correction d'une faille pouvant révéler des fichiers temporaires créés par pg_upgrade et contenant des mots de passe, en ne permettant pas à ces fichiers d'être lisibles par tous
* Correction de cas où le VACUUM ne supprime pas des lignes mortes qui avaient été mises à jour alors qu'elles étaient verrouillées avec KEY SHARE, pouvant ainsi mener à de la corruption de données
* Correction sur les index GIN pour prévenir le bloat, en s'assurant que la liste des insertions en attente est nettoyée par VACUUM
* Correction d'une potentielle corruption des index hash suite à des métapages ne pouvant être marquées "dirty"
* Correction de plusieurs scénarios avec des requêtes parallélisées menant à de possibles arrêts brutaux, dont le cas d'un bitmap heap scan ne pouvant allouer de mémoire
* Correction de plusieurs plantages dans les requêtes parallélisées, dont l'échec au démarrage d'un worker parallèle
* Correction dans la remontée de statistiques pour EXPLAIN depuis les workers parallèles
* Suppression de faux échecs de verrouillage mutuel (deadlock) lorsque plusieurs sessions lancent CREATE INDEX CONCURRENTLY
* Correction dans le comportement d'un trigger avec de la réplication logique
* Plusieurs correctifs pour le "walsender" pour améliorer sa stabilité ainsi que la transparence du processus de réplication
* Correction du décodage logique pour nettoyer correctement les fichiers laissés sur le disque par les transactions en cas d'arrêt brutal
* Plusieurs correctifs pour les colonnes IDENTITY, dont l'interdiction de ces colonnes sur les tables dérivées de types composites et de partitions
* Correction pour les contraintes de partitionnement par liste pour les clés de partition de types booléen et tableau (array).
* Correction de plan incorrects pour des requêtes UPDATE et DELETE lorsqu'une table a des tables filles à la
fois par héritage normal et comme tables étrangères
* Correction de résultats incorrects dans des cas impliquant GROUPING SETS et des sous-requêtes imbriquées 
* Correction pour UNION/INTERSECT/EXCEPT sur zéro colonnes, par exemple "SELECT UNION SELECT;"
* Plusieurs correctifs pour des sous-reqûetes au sein d'une sous-requête LATERAL
* Plusieurs améliorations de l'estimation de la planification de requête
* Possibilité données à un client supportant le channel binding pour SCRAM, comme une future version de PostgreSQL ou de la libpq, de se connecter à un serveur PostgreSQL 10
* Correction des exemples de fonctions INSTR qui aidaient à la transition d'Oracle® PL/SQL au PL/pgSQL de PostgreSQL, afin de reproduire correctement le comportement d'Oracle
* Correctif pour pg_dump pour rendre identifiables de manière fiable les permissions (ACL), les labels de sécurité, et les commentaires dans les archives
* Modification du comportement de l'opérateur "cube ~> int" dans la contrib "cube" pour la compatibilité avec la recherche KNN. Ce changement ne respecte pas la compatibilité avec les versions précédentes, et tous les index sur expressions ou les vues matérialisées utilisant cet opérateur devront être respectivement réindexés ou rafraîchies.
* Plusieurs correctifs dans contrib/postgres_fdw pour éviter des erreurs du planificateur de requête
* Ajout d'exemples modernes de scripts d'arrêt-démarrage pour PostgreSQL sur macOS dans le dossier
contrib/start-scripts/macos
* Plusieurs correctifs pour Windows, concernant notamment le démarrage du postmaster et la compatibilité avec la libperl
* Correctifs pour les spinlock et support des architectures 68K et 88K

Cette mise à jour contient aussi la version 2018c de tzdata, avec des mises à jour pour les changements d'heures d'été réglementaires au Brésil, à São Tomé-et-Príncipe, plus des corrections historiques pour la Bolivie, le Japon et le Soudan du Sud. La zone "US/Pacific-New" a été supprimée (ce n'était qu'un alias pour "America/Los_Angeles").

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres releases mineures, les utilisateurs n'ont pas besoin de sauvegarder et recharger leur base de données ou d'utiliser pg_upgrade pour appliquer cette mise à jour ; vous pouvez simplement arrêter PostgreSQL et mettre à jour ses binaires.

Si votre installation est affectée par un des problèmes suivants, vous pouvez avoir besoin d'autres étapes :

* Les utilisateurs affectés par les problèmes sur les index hash et GIN devraient penser à les reconstuire ;
* Les utilisateurs ayant recopié l'exemple de fonction INSTR de la documentation PostgreSQL devraient analyser leur code pour savoir s'il faut appliquer le correctif de l'exemple ;
* Les index et vues matérialisées utilisant l'opérateur "~>" de la contrib "cube" devront être respectivement réindexés et rafraîchies. Ce changement casse la compatbilité avec les versions précédentes, testez donc tout code utilisant cet opérateur avant passage en production.


Les utilisateurs n'ayant pas appliqué une ou plusieurs des mises à jour précédentes peuvent avoir besoin d'appliquer d'autres étapes post-mise à jour ; voir les notes des versions précédentes pour les détails.



## Liens

* [Annonce Officielle](https://www.postgresql.org/about/news/1829/)
* [Téléchargement](https://www.postgresql.org/download)
* [Notes de Version](https://www.postgresql.org/docs/current/static/release.html)
* [Securité](https://www.postgresql.org/support/security/)
* [Cycle des Versions](https://www.postgresql.org/support/versioning/)
