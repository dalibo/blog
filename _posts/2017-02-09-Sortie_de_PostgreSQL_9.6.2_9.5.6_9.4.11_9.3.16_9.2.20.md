---
layout: post
title: Sortie de PostgreSQL 9.6.2, 9.5.6, 9.4.11, 9.3.16, 9.2.20
author: Julien Rouhaud
twitter_id: rjuju123
github_id: rjuju
tags: [PostgreSQL, sécurité, upgrade]

---

---
*Paris, le 09 février 2017*

Le PostgreSQL Global Development Group a publié une mise à jour pour de toutes
les versions supportées de notre système de base de données, les versions
9.6.2, 9.5.6, 9.4.11, 9.3.16, et 9.2.20. Ces versions incluent un correctif
contre des problèmes de corruption de données lors de créations d'index et lors
du rejeu des journaux de transactions dans certaines situations, qui sont
détaillées ci-dessous. Elles incluent également la correction de plus de 75
autres bugs qui ont été remontés durant ces trois derniers mois.

Les utilisateurs devraient planifier l'application de cette mise à jour lors de
la prochaine interruption de service planifiée.

<!--MORE-->

Corruption lors de la création d'index avec CREATE INDEX CONCURRENTLY
---------------------------------------------------------------------

Il existait une condition de concurrence ("race condition") si CREATE INDEX
CONCURRENTLY était appelé sur une colonne n'ayant jamais été indexée
auparavant, auquel cas les lignes qui étaient mises à jour par des transactions
actives au même moment que la commande CREATE INDEX CONCURRENTLY pouvaient ne
pas être indexées correctement.

Si vous suspectez que cette situation a pu survenir, la solution la plus sûre
est de reconstruire les index affectés après avoir procédé à la mise à jour.

Ce problème est présent dans les versions 9.2, 9.3, 9.4, 9.5, et 9.6 de
PostgreSQL.

Correctifs pour la visibilité des données et la stabilité de la journalisation
------------------------------------------------------------------------------

Ces versions contiennent de nombreux correctifs pour améliorer la stabilité des
données visibles et de la journalisation des données que nous voulons mettre en avant
ici.

Avant cette mise à jour, des données pouvaient être supprimées prématurément
par une opération de vacuum quand un instantané ("snapshot") particulier,
utilisé pour le parcours des catalogues système, était actif.
Spécifiquement, l'opération de vacuum ne pouvait pas récupérer le plus ancien
identifiant de transaction pour cet instantané.  Cela se traduisait par un
message d'erreur tel que :

    "cache lookup failed for relation 1255"

Ce correctif s'assure que les opérations de vacuum prendront en compte les
instantanés utilisés pour les parcours des catalogues systèmes.

De plus, de nombreux correctifs sont présents pour améliorer la stabilité de la
journalisation.  Ceux-ci incluent :

  * Un correctif pour la journalisation des index BRIN, où un rejeu pouvait
    rendre inutile une partie de l'index BRIN et nécessiter une maintenance de
    l'index ;
  * Un correctif pour les tables non journalisées, où un enregistrement
    pouvait être produit dans les journaux de transaction si le paramètre
    wal_level est positionné à "minimal", et dans le cas d'un rejeu de cet
    enregistrement en cas de reprise après arrêt brutal la table n'était pas
    correctement réinitialisée ;
  * Un correctif dans la validation de l'en-tête de page WAL lors de la
    relecture d'un journal de transaction, corrigeant l'erreur "out-of-sequence
    TLI" qui pouvait survenir lors de la restauration.

Ces problèmes sont présents dans la version 9.6 de PostgreSQL, et peuvent
également être présents dans les versions 9.2, 9.3, 9.4 et 9.5.

Correctifs de bugs et améliorations
-----------------------------------

Cette mise à jour corrige également un certain nombre de bugs rapportés durant
ces derniers mois.  Certains de ces problèmes ne concernent que la version 9.6,
mais la plupart concernant toutes les versions supportées.  Il y a plus de 75
correctifs de bugs présents dans cette version, cela inclut :

* De nombreux correctifs pour le mode "hot standby" ;
* Interdiction de positionner zéro pour le champ num_sync du paramètre
  synchronous_standby_names ;
* Les processus background worker ne sont plus comptabilisés dans la limite de
  connexion d'un utilisateur ;
* Correctif du test pour savoir si un objet membre d'une extension peut être
  supprimé ;
* Correctif pour le suivi des privilèges initiaux des objets membres d'une
  extension, afin que cela fonctionne correctement avec ALTER EXTENSION ...
  ADD/DROP ;
* Plusieurs correctifs sur vacuum et autovacuum ;
* Correctif sur CREATE OR REPLACE VIEW pour mettre à jour la requête associée à
  la vue avant de tenter d'appliquer les nouvelles options ;
* ALTER TABLE s'assure que les tablespaces associés aux index sont bien
préservés lors de la recréation des index ;
* Plusieurs correctifs sur l'optimiseur, incluant des correctifs sur les tables
  distantes et les CTE ;
* Plusieurs correctifs concernant la fonctionnalité de full text search pour
  améliorer la précision et la performance des recherches ;
* Plusieurs correctifs et améliorations de performance pour plusieurs fonctions
  gérant les tableaux ;
* Plusieurs correctifs concernant l'interaction entre les contraintes de clé
  étrangères et les fonctions trigger lors d'opérations ALTER TABLE spécifiques ;
* Suppression des optimisations pour les types de données date/heure qui
  retournaient des données incorrectes ;
* Correctif d'une mauvaise utilisation du champ reloptions des vues qui était
  utilisé comme le champ reloptions d'une table standard ;
* Correctif du problème "target lists can have at most N entries" qui pouvait
  apparaître à tort lors de l'utilisation de ON CONFLICT sur des tables larges ;
* Correctif des fausses erreurs "query provides a value for a dropped column"
  durant des INSERT ou UPDATE sur une table contenant des colonnes supprimées ;
* Les expressions de type foo.* ne sont plus transformées en multiples colonnes
  lors de leurs utilisations dans la source d'une requête UPDATE ;
* Les modificateurs de colonnes ("typmods") sont maintenant exactement
  déterminés lors de l'utilisation d'expressions VALUES multi-valuées ;
* Plusieurs correctifs pour l'outil en ligne de commande psql ;
* L'exécution concurrente des fonctions pg_start_backup() ou pg_stop_backup()
  n'est plus possible
* Plusieurs correctifs pour pg_dump, pg_restore et pg_basebackup, incluant une
  erreur possible de pg_basebackup sur un serveur de standby si les journaux de
  transactions sont inclus ;
* Plusieurs correctifs pour les workers parallèles et les plans de requêtes
  parallèles, incluant un correctif pour un arrêt brutal si le nombre de workers
  disponible pour une requête parallèle diminue durant la phase de rescan ;
* Plusieurs correctifs pour PL/pgSQL, PL/Python, et PL/Tcl ;
* Plusieurs correctifs pour les modules de contrib
* Les délimiteurs de fin de ligne de format DOS sont maintenant supportés dans
  les fichiers ~/.pgpass; y compris sur Unix

Cette mise à jour contient également le tzdata 2016j pour les changements
légaux en Chypre du Nord (ajout d'une nouvelle zone Asia/Famagusta), Russie
(ajout d'une nouvelle zone Europe/Saratov), Tonga et Antartica/Casey.  Elle
contient également des corrections historiques pour l'Italie, le Kazakhstan,
Malte et la Palestine.  Basculement sur des abréviations numériques pour le
Tonga.

Mise à jour
-----------

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres
versions mineures, les utilisateurs n’ont pas besoin d’exporter et réimporter
leur base, ni d’utiliser pg_upgrade pour appliquer cette mise à jour. Vous
pouvez simplement éteindre PostgreSQL et mettre à jour les binaires.

Si vous pensez que votre système était affecté par le bug sur CREATE INDEX
CONCURRENTLY, vous devez recréer les index concernés.  Voici un exemple de
comment procéder à la recréation d'un index sur un système en production sans
perdre la possibilité d'utiliser cet index :

    CREATE INDEX CONCURRENTLY nouveau_nom_index ON table_name (column_name);
    DROP INDEX CONCURRENTLY ancien_nom_index;
    ALTER INDEX new_index_name RENAME TO ancien_nom_index;

Veuillez noter qu'en utilisant cette méthode, vous aurez pendant un court
moment deux copies du même index.  Cette méthode n'est donc pas recommandée si
la quantité d'espace disque utilisée est un problème.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures
pourraient avoir besoin de lancer des étapes supplémentaires après la mise à
jour; merci de consulter les notes de version des versions précédentes pour
plus de détails.

Liens :

  * [Téléchargement](http://www.postgresql.org/download)
  * [Notes de version](http://www.postgresql.org/docs/current/static/release.html)
  * [Page sur la sécurité](http://www.postgresql.org/support/security/)
  * [Politique de versionnement](https://www.postgresql.org/support/versioning/)

