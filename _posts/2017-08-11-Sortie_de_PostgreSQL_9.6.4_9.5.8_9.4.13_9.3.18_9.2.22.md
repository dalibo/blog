---
layout: post
title: Sortie de PostgreSQL 9.6.4, 9.5.8, 9.4.13, 9.3.18, 9.2.22
author: Julien Rouhaud
twitter_id: rjuju123
github_id: rjuju
tags: [PostgreSQL, sécurité, upgrade]

---

---
*Paris, le 10 août 2017*

Le « PostgreSQL Global Development Group » a sorti une mise à
jour pour toutes les versions de nos systèmes de bases de données
incluant les versions 9.6.4, 9.5.8, 9.4.13, 9.3.18 et 9.2.22. Cette mise à jour
corrige trois failles de sécurité.
Elle corrige aussi plus de cinquante bugs rapportés au cours des trois derniers
mois.

<!--MORE-->

Les utilisateurs qui sont affectés par les failles de sécurité ci-dessous
devraient mettre à jour aussi rapidement que possible. Les utilisateurs
affectés par la CVE-2017-7547
([https://access.redhat.com/security/cve/CVE-2017-7547](https://access.redhat.com/security/cve/CVE-2017-7547))
devront effectuer des manipulations supplémentaires après la mise à jour pour
corriger le problème.  Les autres utilisateurs devraient profiter de la
prochaine maintenance prévue impliquant un arrêt de la base pour effectuer la
mise à jour.

Failles de sécurité:
--------------------

_Trois failles de sécurité ont été fermées grâce à cette mise à jour :_

    CVE-2017-7546 : mots de passe vides acceptés avec certaines méthodes
    d'authentification
    CVE-2017-7547 : la vue du catalogue pg_user_mappings dévoile des mots de
    passe aux utilisateurs n'ayant pas les privilèges serveur appropriés
    CVE-2017-7548 : la fonction `lo_put()` ignore les ACL

**CVE-2017-7546** : mots de passe vides acceptés avec certaines méthodes d'authentification
----------------------------------------------------------------------------------------

La bibliothèque libpq, et par extension tout programme l'utilisant pour gérer les
connexions, ignore les mots de passe vides et ne les transmet pas au serveur.
Lorsqu'une méthode d'authentification basée sur un mot de passe est en place et
que les connexions sont gérées à travers la libpq ou un programme l'utilisant,
configurer un mot de passe vide pour un utilisateur semble identique à
désactiver la connexion par mot de passe. Néanmoins, un client n'utilisant pas
la libpq pour gérer la connexion pourrait autoriser un client fournissant un
mot de passe vide à se connecter.

Pour corriger ce problème, cette mise à jour empêche des mots de passe vides
d'être soumis quelle que soit la méthode d'authentification configurée si cette
dernière est basée sur des mots de passe. Le serveur rejettera aussi toute
utilisation de mot de passe vide.


**CVE-2017-7547** : la vue du catalogue pg_user_mappings dévoile des mots de passe aux utilisateurs n'ayant pas les privilèges serveur appropriés
---------------------------------------------------------------------------------------------------------------------------------------------

Ce correctif a trait à l'utilisation des Foreign Data Wrapper dans SQL/MED,
et plus spécifiquement au User Mapping.

Avant cette correction, un utilisateur avait la possibilité de voir les options
dans la vue pg_user_mappings, même si cet utilisateur n'avait pas le
privilège USAGE sur le Foreign Data Wrapper associé. Cela signifiait
qu'un utilisateur pouvait voir des éléments, tels qu'un mot de passe, qui
auraient pu être positionnés par l'administrateur du serveur plutôt que par
l'utilisateur lui-même.

Le correctif modifie ce comportement uniquement pour les instances nouvellement
créées avec initdb.
Pour corriger ce problème sur les systèmes existants, il est nécessaire de
procéder aux actions décrites ci-après. Pour plus de détails, merci de vous
référer aux [notes de
version](https://www.postgresql.org/docs/current/static/release-9-6-4.html).

1.  Dans le fichier postgresql.conf, ajouter la ligne suivante :

```
    allow_system_table_mods = true
```

2.  Après avoir ajouté la ligne, il est nécessaire de redémarrer l'instance
    PostgreSQL.

3.  Dans **chaque** base de données de l'instance, exécuter les commandes
    suivantes en tant que super utilisateur :

```sql
    SET search_path = pg_catalog;
    CREATE OR REPLACE VIEW pg_user_mappings AS
    SELECT
        U.oid       AS umid,
        S.oid       AS srvid,
        S.srvname   AS srvname,
        U.umuser    AS umuser,
        CASE WHEN U.umuser = 0 THEN
            'public'
        ELSE
            A.rolname
        END AS usename,
        CASE WHEN (U.umuser <> 0 AND A.rolname = current_user
                     AND (pg_has_role(S.srvowner, 'USAGE')
                          OR has_server_privilege(S.oid, 'USAGE')))
                    OR (U.umuser = 0 AND pg_has_role(S.srvowner, 'USAGE'))
                    OR (SELECT rolsuper FROM pg_authid WHERE rolname = current_user)
                    THEN U.umoptions
                 ELSE NULL END AS umoptions
    FROM pg_user_mapping U
    LEFT JOIN pg_authid A ON (A.oid = U.umuser)
    JOIN pg_foreign_server S ON (U.umserver = S.oid);
```

4.  Il est également nécessaire d'exécuter les commandes dans les bases de
    données "template0" et "template1", faute de quoi la vulnérabilité sera
    présente dans les bases de données créées ultérieurement.

Pour ce faire, premièrement, il faut autoriser "template0" à accepter les
connexions. Sous PostgreSQL 9.5, exécuter la commande suivante :

    ALTER DATABASE template0 WITH ALLOW_CONNECTIONS true;

Sous PostgreSQL 9.4 et les versions antérieures, il faut à la place exécuter la
commande suivante :

```sql
    UPDATE pg_database SET datallowconn = true WHERE datname = 'template0';
```

Ensuite, dans les bases de données "template0" et "template1", exécuter les
commandes telles que décrites dans l'étape 3.

Lorsque cela est fait, il faut désactiver les connexions à la base de données
"template0". Sous PostgreSQL 9.5, exécuter la commande suivante :

    ALTER DATABASE template0 WITH ALLOW_CONNECTIONS false;

Sous PostgreSQL 9.4 et les versions antérieures, il faut à la place exécuter la
commande suivante :

```sql
    UPDATE pg_database SET datallowconn = false WHERE datname = 'template0';
```

5.  Retirer la ligne suivante du fichier postgresql.conf :

```
    allow_system_table_mods = false
```

6.  Redémarrer l'instance PostgreSQL

Pour davantage de détails, merci de vous référer aux [notes de
version](https://www.postgresql.org/docs/current/static/release-9-6-4.html).

**CVE-2017-7548** : la fonction `lo_put()` ignore les ACL
-----------------------------------------------------

La fonction `lo_put()` devrait nécessiter les mêmes permissions que
`lowrite()`, mais l'absence d'une vérification de permissions pourrait
permettre à n'importe quel utilisateur de modifier les données dans un Large
Object.

Pour corriger cela, la fonction `lo_put()` a été modifiée pour vérifier la
présence du privilège UPDATE sur l'objet cible.



Correction des bugs et améliorations :
-------------------------------------

Cette mise à jour corrige aussi plusieurs bugs rapportés ces
derniers mois.
Certains n'affectent que la version 9.6, mais la plupart
impactent toutes les versions supportées :



* pg_upgrade : correction de la documentation à propos du processus de mise à
  jour d'instances secondaires pour s'assurer que le serveur primaire et les
  secondaires se synchronisent en tout sécurité. Inclut également un correctif
  pour assurer que le dernier enregistrement WAL n'est pas au niveau
  "wal_level = minimum", ce qui empêcherait des secondaires de se connecter
  suite au redémarrage
* Correction d'un problème de race condition sur des verrouillages
  concurrents qui pourrait provoquer l'échec de certaines mises à jour
* Plusieurs corrections pour des scénarios peu probables de corruption de
  données
* Correction pour empêcher un arrêt brutal de l'instance lors d'un tri d'au
  moins un milliard d'enregistrements en mémoire
* Correction sur Windows pour retenter de créer un processus si des adresses en
  mémoire partagée n'ont pas pu être allouées, ce qui peut typiquement être
  provoqué par l'ingérence d'un logiciel d'anti-virus
* Correction dans la libpq pour assurer que des tentatives de connexion
  utilisant les authentifications GSS/SASL et SSPI ayant échoué sont
  réinitialisées correctement
* Corrections pour la gestion et le traçage des connexions SSL
* Correction pour autoriser les fonctions de fenêtrage
  à être utilisées dans une sous-requête appelée depuis les arguments d'une
  fonction d'agrégation
* Autorisation du parallélisme dans le plan de la requête COPY lors d'une copie
  depuis une requête
* Plusieurs corrections dans ALTER TABLE
* Correction pour assurer que ALTER USER ... SET et ALTER ROLE ... SET
  acceptent les mêmes variantes syntaxiques
* Corrections pour le collecteur de statistiques, pour assurer que les requêtes
  de statistiques effectuées juste après une demande d'arrêt de postmaster
  soient écrites sur disque
* Correction de la possible création d'un segment WAL invalide pendant la
  promotion d'une instance secondaire
* Plusieurs corrections du walsender et walreceiver, notamment sur la gestion
  de signaux et les arrêts et redémarrages
* Plusieurs corrections du décodage logique, incluant le retrait de fuites de
  petites sous-transactions sur disque
* Autorisation pour les contraintes CHECK d'être initialement NOT VALID lors de
  l'exécution de CREATE FOREIGN TABLE
* Corrections sur postgres_fdw pour appliquer les changements rapidement suite
  à des commandes ALTER SERVER et ALTER USER MAPPING, et amélioration de la
  capacité à reprendre la main depuis un serveur ne répondant plus
* Plusieurs corrections sur pg_dump et pg_restore, incluant une correction de
  la sortie de pg_dump vers stdout sous Windows
* Correction de la sortie vers stdout de pg_basebackup sous Windows, similaire
  à la correction apportée à pg_dump
* Correction de pg_rewind pour gérer correctement les fichiers dépassant 2 Go,
  bien que des fichiers de cette taille devraient rarement apparaître dans le
  répertoire de données
* Plusieurs correctifs pour la compilation de PostgreSQL avec Microsoft Visual
  C (MSVC)


Avertissement sur la fin de vie de la version 9.2
-------------------------------------------------

La version 9.2 sera en fin de vie en septembre 2017. La communauté PostgreSQL
s’attend à fournir au plus une mise à jour supplémentaire sur cette version.
Nous recommandons vivement aux utilisateurs d’initier un planning de mise à
jour vers une version de PostgreSQL plus récente, et ce dès que possible. Pour
de plus amples explications, reportez-vous à notre politique de gestion de
versions.


Mise à jour
-----------

Toutes les mises à jour PostgreSQL sont cumulatives. Tout comme les autres
versions mineures, il n’est pas utile pour les utilisateurs de décharger et
recharger leur base de données ou d’utiliser pg_upgrade pour appliquer cette
mise à jour. Vous devrez simplement arrêter votre instance PostgreSQL et
mettre à jour les exécutables.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures
pourraient avoir besoin de lancer des étapes supplémentaires après la mise à
jour; merci de consulter les notes de version des versions précédentes pour
plus de détails.

Liens :
-------
* [Téléchargement](https://www.postgresql.org/download)
* [Notes de version](https://www.postgresql.org/docs/current/static/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/)

