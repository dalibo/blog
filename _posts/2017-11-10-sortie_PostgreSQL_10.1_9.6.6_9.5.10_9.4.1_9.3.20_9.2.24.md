---
layout: post
title: Sortie de PostgreSQL 10.1, 9.6.6, 9.5.10, 9.4.15, 9.3.20 et 9.2.24 
author: Damien Clochard, Léo Cossic
twitter_id: Dalibo
github_id: Dalibo
tags: [dalibo, postgresql, release, mineure, sécurité, sortie, issue, 10.1]
---

---

*Paris, le 10 novembre 2017*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions de PostgreSQL : 10.1, 9.6.6, 9.5.10, 9.4.15, 9.3.20, et 9.2.24. Cette mise à jour corrige 3 failles de sécurité ainsi que des problèmes découverts autour des index BRIN, la réplication logique et d'autres bugs signalés durant les 3 derniers mois. 

Tous les utilisateurs de PostgreSQL doivent appliquer cette mise à jour dès que possible.

<!--MORE-->

Si vous utilisez les index BRIN ou le module contrib "start-scripts", consultez les notes de versions pour connaître les actions supplémentaires à effectuer après la mise à jour. 

## Problèmes de sécurité

Trois vulnérabilités ont été corrigées :

* [CVE-2017-12172](https://access.redhat.com/security/cve/CVE-2017-12172): Le script de démarrage permet à l'administrateur de la base de données de modifier des fichiers appartenant au super-utilisateur "root".
* [CVE-2017-15098](https://access.redhat.com/security/cve/CVE-2017-15098): Exposition de la mémoire dans des fonctions JSON 
* [CVE-2017-15099](https://access.redhat.com/security/cve/CVE-2017-15099): INSERT ... ON CONFLICT DO UPDATE ne respecte pas les privilèges définis pour SELECT

### CVE-2017-12172: "Le script de démarrage permet à l'administrateur de la base de données de modifier des fichiers appartenant au super-utilisateur "root"."

Avant cette version, le fichier de log de démarrage du processus "postmaster" (appelé "postgres" dans les versions récentes) était ouvert pendant que le processus appartenait encore à root. Dans cette situation, le propriétaire de la base pouvait spécifier un fichier auquel il n'avait pas accès et corrompre ce fichier avec des données de log. Ce correctif garantit que le fichier de log de démarrage est ouvert par l'utilisateur qui lance l'instance PostgreSQL. Tous les utilisateurs qui ont utilisé les scripts de démarrage doivent vérifier que les fichiers de log de démarrage appartiennent à l'utilisateur qui fait fonctionner l'instance PostgreSQL. 

### CVE-2017-15099 : "INSERT ... ON CONFLICT DO UPDATE ne respecte pas les privilèges définis pour SELECT"

Avant cette version, l'opération "INSERT ... ON CONFLICT DO UPDATE" ne vérifiait pas que l'utilisateur avait la permission d'effectuer un "SELECT" sur l'index utilisé pour analyser le conflit. Par ailleurs, dans une table utilisant la sécurité au niveau lignes (Row Level Security), l'opération "INSERT ... ON CONFLICT DO UPDATE" ne vérifiait pas les politiques d'accès de la table avant d'effectuer l'opération UPDATE.

Ce correctif garantit que "INSERT ... ON CONFLICT DO UPDATE" respecte bien désormais les permissions et les règles de sécurités RLS avant de s'exécuter.

## Corrections de bugs et améliorations 

Cette mise à jour corrige également un certain nombre de bugs signalés ces derniers mois. Certains problèmes concernent uniquement la version 10 mais la plupart affectent toutes les versions supportées :

* Correction d'une condition de concurrence ("race condition") sur les index BRIN qui pouvait entraîner l'oubli de certaines lignes
* Correction d'un crash quand le décodage logique est invoqué depuis une fonction procédurale 
* Plusieurs corrections sur la réplication logique
* Retour au comportement antérieur à la version 10 pour les CTEs attachées à des opérations INSERT/UPDATE/DELETE
* Prévention d'un crash très rare lors du déclenchement de triggers imbriqués
* Ne pas évaluer les arguments d'une fonction d’agrégat lorsque les conditions dans la clause FILTER sont évaluées comme FALSE. Ce comportement respecte le standard SQL
* Correction de résultats erronés lorsque plusieurs colonnes du GROUPING SETS contiennent la même variable simple
* Correction d'une fuite de mémoire pendant la durée de vie d'une requête qui évalue une fonction retournant un ensemble basé sur la liste des cibles dans un SELECT
* Plusieurs correctifs sur l’exécution des requêtes en parallèle, notamment un crash lors de l’exécution en parallèle de certaines requêtes contenant un certain type de scan bitmap
* Correction de json_build_array(), json_build_object(), jsonb_build_array() et jsonb_build_object() pour gérer correctement les arguments VARIADIC explicites
* Prévention des cas où des valeurs flottantes infinies sont transformées en un type numérique
* Correction de l'algorithme “work item” de l'autovacuum pour éviter des crashs ou des pertes silencieuses de "work items"
* Plusieurs correctifs sur les vues lorsque l'on ajoute des colonnes à la fin d'une vue
* Correction de la détection par hash FIXME  pour les types RANGE créés par un utilisateur
* Meilleure utilisation des statistiques étendues sur les colonnes lors de la planification des requêtes
* idle_in_transaction_session_timeout n'est plus ignoré lorsqu'un statement_timeout s'est produit précédemment
* Correction d'une perte des messages NOTIFY dans le cas très rare ou l'on traite 2 milliards de transactions sans qu'aucune requête ne soit exécutée dans la session
* Plusieurs correctifs concernant les interactions avec le système de fichier
* Restauration correcte du paramètre umask après l'échec de la création d'un fichier via COPY ou lo_export()
* Correction de pg_dump pour garantir qu'il émet les commandes GRANT dans un ordre valide
* Correction de pg_basebackup pour comparer les chemins d'accès des tablespaces de manière canonique, afin d'améliorer la compatibilité avec Windows
* Correction de la libpq : il n'est plus nécessaire que le répertoire home de l'utilisateur existe lorsque qu'on essaie de lire le fichier  "~/.pgpass"
* Plusieurs corrections sur ecpg.

Cette mise à jour contient également la version 2017c des données de fuseaux horaires (tzdata) avec des modifications pour Fidji, Namibie, Chypre Nord, Soudan, Tonga, et les îles Turks-et-Caïcos, ainsi que des corrections historiques pour l'Alaska, Apia (Samoa), la Birmanie, Calcutta, Détroit, l'Irlande, la Namibie et Pago Pago.

## Fin du Support pour la version 9.2

PostgreSQL 9.2 est officiellement en fin de vie (End-of-Life ou EOL). La communauté ne fournira plus de mises à jour ni de correctifs de sécurité pour cette version. Les utilisateurs ayant encore des versions 9.2 doivent effectuer une montée de version dès que possible. 

## Liens 

* [Annonce Officielle](https://www.postgresql.org/about/news/1801/)
* [Téléchargement](https://www.postgresql.org/download)
* [Notes de Version](https://www.postgresql.org/docs/current/static/release.html)
* [Securité](https://www.postgresql.org/support/security/)
* [Cycle des Versions](https://www.postgresql.org/support/versioning/)
