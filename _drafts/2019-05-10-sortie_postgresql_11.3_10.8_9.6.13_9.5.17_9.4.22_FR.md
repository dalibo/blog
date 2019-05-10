---
layout: post
title: Sortie de PostgreSQL 11.3, 10.8, 9.6.13, 9.5.17, 9.4.22
author: Christophe Courtois, Laura Ricci
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, release, mineure, sécurité, sortie, issue, 9.4, 9.5, 9.6, 10, 11]
---

---

*Paris, le 9 mai 2019*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour 
toutes les versions supportées de PostgreSQL, à savoir : 11.3, 10.8, 9.6.13, 
9.5.17 et 9.4.22

<!--MORE-->

Cette mise à jour corrige deux problèmes de sécurité dans le serveur de PostgreSQL,
un problème dans deux des installateurs Windows de PostgreSQL et plus de 60 bugs 
rapportés sur ces trois derniers mois.

      
## Correctifs de sécurité

Quatre vulnérabilités sont corrigées dans cette mise à jour :

* CVE-2019-10127: L'installateur Windows de BigSQL ne nettoie pas des entrées ACL
trop permissives.

* CVE-2019-10128: L'installateur Windows d'EnterpriseDB ne nettoie pas des entrées
ACL trop permissives.
Comme les installateurs Windows d'EnterpriseDB et BigSQL ne verrouillent pas les
permissions du répertoire d'installation des binaires et du répertoire des données,
un utilisateur Windows non privilégié et un utilisateur PostgreSQL non privilégié
peuvent forcer le service PostgreSQL à exécuter n'importe quel code.
Cette vulnérabilité est présente dans toutes les versions de PostgreSQL supportées par
ces installateurs, et peut-être dans les versions plus anciennes. Les deux installateurs
ont corrigé les permissions pour ces répertoires pour les installations nouvelles et existantes.
Si vous avez installé PostgreSQL sur Windows par cette méthode, nous vous conseillons de
vérifier que seuls des utilisateurs de confiance peuvent écrire dans les répertoires des
binaires de PostgreSQL et dans les répertoires des données.
Le projet PostgreSQL remercie Conner Jones pour avoir remonté ce problème.

* CVE-2019-10129: Révélation de mémoire dans le routage des partitions.
Avant cette version, un utilisateur utilisant PostgreSQL 11 peut lire des fragments arbitraires
de la mémoire du serveur en exécutant un ordre INSERT ad hoc dans une table partitionnée.


* CVE-2019-10130: Les estimateurs de sélectivité contournent les règles de sécurité
par ligne.
PostgreSQL maintient des statistiques pour les tables en échantillonnant les données des colonnes ;
ces statistiques sont consultées pendant la planification de la requête. Avant cette version, un utilisateur
capable d'exécuter des requêtes SQL et pouvant lire une colonne donnée pouvait concevoir un opérateur capable
de lire n'importe quelles valeurs échantillonnées dans cette colonne. Si cela incluait des valeurs interdites
par une règle de sécurité de lignes, l'utilisateur pouvait donc en pratique contourner cette règle.
Ceci est corrigé en acceptant un opérateur avec effet de bord (donc non « leakproof ») uniquement s'il n'y a
pas de règles de sécurité par ligne sur la table.
Ce problème existe dans PostgreSQL 9.5, 9.6, 10 et 11. Le projet PostgreSQL remercie Dean Rasheed pour avoir
remonté ce problème.

## Corrections de bugs et améliorations

Cette mise à jour corrige plus de 60 bugs rapportés ces derniers mois.
Certains problèmes n'affectent que la version 11, mais plusieurs concernent toutes 
les versions supportées.

Certains de ces correctifs incluent :

* Plusieurs correctifs contre la corruption du catalogue, dont un lié à l'exécution
de `ALTER TABLE` sur une table partitionnée.
* Plusieurs correctifs en rapport avec le partitionnement.
* Évite un plantage du serveur quand une erreur arrive au moment où l'on tente de 
conserver la requête d'un curseur au travers d'un commit de transaction.
* Évite un problème de performance en O(N^2) lors de l'annulation d'une transaction
qui a créé beaucoup de tables.
* Corrige de possibles erreurs “could not access status of transaction” dans
`txid_status()`
* Corrige les vues autorisant les mises à jour pour permettre des clauses DEFAULT
dans les ordres `INSERT .. VALUES` avec plusieurs lignes VALUES.
* Corrige CREATE VIEW pour autoriser les vues avec zéro colonne.
* Ajoute un support manquant pour l'ordre `CREATE TABLE IF NOT EXISTS .. AS EXECUTE..`
* S'assure que les sous-SELECTs apparaissant dans les expressions des règles de sécurité
par ligne sont exécutés avec les permissions correctes de l'utilisateur.
* Accepte les documents XML comme valeurs valides de type xml quand xmloption est positionné
à « content », comme requis par SQL:2006 et suivants.
* Corrige une incompatibilté des enregistrements d'index GIN dans les WAL, tels qu'introduits
en 11.2, 10.7, 9.6.12, 9.5.16 et 9.4.21, qui affectent les serveurs répliqués exécutant ces
versions et suivant les changements dans ces index issus de serveurs primaires de versions
antérieures.
* Plusieurs corrections de fuites mémoire, ainsi que des correctifs dans la gestion de la
mémoire partagée.
* Assouplit les erreurs PANIC dans fsync et sync_file_range pour certains cas où une erreur
indiquerait « operation not supported »
* Plusieurs correctifs au planificateur, dont plusieurs devraient mener à des améliorations
dans la planification.
* Correction d'un problème de concurrence dans lequel le postmaster d'un hot-standby pouvait
ne pas s'arrêter après avoir reçu un ordre « smart shutdown ».
* Plusieurs correctifs dans l'authentification SCRAM.
* Corrige la manipulation des paramètres `lc_time` impliquant un encodage différent de celui
de la base de données
* Créer le fichier `current_logfiles` avec les mêmes permissions que les autres fichiers du
serveur
dans le répertoire `data`.
* Plusieurs corrections d'ecpg.
* Forcer `pg_verify_checksums` à s'assurer que le répertoire des données qu'on lui pointe est dans
la bonne version de PostgreSQL.
* Plusieurs correctifs pour `contrib/postgres_fdw`, dont le cas d'un UPDATE sur des partitions
distantes
pouvant mener à des résultats incorrects ou un plantage.
* Plusieurs correctifs pour Windows.


## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres mises à jour mineures,
les utilisateurs n'ont pas à sauvegarder et recharger leur base de données ou à utiliser `pg_upgrade`
pour appliquer cette mise à jour ; vous pouvez simplement arrêter PostgreSQL et mettre les binaires à jour.

Les utilisateurs ayant sauté une ou plusieurs mises à jour peuvent avoir à exécuter certaines étapes
supplémentaires après installation ; merci de consulter les notes des versions précédentes pour les détails.

PostgreSQL 9.4 ne recevra plus de correctifs après le 13 février 2020. Merci de consulter notre politique de
versionnement pour plus d'informations.


## Liens

* [Téléchargement](https://www.postgresql.org/download)
* [Notes de version](https://www.postgresql.org/docs/11/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)

      
