---
layout: post
title: Sortie de PostgreSQL 12.1, 11.6, 10.11, 9.6.16, 9.5.20 et 9.4.25
author: Florent Jardin, Christophe Courtois, Benoît Lobréau
twitter_id: dalibo
github_id: dalibo
tags: [PostgreSQL, release, mineure, sécurité, sortie, 12, 11, 10, 9, update]
source: https://www.postgresql.org/about/news/1994/
---

*Paris, le 15 novembre 2019*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de vos systèmes de bases de données, à savoir : 12.1, 11.6, 10.11, 9.6.16, 9.5.20 et 9.4.25. Cette sortie corrige plus de 60 bugs signalés sur les trois derniers mois.

<!--MORE-->

## La fin du support de PostgreSQL 9.4 approche

La version 9.4 de PostgreSQL ne recevra plus de correctifs à partir du 13 février 2020, prochaine date des sorties des mises à jour mineures. Merci de consulter notre politique de gestion des versions pour plus d'informations.


## Corrections de bugs et améliorations

Cette mise à jour corrige également près de 50 bugs qui ont été rapportés sur les derniers mois. Certains de ces problèmes concernent exclusivement la version 12, mais de nombreux autres touchent toutes les versions supportées.

Parmi ces correctifs, on trouve :

  * Correctif d'un crash lorsqu'un `ALTER TABLE` ajoute une colonne sans valeur par défaut en mêmes temps que d'autres changements nécessitant une réécriture de la table.
  * Plusieurs correctifs apportés à la commande `REINDEX CONCURRENTLY`.
  * Correctif de la commande `VACUUM` qui provoquait son échec dans un certain cas d'utilisation incluant une transaction active.
  * Correctif d'une fuite mémoire qui se produisait lorsqu'un `VACUUM` s'exécutait sur un index GiST.
  * Correctif d'une erreur qui se produisait lors de l'exécution de la commande `CLUSTER` sur un index d'expressions.
  * Correctif d'un échec lors de la commande `SET CONSTRAINTS ... DEFERRED` sur les tables partitionnées.
  * Plusieurs correctifs pour la création et suppression d'index de tables partitionnées.
  * Correctif pour des jointures entre partitions pouvant mener à des échecs du planificateur.
  * Garantie que les expressions `offset` des clauses `WINDOW` sont traitées lorsque les expressions d'une requête sont impliquées.
  * Correction du mauvais comportement de la méthode `bitshiftright()` qui échouait à mettre à zéro l'espace complémentaire du dernier octet si la longueur de la chaîne binaire n'était pas un multiple de 8. Pour corriger vos données, voir la section « Mise à jour ».
  * Une chaîne vide évaluée par la fonction `position()` retourne 1, comme l'impose le standard SQL.
  * Correctif d'un échec de requête parallélisée lorsqu'elle est incapable de réclamer un processus d'arrière-plan.
  * Correctif pour un crash provoqué dans un cas impliquant un trigger `BEFORE UPDATE`.
  * Affichage de la bonne erreur lorsqu'une requête tente d'accéder à une table TOAST.
  * Permet qu'une conversion d'encodage réussisse pour les chaînes dont la sortie monte à 1 Go. Précédemment il y avait une limite en dur de 0,25 Go sur la chaîne en entrée.
  * S'assure que les journaux de transaction et fichiers historiques temporaires sont supprimés à la fin de la restauration des archives.
  * Évite un échec de la restauration d'archive si recovery_min_apply_delay est activé.
  * Ignore les paramètres restore_command, recovery_end_command et recovery_min_apply_delay lors d'une reprise après crash.
  * Plusieurs correctifs pour la réplication logique, dont un échec lorsque éditeur et abonné ont des ensembles de colonnes REPLICA IDENTITY différents.
  * Date correctement les messages de réplication pour le décodage logique, ce qui, dans le cas problématique, pouvait mener à pg_stat_subscription.last_msg_send_time à NULL.
  * Plusieurs correctifs pour la libpq, dont un qui améliore la compatibilité PostgreSQL 12.
  * Plusieurs correctifs pg_upgrade.
  * Correction de la manière dont une restauration en parallèle manipule les contraintes de clés étrangères sur les tables partitionnées pour s'assurer qu'elles ne sont pas créées trop tôt.
  * pg_dump affiche les triggers de même nom et les politiques RLS dans un ordre basé sur le nom de la table au lieu de l'OID.
  * Correction de pg_rewind pour ne pas mettre à jour le contenu de pg_control si l'option --dry-run est utilisée

Cette mise à jour contient la mise à jour 2019c des données tzdata pour les changements législatifs d'heures d'été aux Fidji et dans l'île de Norfolk. Des corrections historiques pour l'Alberta, l'Autriche, la Belgique, la Colombie britannique, le Cambodge, Hong Kong, l'Indiana (comté de Perry), Kaliningrad, le Kentucky, le Michigan, l'île de Norfolk, la Corée du Sud et la Turquie.

Pour la liste complète des changements, merci de consulter les notes de version ici : <https://www.postgresql.org/docs/release/>


## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres mises à jour mineures, les utilisateurs n'ont pas à sauvegarder et restaurer leur base ou utiliser pg_upgrade pour appliquer cette mise à jour ; vous pouvez simplement modifier PostgreSQL et mettre à jour ses binaires.
Les utilisateurs ayant sauté une version ou plus peuvent avoir besoin d'ajouter des étapes supplémentaires après la mise à jour ; merci de voir les notes de version des versions précédentes pour plus de détails.

Si vous avez des données inconsistentes suite au stockage en table de résultats de bitshiftright(), il est possible de corriger cela avec une requête similaire à :

```sql
UPDATE mytab SET bitcol = ~(~bitcol) WHERE bitcol != ~(~bitcol);
```

NB : PostgreSQL 9.4 ne recevra plus de correctifs après le 13 février 2020. Voir notre politique de versionnement pour plus d'informations.

---

## Liens

* [Téléchargement](https://www.postgresql.org/download/)
* [Notes de versions](https://www.postgresql.org/docs/current/release.html)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/) 
* [Remontez un bug](https://www.postgresql.org/account/submitbug/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)

