---
layout: post
title: Sortie de PostgreSQL 11.1, 10.6, 9.6.11, 9.5.15, 9.4.20, 9.3.25
author: Thibaud Walkowiak
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, securité, sortie, issue, 11]
---

---

*Paris, le 9 novembre 2018*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 11.1, 10.6, 9.6.11, 9.5.15, 9.4.20 ainsi qu'une dernière mise à jour pour la version 9.3 qui ne sera dorénavant plus supportée par la communauté.

<!--MORE-->

Cette mise à jour inclut un correctif de sécurité et la résolution de plusieurs problèmes signalés ces trois derniers mois.

Tous les utilisateurs utilisant les versions concernées de PostgreSQL doivent se mettre à jour dès que possible.
Veuillez vous reporter aux remarques sur "Mise à jour" ci-dessous pour connaître les éventuelles étapes postérieures à la mise à jour si vous utilisez `pg_stat_statements`.

Cette mise à jour marque également la fin de vie de la version PostgreSQL 9.3, qui ne recevra plus aucun correctif de bogue ou de sécurité.
Si votre environnement utilise toujours la version PostgreSQL 9.3, veuillez planifier une mise à jour vers une version supportée par la communauté dès que possible.
Veuillez consulter notre politique de [gestion des versions](https://www.postgresql.org/support/versioning/) pour de plus amples informations.


## Problèmes de sécurité

Une vulnérabilité a été corrigée par cette mise à jour :

  * [CVE-2018-16850](https://security-tracker.debian.org/tracker/CVE-2018-16850) : Injection SQL dans `pg_upgrade` et `pg_dump`, via l'usage de `CREATE TRIGGER` ... `REFERENCING`.
  
Les versions PostgreSQL affectées sont : 11 et 10

En utilisant une définition de `TRIGGER` appropriée, un attaquant peut exécuter des instructions SQL arbitraires avec les privilèges super-utilisateur lorsqu'un super-utilisateur exécute `pg_upgrade` ou `pg_dump`. Cette attaque nécessite le privilège `CREATE` sur un schéma non-temporaire ou le privilège `TRIGGER` sur une table.
La configuration par défaut de PostgreSQL permet d'exploiter cela, tous les utilisateurs ont le privilège `CREATE` sur le schéma public.


## Corrections de bugs et améliorations

Cette mise à jour corrige plusieurs bugs signalés ces derniers mois. Certains problèmes concernent uniquement la version 11 mais beaucoup affectent toutes les versions supportées :

* assure que les index enfants créés automatiquement sont dans le même tablespace que l'index parent partitionné
* corrections de plusieurs crashs lors de l'usage de triggers
* correction des problèmes liés à l'application de `ON COMMIT DELETE ROWS` sur une table temporaire partitionnée
* correction du traitement des valeurs `NULL` lors de l'utilisation de `LEFT JOIN` dans les jointures par hachage parallélisées
* plusieurs corrections relatives aux arguments dans les instructions CALL
* correction des fonctions d'agrégation strictes (c'est-à-dire des agrégats qui ne peuvent pas accepter d'entrée NULL) avec des colonnes qui imposent une vérification d'ordre strict avec ORDER BY.
* correction de `CASE` quand une expression était convertie en un type array.
* désactivation d'une optimisation pour la mise à jour des index d'expression afin d'éviter un crash
* correction d'une fuite mémoire survenue dans un cas spécifique d'utilisation de l'index `SP-GiST`
* correction de `pg_verify_checksums` qui traitait des fichiers qui ne doivent pas avoir de sommes de contrôle
* empêcher le serveur PostgreSQL de démarrer lorsque wal_level est défini sur une valeur ne pouvant pas prendre en charge un emplacement de réplication existant
* assure que le serveur traitera les réceptions `NOTIFY` et le signal `SIGTERM` déjà reçus avant d'attendre une entrée côté client.
* autorise PL/Ruby à fonctionner avec les nouvelles versions de PostgreSQL
* correction des vérifications de classe de caractères sous Windows pour les caractères Unicode supérieurs à U+FFFF, ce qui affectait la recherche plein texte ainsi que `contrib/ ltree` et `contrib/pg_trgm`
* correction d'un cas où `psql` ne signalait pas la réception d'un message via `NOTIFY` avant la prochaine commande.
* plusieurs corrections concernant la compilation sur macOS 10.14 (Mojave)
* plusieurs corrections pour Windows

Cette publication contient également la version 2018g de tzdata relative à l'heure d'été au Chili, aux Fidji, au Maroc et en Russie (Volgograd), ainsi que des corrections concernant la Chine, Hawaï, le Japon, Macao et la Corée du Nord.


## Fin de vie pour PostgreSQL 9.3

PostgreSQL 9.3 est maintenant en fin de vie (EOL) et ne recevra plus aucune correction de bogue ou correctif de sécurité.
Nous invitons les utilisateurs à planifier une mise à niveau vers une version ultérieure de PostgreSQL dès que possible.
Veuillez consulter notre politique de [gestion des versions](https://www.postgresql.org/support/versioning/) pour de plus amples informations.


## Mise à jour

Toutes les mises à jour PostgreSQL sont cumulatives. Tout comme les autres
versions mineures, il n’est pas utile pour les utilisateurs de décharger et
recharger leur base de données ou d’utiliser pg_upgrade pour appliquer cette
mise à jour. Vous devrez simplement arrêter votre instance PostgreSQL et
mettre à jour les exécutables.

Si votre système utilise `pg_stat_statements` sur une version de PostgreSQL 10 ou 11, il est conseillé d'exécuter la commande suivante après la mise à jour :

```ALTER EXTENSION pg_stat_statements UPDATE;```


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
