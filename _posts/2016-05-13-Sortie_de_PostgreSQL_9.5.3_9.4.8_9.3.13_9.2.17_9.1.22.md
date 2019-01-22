---
layout: post
title: Sortie de PostgreSQL 9.5.3, 9.4.8, 9.3.13, 9.2.17 et 9.1.22
author: Thomas Reiss
twitter_id: dalibo
github_id: dalibo
tags: [PostgreSQL, sécurité, upgrade]

---

---
*Paris, le 13 mai 2016*

Le PostgreSQL Global Development Group a publié une mise à jour de toutes les versions supportées du SGBD, incluant les versions 9.5.3, 9.4.8, 9.3.13, 9.2.17 and 9.1.22. Ces versions mineures corrigent un certain nombre de problèmes découverts par les utilisateurs sur les deux derniers mois. Les utilisateurs touchés par les problèmes corrigés sont invités à mettre à jour leur installation immédiatement; les autres doivent planifier la mise à jour dès que possible.

<!--MORE-->

## Corrections de bugs et améliorations

Cette mise à jour corrige plusieurs problèmes qui provoquent des indisponibilités pour les utilisateurs :

* Suppression de la file d'erreur OpenSSL avant un appel à OpenSSL, pour éviter des erreurs sur les connexions SSL, en particulier en utilisant les wrappers OpenSSL Python, Ruby ou PHP
* Correction de l'optimiseur pour éviter des erreurs de type "failed to build N-way joins"
* Correction sur la gestion des équivalences dans des plans d'exécution utilisant plusieurs Nested Loop, qui peuvent retourner des lignes qui ne correspondaient pas à la clause WHERE
* Correction de deux fuites mémoires lors de l'utilisation d'index GIN, dont une pouvant potentiellement entraîner des corruptions d'index

Cette mise à jour inclut également des corrections pour des problèmes reportés, dont la plupart affectent toutes les versions supportées :

* Correction d'erreurs de parsing lorsque le paramètre operator_precedence_warning est activé
* Correction d'un possible mauvais comportement de la fonction to_timestamp() avec les codes TH, th et Y,YYY
* Correction de l'export des vues et des règles qui utilisent ANY (array) dans un sous-SELECT
* Interdiction d'utiliser un caractère retour-chariot dans la valeur d'un paramètre avec ALTER SYSTEM
* Correction de différents problèmes liés à la suppression du lien symbolique vers un tablespace
* Correction d'un plantage du décodage logique sur certaines plate-formes sensibles à l'alignement des données
* Suppression des demandes répétées de retour du destinataire lors de l'arrêt du processus walsender
* Correction de plusieurs problèmes de pg_upgrade
* Ajout du support de la compilation avec Visual Studio 2015

Cette publication contient aussi la version 2016d de tzdata, qui réalise les mises à jour des timezones pour la Russie, le Venezuela, Kirov, Tomsk.

## Mise à jour

Les mises à jours mineures sont cumulatives. Comme avec les autres versions mineures, les utilisateurs n'ont pas besoin de sauvegarder et restaurer les bases de données ou d'utiliser pg_upgrade pour mettre en place cette mise à jour. Vous pouvez simplement arrêter PostgreSQL, mettre à jour les binaires et le redémarrer. Les utilisateurs qui ont ignoré plusieurs mises à jour mineures peuvent avoir besoin de réaliser des opérations après mise à jour. Voir les notes de version pour les détails.

## Liens

* Téléchargement: [https://postgresql.org/download](https://postgresql.org/download)
* Notes de version: [https://www.postgresql.org/docs/current/static/release.html](https://www.postgresql.org/docs
/current/static/release.html)


