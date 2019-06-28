---
layout: post
title: Sortie de la beta de PAF v2.2.0
author: Léo Cossic
twitter_id: dalibolabs
github_id: dalibo
tags: [paf, postgresql, automatic, failover, release]

---

*Paris, le 27 juin 2017*


Le 26 juin 2017, est sortie une version beta de l'outil opensource PostgreSQL Automatic Failover (PAF) v2.2.0, lisez l'article pour en apprendre davantage sur ce release.


<!--MORE-->


**Attention**: cette version est compatible avec les versions de Pacemaker 1.1.13 minimum et Corosync 2.0 minimum.

N'hésitez pas à tester et rapporter tout problème rencontré sur github: https://github.com/dalibo/PAF/issues

Vous trouverez les sources et paquets RPM ou Debian sur l'annonce officielle: https://github.com/dalibo/PAF/releases/tag/v2.2_beta1

**/!\ NE PAS UTILISER EN PRODUCTION**

------


__Modifications depuis la version 2.1:__

* nouveauté: supporte PostgreSQL 10
* nouveauté: ajout du paramètre `maxlag` pour exclure les esclaves trop en retard par rapport à la production (Thomas Reiss)
* nouveauté: supporte plusieurs cluster PostgreSQL différents dans le même cluster
* nouveauté: affiche des messages d'erreur compréhensifs dans l'outil crm_mon
* correction: ajout de documentation à la page MAN de pgsqlms
* correction: suit la règle de dénomination des agents pour le nom et l'emplacement de la page MAN
* correction: n'utilise plus `crm_failcount`, tel que suggéré par les développeurs Pacemaker sur les listes clusterlabs
* divers: amélioration du packaging RPM et Debian
* divers: vérification de la compatibilité Pacemaker
* divers: amélioration du processus d'élection en y incluant la comparaison des timelines
* divers: différents nétoyages du code, factorisation et amélioration des modules

Consultez la documentation à l'adresse suivante: http://dalibo.github.io/PAF/documentation.html
