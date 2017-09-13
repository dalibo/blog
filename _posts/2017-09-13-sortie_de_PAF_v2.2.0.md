---
layout: post
title: Sortie de PAF version 2.2.0 
author: Jehan-Guillaume de Rorthais, Léo Cossic
twitter_id: Dalibo
github_id: Dalibo
tags: [PostgreSQL, Automatic, Failover, PAF, sortie, release]

---

---
*Lyon, 13 septembre 2017*

PostgreSQL Automatic Failover (PAF) est un outil de haute disponibilité pour PostgreSQL, reposant sur Pacemaker et Corosync.
L’outil est capable de détecter des erreurs sur différents services et décider de manière automatique de basculer la ressource défaillante vers un autre nœud lorsque c’est possible.

<!--MORE-->

Son objectif principal est de tracer une ligne claire entre l'administration de PostgreSQL et sa mise en haute disponbilité grâce à Pacemaker. Cet objectif permet de conserver un projet clair, simple, documenté et puissant.

**Attention:** Cette version est uniquement compatible avec la v1.1.13+ de Pacemaker en utilisant un paquet corosync 2.x. 

**Changelog depuis la version 2.1:**

* nouveau: supporte PostgreSQL 10
* nouveau: ajout des paramètres maxlag pour exclure les esclaves lents de toute promotion, Thomas Reiss
* nouveau: support de multiple ressources pgsqlms dans le même cluster
* nouveauté: affiche des messages d'erreur compréhensifs dans l'outil crm_mon
* correction: ajout de documentation à la page MAN de pgsqlms
* correction: suit la règle de dénomination des agents pour le nom et l'emplacement de la page MAN
* correction: n'utilise plus crm_failcount, tel que suggéré par les développeurs Pacemaker sur les listes clusterlabs
* divers: amélioration du packaging RPM et Debian
* divers: vérification de la compatibilité Pacemaker
* divers: amélioration du processus d'élection en y incluant la comparaison des timelines
* divers: différents nétoyages du code, factorisation et amélioration des modules

__Vous trouverez la documentation, des procédures et le support communautaire à ces liens:__

* Consultez la documentation: http://dalibo.github.io/PAF/documentation.html
* Installez PAF: http://dalibo.github.io/PAF/ 
* Participez au support: https://github.com/dalibo/PAF/issues

Pour toute question technique, le projet recommande d'utiliser les listes pgsql-general@postgresql.org ou users@clusterlabs.org.
