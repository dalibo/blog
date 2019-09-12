---
layout: post
title: Sortie de PostgreSQL version 10 - Release note
author: Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [PostgreSQL, 10, release, upgrade]

---

*Paris, le 05 octobre 2017*

Le **PostgreSQL Global Development Group** annonce ce jour la sortie de PostgreSQL 10, dernière version du système libre de gestion de bases de données SQL de référence.

<!--MORE-->

Distribuer les données sur plusieurs noeuds est une fonctionnalité critique aujourd'hui. Cela permet d'améliorer les temps d'accès, de maintenance et d'analyse des données. Cette technique est apparentée à la stratégie du “Diviser pour mieux régner”. Cette nouvelle version de PostgreSQL embarque différentes améliorations dans l'implantation de cette technique, dont la réplication logique, le partitionnement déclaratif des tables et une amélioration du parallélisme de requêtes.

“Notre communauté de développeurs s'est concentrée sur la mise en oeuvre de fonctionnalités qui profiteront des infrastructures modernes pour distribuer la charge”, a annoncé Magnus Hagander, membre de la [core team](https://www.postgresql.org/developer/core/) du [PostgreSQL Global Development Group](https://www.postgresql.org/). “Des fonctionnalités comme la réplication logique et l'amélioration du parallélisme représentent des années de travail et prouvent le dévouement constant de la communauté pour assurer la suprématie de PostgreSQL alors que la demande évolue.”

Cette version marque aussi un changement dans la gestion des numéros de version pour PostgreSQL, pour adopter le format en “x.y”. Ainsi, la prochaine version mineure de PostgreSQL sera la 10.1 et la prochaine version majeure sera la version 11.

## La réplication logique - Un framework de publication/souscription pour distribuer les données

La réplication logique élargit les possibilités des fonctionnalités actuelles de réplication de PostgreSQL avec la capacité d'envoyer les modifications sur un ensemble de bases PostgreSQL tout en filtrant les données pour ne répliquer que certaine(s) base(s) ou certaine(s) table(s). Les utilisateurs pourront ensuite envoyer les données répliquées sur plusieurs clusters PostgreSQL et pourront même effectuer une migration vers une future version majeure sans impact utilisateur.

« Nous avons beaucoup utilisé PostgreSQL depuis la version 9.3 et sommes vraiment impatients de voir arriver la version 10, car elle apporte les bases d'un vrai partitionnement, fonctionnalité très attendue, et qu'elle permet la réplication logique native. Cela va nous permettre d'utiliser encore plus PostgreSQL pour nos services », a annoncé Vladimir Boroin, Responsable DBA chez [Yandex](https://www.yandex.com/)

## Partitionnement de table déclaratif - La division facile de vos données

Le partitionnement de table existe depuis des années dans PostgreSQL, mais nécessitait que l'utilisateur maintienne un ensemble de règles et de triggers non triviaux pour que cela fonctionne.

PostgreSQL 10 ajoute une nouvelle syntaxe pour partitionner une table. Celle-ci permet de créer, maintenir et lister les partitions d'une table. Cet ajout est la première étape d'une série de fonctionnalités permettant de fournir un véritable framework de partitionnement dans PostgreSQL.

## Amélioration de la parallélisation des requêtes - L'analyse rapide de vos données

PostgreSQL 10 améliore la parallélisation des requêtes pour permettre à plus de sous-parties d'une requête d'être exécutées parallèlement. L'amélioration concerne de nouveaux types de parcours de données, parallélisés, ainsi que des optimisations dans le cas de recombinaison des données, comme lors d'un pré-tri. Ces améliorations accélèrent l'arrivée des résultats.

## Validation par quorum pour les réplications synchrones - La distribution des données en toute confiance

PostgreSQL 10 ajoute une validation par quorum pour les réplications synchrones, ce qui permet plus de flexibilité dans la manière dont le noeud primaire reçoit les acquittements d'écriture sur disque des réplications. Un administrateur peut maintenant préciser le nombre de réplicas qui doivent valider la réelle écriture des données dans la base pour que les données soient considérées comme enregistrées en toute sécurité.

« La validation par quorum pour les réplications synchrones dans PostgreSQL 10 donne plus de possibilités pour améliorer la possibilité de promouvoir une infrastructure en quasi-continuité de service du point de vue de l'application. Cela nous permet de déployer en continu et de mettre à jour notre base de données sans avoir recours à de longues fenêtres de maintenance », a déclaré Curt Micol, ingénieur de production chez [Simple Finance](https://www.simple.com/).

## Authentification SCRAM-SHA-256 - La sécurisation de l'accès à vos données

L'authentification SCRAM (Salted Challenge Response Authentication Mechanism) définie dans la [RFC5802](https://tools.ietf.org/html/rfc5802) décrit un protocole pour améliorer la sécurisation du stockage et de la transmission du mot de passe en fournissant un cadre pour la négociation de mots de passe forts. PostgreSQL 10 ajoute la méthode d'authentification SCRAM-SHA-256, telle que définie dans la [RFC7677](https://tools.ietf.org/html/rfc7677), pour proposer une solution plus sécurisée que la méthode d'authentification actuelle, basée sur MD5.

## Liens

* [Téléchargements](https://www.postgresql.org/downloads)
* [Dossier de presse](https://www.postgresql.org/about/press/presskit10)
* [Notes de version](https://www.postgresql.org/docs/current/static/release-10.html)
* [Les nouveautés de la version 10](https://wiki.postgresql.org/wiki/New_in_postgres_10)

## À propos de PostgreSQL

PostgreSQL est le système de gestion de bases de données libre de référence. Sa communauté mondiale est composée de plusieurs milliers d'utilisateurs et contributeurs, et de plusieurs dizaines d'entreprises et institutions. Le projet PostgreSQL, démarré il y a 30 ans, à l'université de Californie, à Berkeley, a atteint aujourd’hui un rythme de développement sans pareil. L'ensemble des fonctionnalités proposées est mature et plus riche que ceux des systèmes commerciaux leaders sur les fonctionnalités avancées, les extensions, la sécurité et la stabilité, offertes à un niveau que seul PostgreSQL atteint.

Pour en savoir plus à propos de PostgreSQL et participer à la communauté : [PostgreSQL.org](https://www.postgresql.org).
