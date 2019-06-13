---
layout: post
title: De retour du PGDay Belgique
author: Stefan Fercot
twitter_id: pgstef
github_id: pgstef
tags: [PostgreSQL, Communauté, Belgique]
---
*Paris, le 22 mai 2019*

Pour le premier PGDay organisé en Belgique par le 
[PgBE PostgreSQL Users Group Belgium](https://www.meetup.com/fr-FR/PostgresBE/), 
[cet](http://pgconf.be) événement a regroupé environ 40 fans de PostgreSQL ce 
17 mai dernier à Louvain. Ce fut réellement une très chouette journée et 
j'aimerais partager ce sentiment avec vous.

<!--MORE-->

-----

![pgday_be_2019_small](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/gday_be_2019_small.png)


Cette journée entièrement consacrée à PostgreSQL fut une belle opportunité 
pour rencontrer d'autres passionnés de PostgreSQL en Belgique. L’événement 
était vraiment destiné à tout le monde, des nouveaux utilisateurs, aux 
étudiants et aux experts.

Avec pas moins de 10 présentations, dont plusieurs en parallèle l'après-midi, 
la liste des orateurs était impressionnante, avec notamment de nombreux 
orateurs internationaux.

Après avoir appris quelques bons conseils auprès de Hans-Jürgen Schönig lors 
de sa présentation **Fixing common performance problems**, Ilya Kosmodemiansky 
nous a montré comment tout détruire avec quelques **PostgreSQL Worst practices**.

Durant l'après-midi, j'ai choisi de rester dans la salle principale. J'ai 
ainsi pu voir Thijs Lemmens nous démontrer comment procéder à des mises à jour 
de PostgreSQL en utilisant la réplication logique : 
[**Downtimeless PG upgrades using logical replication**](https://github.com/thijslemmens/pg-logical-replication-presentation).

En s'appuyant sur docker et docker-compose, il crée 2 serveurs PostgreSQL 
et installe pgAdmin 4 ainsi que HAProxy. Si vous souhaitez essayer la démo par 
vous-même, Thijs met à votre disposition tout le nécessaire sur son compte 
GitHub.

Tomas Vondra nous a ensuite expliqué à quoi sert 
[**Create statistics**](https://github.com/tvondra/create-statistics-talk) et 
quand l'utiliser. Il nous a aussi donné un rapide aperçu des évolutions à ce 
sujet dans la version 12. C'était réellement très intéressant d'avoir des 
exemples basés sur des villes belges.

Ensuite... la pression fut sur mes épaules pour parler de 
[Streaming Replication, the basics](https://pgstef.github.io/talks/en/20190517_pgconfBE_Streaming-Replication.reveal.pdf).
L'idée était de résumer aux débutants ce que sont les WALs (journaux de 
transactions), comment fonctionne la _Streaming Replication_ (réplication en 
flux) et donner quelques conseils et bonnes pratiques.

Boriss Mejías l'a ensuite réexpliqué, avec ses propres mots : **Replication, 
where things just work but you don't know how**. Même si nos deux présentations 
se chevauchaient légèrement, elles furent en fait plutôt complémentaires.

Malheureusement, j'ai raté :

* **Declarative Table Partitioning - What do I need it for?** de Boriss Mejías
* **Dynamically switch between datasources in code** de Marco Huygen
* **PostgreSQL Buffers** de Vik Fearing
* **Data Vault 2.0 & Pivotal Greenplum** de Joren Oris

Hans-Jürgen Schönig a ensuite raconté quelques cas les plus drôles et les plus 
intéressants qu'il a pu rencontrer au fil des ans. Ce fut une façon très 
sympathique de clôturer la journée.

L’événement était accueilli par l'Université de Louvain. L'endroit était super. 
Confortable, spacieux et très bien équipé pour les orateurs. J'ai vraiment 
apprécié y être.

A nouveau, 
[un chaleureux merci](https://twitter.com/the_hydrobiont/status/1129416778872958982) 
aux organisateurs, orateurs et participants pour avoir fait de cet événement 
une réalité !
