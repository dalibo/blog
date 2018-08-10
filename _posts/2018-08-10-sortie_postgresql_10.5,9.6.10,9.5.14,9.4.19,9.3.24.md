---
layout: post
title: Sortie de PostgreSQL 10.5, 9.6.10, 9.5.14, 9.4.19, 9.3.24
author: 
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, securité, sortie, issue, 10]
---

---

*Paris, le 10 août 2018*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 10.5, 9.6.10, 9.5.14, 9.4.19, 9.3.24, ainsi que la publication de la version 11 en Bêta 3.

<!--MORE-->

Cette mise à jour inclut deux correctifs de sécurité et la résolution de plusieurs problèmes signalés ces trois derniers mois.

Si des utilisateurs n'ayant pas votre entière confiance accèdent à votre système et que vous utilisez une version 9.5 ou plus récente de PostgreSQL OU si vous avez installé les extensions dblink ou postgres_fdw, vous devez appliquer cette mise à jour le plus rapidement possible !
Tous les autres utilisateurs peuvent prévoir leur mise à jour lors d'une période de maintenance prévue au moment le plus adéquat.

Voir la section "Mise à jour" plus bas pour les étapes d'après mise à jour.

Le PostgreSQL Global Development Group annonce également la mise à disposition de la troisième version bêta de PostgreSQL. Cette parution contient un aperçu de toutes les fonctionnalités qui seront disponibles dans la version finale de PostgreSQL 11, ainsi que des corrections de bugs ayant été remonté dans la deuxième version bêta.

Merci de noter que PostgreSQL a changé son système de numérotation avec la sortie de la v10.0 : le passage à la 10.5 depuis l'une des versions 10.0, 10.1, 10.2, 10.3 ou 10.4 est donc considéré comme une mise à jour mineure.

## Problèmes de sécurité

Deux vulnérabilités ont été corrigées par cette mise à jour :

  * [CVE-2018-10915](https://access.redhat.com/security/cve/CVE-2018-10915) : Certains paramètres des connexions clients mettent à mal les défenses de sécurité côté client.
  
libpq est l'API de connexion cliente pour PostgreSQL. Elle est également utilisée par d'autres librairies pour gérer les connexions. libpq comportait un problème de sécurité : toutes ses variables d'état de la connexion n'étaient pas réinitialisées lorsqu'une tentative de reconnexion était effectuée. En particulier, la variable d'état qui déterminait si oui ou non un mot de passe devait être demandé pour une connexion n'était pas réinitialisée. Cela pouvait permettre aux utilisateurs de fonctionnalités utilisant la libpq, telles les extensions [dblink](https://www.postgresql.org/docs/current/static/dblink.html) ou [postgres_fdw](https://www.postgresql.org/docs/current/static/postgres-fdw.html), de se connecter à des serveurs auxquels ils n'auraient pas dûs avoir accès.

Vous pouvez vérifier si votre base de données a l'une ou l'autre de ces extensions installées en lançant la commande suivante à partir de votre terminal PostgreSQL (psql) :

```sql
\dx dblink|postgres_fdw
```

Nous conseillons à tous les utilisateurs de mettre à jour leurs librairies libpq installées au plus vite.
Le PostgreSQL Global Development Group tient à remercier Andrew Krasichkov pour le signalement de ce problème.

  * [CVE-2018-10925](https://access.redhat.com/security/cve/CVE-2018-10925) : Divulgation de mémoire et autorisation absente dans l'ordre _INSERT ... ON CONFLICT DO UPDATE_
  
Un utilisateur malveillant capable d'exécuter l'ordre _CREATE TABLE_ peut lire des octets choisis de la mémoire du serveur en utilisant une requête _upsert_ (ordre _INSERT ... ON CONFLICT DO UPDATE_). Par défaut, tout utilisateur possède les droits nécessaires pour lancer ces requêtes. Un utilisateur possédant des privilèges spécifiques d'insertion (_INSERT_) et un privilège de mise à jour (_UPDATE_) sur au moins une colonne d'une table donnée peut également mettre à jour les autres colonnes de la table en utilisant une vue et une requête d'upsert.

## Corrections de bugs et améliorations

Cette mise à jour corrige plus de 40 bugs signalés ces derniers mois. Certains problèmes concernent uniquement la version 10 mais beaucoup affectent toutes les versions supportées :

* plusieurs corrections de problèmes liés aux _VACUUM_, dont un problème pouvant conduire à une corruption des données sur certaines tables du catalogue système.
* plusieurs corrections sur le rejeu des journaux de transactions (fichiers WAL), incluant un cas dans lequel une instance secondaire venant d'être promue ne pouvait pas être démarrée si elle avait planté avant son premier checkpoint suivant la fin de la reprise (post-recovery checkpoint).
* plusieurs améliorations de performances dans le rejeu des journaux de transactions (fichiers WAL).
* plusieurs corrections sur la réplication logique et le décodage logique, incluant l'assurance que les WAL senders logiques renseigne valablement l'état de la réplication par flux.
* une évolution permettant la suppression des slots de réplication en mode mono-utilisateur.
* correction pour avoir la variance et autres fonctions d'agrégation similaires retournant des résultats exacts lorsqu’elles sont exécutées en requête parallélisée.
* correction de la syntaxe _FETCH FIRST_ du standard SQL pour autoriser des paramètres (`$n`), comme attendu par le standard.
* correction pour s'assurer qu'un processus effectuant un scan d'index parallèle répondra aux signaux tels que l'annulation de la requête.
* correction de la comptabilisation de l'utilisation de ressource dans l'ordre _EXPLAIN_, en particulier l'accès au tampon par des processus parallèles.
* plusieurs corrections du planificateur de requêtes incluant l'amélioration de l'estimation des coûts pour les jointures par hachage et le choix de l'utilisation des index pour les jointures fusion sur des colonnes de type composite.
* correction d'une perte de performances relative aux sémaphores POSIX pour les systèmes multi-CPU fonctionnant sur Linux ou FreeBSD.
* correction des index GIN qui pouvaient mener à un échec après l'exécution d'un pg_upgrade depuis une version antérieure à PostgreSQL 9.4.
* correction de l'ordre `SHOW ALL` pour afficher les paramètres de configuration des super-utilisateurs aux rôles autorisés à lire tous les paramètres.
* correction de l'ordre `COPY FROM .. WITH HEADER` qui supprimait une ligne après chaque 4'294'967'296ème ligne traitée.
* plusieurs corrections du support de _XML_, incluant l'utilisation du nœud _document_ comme contexte pour les requêtes _XPath_ comme défini dans le standard SQL, ce qui affecte les fonctions `xpath` et `xpath_exists`, ainsi que `XMLTABLE`.
* correction de libpq pour certains cas où le paramètre `hostaddr` est utilisé.
* plusieurs corrections de ecpg pour Windows.
* correction de la demande de mot de passe du client Windows pour désactiver proprement l'écho.
* plusieurs corrections sur `pg_dump`, incluant la sortie correcte des propriétés `REPLICA IDENTITY` pour les contraintes liées aux index.
* vérification par `pg_upgrade` que l'ancien serveur a été éteint proprement.

Cette publication contient aussi la version 2018e de tzdata, qui réalise les mises à jour des timezones pour la Corée du Nord. 
Cette version 2018e réintroduit aussi les changements DST négatifs introduits initialement en 2018a. Cela affecte les timestamps pour l'Irlande (1971-), la Namibie (1994-2017) et l'ancienne Tchécoslovaquie (1946-1947).
Si votre application stocke des timestamps avec timezones dans les régions affectées, il est conseillé de vérifier que l'application se comporte comme prévu.

## Avertissement sur la fin de vie de la version 9.3

La version 9.3 sera en fin de vie après la prochaine sortie de version prévue en novembre. 

Nous recommandons vivement aux utilisateurs d’initier un planning de mise à jour vers une version de PostgreSQL plus récente, et ce dès que possible. Pour de plus amples explications, reportez-vous à notre politique de gestion de versions.

## Mise à jour

Toutes les mises à jour PostgreSQL sont cumulatives. Tout comme les autres
versions mineures, il n’est pas utile pour les utilisateurs de décharger et
recharger leur base de données ou d’utiliser pg_upgrade pour appliquer cette
mise à jour. Vous devrez simplement arrêter votre instance PostgreSQL et
mettre à jour les exécutables.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures
pourraient avoir besoin de lancer des étapes supplémentaires après la mise à
jour; merci de consulter les notes de version des versions précédentes pour
plus de détails.

## Liens

* [Téléchargement](https://www.postgresql.org/download)
* [Notes de version](https://www.postgresql.org/docs/current/static/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)
