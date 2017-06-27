---
layout: post
title: Sortie de la beta de PAF v2.2.0
author: Léo Cossic
twitter_id: dalibolabs
github_id: dalibo
tags: [PAF, postgresql, automatic, failover, release, dalibolabs]

---

*Paris, le 27 juin 2017*

Le 26 juin 2017, est sortie une version beta de l'outil PAF v2.2.0, lisez l'article pour en apprendre davantage sur ce release.

<!--MORE-->

Attention: Cette version est uniquement compatible avec Pacemaker version 1.1.13 au minimum, en utilisant un paquet corosync version 2.x.

N'hésitez pas à tester et rapporter tout problème rencontré sur github: https://github.com/dalibo/PAF/issues

/!\ NE PAS UTILISER EN PRODUCTION

Modifications depuis la version 2.1:

    nouveauté: supporte PostgreSQL 10
    nouveauté: ajout du paramètre maxlag pour exclure les esclaves lents de la production, Thomas Reiss
    nouveauté: support pour plusieurs ressources pgsqlms dans le même cluster
    nouveauté: prévoit des messages d'erreur compréhensifs au crm_mon
    Correction: suit la règle de dénomination  de la page MAN de l'agent ressource
    Correction: ajout de documentation à la page MAN de pgsqlms
    Correction: ne s'appuie/dépend plus sur crm_failcount, suggéré sur les listes clusterlabs
    Divers: amélioration du packaging RPM
    Divers: vérification de la compatibilité Pacemaker et de l'assemblage des ressources
    Divers: amélioration du processus d'élection en y incluant la comparaison des timelines
    Divers: différents nétoyages du code, factorisation et amélioration des modules

Consultez la documentation à l'adresse suivante: http://dalibo.github.io/PAF/documentation.html
