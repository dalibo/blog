---
layout: post
title: Retour de la PGCON 2019
author: Thibaut Madelaine, Maël Rimbault
twitter_id: dalibo
github_id: dalibo
tags: [Dalibo, PostgreSQL, pgcon, conférences]
---

---

*Paris, le 2 septembre 2019*

Comme tous les ans, à Ottawa, plusieurs centaines de passionnés sont venus pour
assister à la conférence la plus importante du monde PostgreSQL : PGCon.

Pour la treizième fois, sur 4 jours, se sont succéder des sessions de travaux
pratiques aka *Tutorials*, des rencontres entre les développeurs principaux aka
*Developer Meeting* et *Unconference* et pas loin de 35 conférences.

<!--MORE-->

![2019_pgcon2019_dinner.jpg](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/2019_pgcon2019_dinner.png)  

## Les conférences

Les sujets abordés durant les conférences du PGCon sont très divers, elles sont
aussi souvent très pointues. Les nouvelles fonctionnalités de la version
majeure de l'année sont décortiquées. Les axes de développement pour les
futures versions sont débattus.

Cette année deux sujets ont particulièrement retenu notre attention :

  * Direct IO et Async IO
  * les Pluggable Table Storage

## Direct IO et Async IO

Il est apparu en 2018 que le noyau Linux ne se comportait pas comme on s'y
attendait : le
[`fsyncgate`](https://www.postgresql.org/message-id/flat/CAMsr%2BYHh%2B5Oq4xziwwoEfhoTZgr07vdGG%2Bhu%3D1adXx59aTeaoQ%40mail.gmail.com).
On pouvait tomber sur des cas d'erreurs d'écriture non remontées à
PostgreSQL. Ce problème a été mitigé dans les versions suivantes des noyaux
Linux et PostgreSQL, mais une correction complète n'est pas possible sans
changer le mode actuel d'écriture sur disque, le `buffered IO`.

D'autres modes d'écritures existent qui pourraient corriger le problème : le
`Direct IO` et le `Async IO`.

FIXME

https://www.dalibo.info/home/mael/public/pastebin/cr_pgcon_2019#dioasyncio

## les Pluggable Table Storage

FIXME

https://www.dalibo.info/home/mael/public/pastebin/cr_pgcon_2019#pluggable_table_storage

It was discussed how Postgres enabling Pluggable Access method framework can be
used to develop newer table access methods, so that users are not restricted to
Heap.

-----------------

**À propos de la PGCon :** 
PGCon est une conférence annuelle pour les utilisateurs et les développeurs de
PostgreSQL, une base de données relationnelle de premier plan, qui se trouve
être open source. PGCon est le lieu idéal pour se rencontrer, discuter, établir
des relations, acquérir des informations précieuses et discuter du travail que
vous faites avec PostgreSQL. Si vous voulez savoir pourquoi tant de gens se
déplacent vers PostgreSQL, PGCon sera le lieu pour le savoir. Que vous soyez un
utilisateur occasionnel ou que vous travaillez avec PostgreSQL depuis des
années, PGCon aura quelque chose à vous offrir.

**À propos de [Dalibo](https://dalibo.com/) :**
Depuis 2005, Dalibo est le spécialiste français de PostgreSQL et de ses logiciels satellites, mettant à la disposition de ses clients son savoir-faire dans le domaine des bases de données en offrant Support, Audits et conseils, Formations, Certification, et de nombreuses contributions à la communauté PostgreSQL.
