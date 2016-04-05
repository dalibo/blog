---
layout: post
title: Mises à jour mineures de PostgreSQL 9.5.2, 9.4.7, 9.3.12, 9.2.16 et 9.1.21
author: Julien Tachoires
twitter_id: _julmon_  
github_id: julmon
tags: [PostgreSQL, annonce]

---
*Paris, le 5 avril 2016*

Le PostgreSQL Global Development Group a publié une mise à jour de toutes les versions supportées du SGBD, incluant les versions 9.5.2, 9.4.7, 9.3.12, 9.2.16, et 9.1.21. Ces versions mineures corrigent deux problèmes de sécurité et un problème de corruption d'index dans la version 9.5. Elles comprennent également des corrections de bogues. Les utilisateurs de PostgreSQL 9.5.0 ou 9.5.1 doivent appliquer la mise à jour dès que possible.


<!--MORE-->

## Corrections de sécurité pour RLS et BRIN

Cette publication clôt la faille de sécurité [CVE-2016-2193](https://access.redhat.com/security/cve/CVE-2016-2193), où un plan d'exécution peut être réutilisé par plus d'un rôle dans une même session. Ceci peut entraîner une mauvaise utilisation des politiques Row Level Security (RLS).

Cette mise à jour corrige aussi [CVE-2016-3065](https://access.redhat.com/security/cve/CVE-2016-3065), l'utilisation du module pageinspect sur des pages d'index BRIN peut entraîner un plantage du serveur. Tant qu'un attaquant pourra accéder à des octets de la mémoire du serveur, ce plantage sera considéré comme une faille de sécurité.

## "clés abrégées" (Abbreviated Keys) et corruption d'index

Dans cette mise à jour, les développeurs PostgreSQL ont été contraints de désactiver les "clés abrégées" pour plusieurs types d'index de la version 9.5 suite à des corruptions rapportées. Les index de type B-tree sont affectés sur les types de colonnes TEXT, VARCHAR, et CHAR qui ne sont pas dans la locale "C". Les index dans les autres locales perdront le gain en performance apporté par cette fonctionnalité et devront être ré-indexés dans le cas où une corruption d'index est présente. Cette fonctionnalité sera ré-activée dans les prochaines versions si une solution est trouvée. Pour plus d'information, consultez les notes de versions et la page wiki sur ce problème.
[https://wiki.postgresql.org/wiki/Abbreviatedkeys_issue](https://wiki.postgresql.org/wiki/Abbreviatedkeys_issue)

## Autres correctifs et améliorations

En plus des corrections indiquées ci-dessus, de nombreuses corrections de problèmes rapportés par les utilisateurs ces derniers mois ont été incluses. Ceci inclut notamment celles qui touchent plusieurs versions de PostgreSQL telles que :

  * Correction de deux problèmes sur la comparaison de ROW() indexées
  * Éviter une perte de données due au renommage de fichiers
  * Prévention d'une erreur lors de la revérification de lignes dans SELECT FOR UPDATE/SHARE
  * Corrige un problème dans plusieurs fonctions json_ et jsonb_
  * Correction de la journalisation des attentes de verrou pour INSERT ON CONFLICT
  * Ignorer recovery_min_apply_delay tant que le serveur n'a pas atteint un état consistant
  * Correction d'un problème de bouclage XID avec pg_subtrans
  * Correction de problèmes dans la réplication logique
  * Correction du planificateur avec les barrières de sécurité imbriquées
  * Prévention d'une fuite mémoire sur les index GIN
  * Correction de deux problèmes sur les dictionnaires ispell
  * Éviter un plantage sur les anciennes versions de Windows
  * Éviter la création d'un script de suppression erroné avec pg_upgrade
  * Fait en sorte que l'interprétation des tableaux vides en PL/Perl soit correcte
  * Fait en sorte que PL/Python gère correctement les noms d'identifiants

Cette mise à jour contient aussi une mise à jour des tzdata 2016c pour l'Azerbaïdjan, le Chili, la Palestine, la Russie et des corrections historiques pour d'autres régions.

## Mise à jour

Les utilisateurs de la version 9.5 doivent reconstruire tous les index créés sur des colonnes contenant des données de type caractère sur des locales non C. Les utilisateurs des autres versions de PostgreSQL qui ont sauté plusieurs mises à jour mineures peuvent avoir besoin de réaliser des opérations après mise à jour. Voir les notes de version pour les détails.

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres versions mineures, les utilisateurs n'ont pas besoin de décharger et recharger leur base ou utiliser pg_upgrade pour appliquer cette mise à jour; vous pouvez simplement éteindre PostgreSQL et mettre à jour ses binaires.

