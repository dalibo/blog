---
layout: post
title: "Sortie de PostgreSQL 9.2.3"
description: ""
tags: [postgresql, upgrade, sécurité, release, 9, 8]

---

**Mises à jour mineures de PostgreSQL : 9.3.2, 9.2.6, 9.1.11, 9.0.15 et 8.4.19**

Le groupe de développement de PostgreSQL sort une mise à jour pour toutes les versions stables du SGBD PostgreSQL. Cela inclut les versions 9.3.2, 9.2.6, 9.1.11, 9.0.15 et 8.4.19. Cette mise à jour corrige un bug de réplication pouvant entrainer une corruption des données sur les serveurs en mode Hot Stanby et les sauvegardes en continue (PITR). Il est fortement recommandé à tous les utilisateurs qui ont mis en oeuvre la réplication d'appliquer la mise à jour immédiatement. La reconstruction des instances esclaves est obligatoire. Attention, une fois la montée de version effectuée, il est impératif de reconstruire toutes les instances Hot Standby.

<!--more-->

Pour les abonnés au support DALIBO, un descriptif complet du problème est disponible sur notre base de connaissance : <https://kb.dalibo.com/annonce_bug_replication>

Cette version corrige également 2 problèmes de liés à la commande VACUUM, qui peuvent provoquer la réapparation de lignes supprimées dans certaines circonstances. Les serveurs ayant des taux de transactions très élévés (notamment ceux qui font un "transaction ID wraparound" toutes les semaines) sont les plus sensible à ce problème. Après la mise à jour, il est recommandé de lancer un VACCUM sur toutes les bases de données avec le paramètre vacuum_freeze_table_age à 0.

Cette mise à jour contient également des correctifs à plusieurs problèmes mineurs découverts et corrigés par la communauté PostgreSQL durant les deux derniers mois, dont certains n'affectent que la version 9.3:

* Eviter les erreurs "lock already held"
* Résolution d'un problème d'interblocage dans la gestion des timeout
* Correction de bugs mineurs sur les mise à jour HOT et la carte de visibilité ("Visibility Map"). 
* Eviter le gonflement du stockage des pg_multixact sur les serveurs standbys
* Correction d'un bug dans les index GIN qui peut provoquer des erreurs de requêtes. 
* Correction d'un problème qui bloquait la création d'index  SP-GiST
* Correction de bugs sur les vues matérialisées
* Possibilité d'utiliser des alias de tables dans les requêtes complexes
* Correction de deux bugs de l'optiliseur de sous-requêtes
* pg_receivexlog peut reprendre le streaming quand plus de 4GB de journaux ont été générés
* Eviter le crash du planificateur sur les références de ligne entière
* Eviter la suppression prématurée des fichiers temporaires
* Correction de plusieurs fuite de mémoire mineures
* Suppression de l'affichage des colonnes supprimées lors d'une violation de contraintes CHECK et NOT NULL 
* Utilisation d'arguments nommés et par défaut dans les fonctions de fenêtrage
* Génération d'un valeur JSON valide lors de la convertion d'une chaine HStore vide
* Correction d'un décalage de zone GMT
* Signalement correct de l'erreur "out-of-disk-space" pendant un pg_upgrade
* Plusieurs mises à jour du référentiel de fuseaux horaires

 

Comme avec les autres versions mineures, les utilisateurs n'ont besoin ni de sauvegarder et recharger leur instance, ni d'utiliser pg_upgrade pour appliquer cette mise à jour. Vous devez simplement arrêter PostgreSQL et mettre à jour les binaires. Les utilisateurs qui n'ont pas effectuées les mises à jour précédentes peuvent avoir quelques étapes supplémentaires. Les détails sont disponibles dans les notes de version (Release Notes). Pour cette version, il est aussi impératif de reconstruire tous les serveurs en mode Hot Standby.

Pour les clients de Dalibo sous contrat Support PostgreSQL Premium, bénéficiant ainsi des mises à jour effectuées par notre service de support, nous profitons de cette annonce pour vous informer que nous avons procédé à la création de tickets d'intervention visant à mettre à jour vos serveurs. Nous vous invitons à nous faire part de vos contraintes quant à l'arrêt nécessaire du serveur PostgreSQL pour l'application de cette mise à jour dans ce(s) ticket(s) d'intervention.

Téléchargez les nouvelles versions maintenant sur :

* <http://www.postgresql.org/download/>
* Code source: <http://www.postgresql.org/ftp/source/>
* Paquets binaires: <http://www.postgresql.org/ftp/binary/>
* Installeur One-click (dont le paquet Windows): <http://www.enterprisedb.com/products-services-training/pgdownload>
