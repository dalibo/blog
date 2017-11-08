---
layout: post
title: Nouveaux paquets RPM officiels pour SUSE SLES
author: Damien clochard
twitter_id: daamien
github_id: daamien
tags: [postgresql, Linux, SUSE, SLES]

---

La communauté PostgreSQL propose désormais un dépôt de paquets RPM pour la
distribution SUSE SLES 12 sur <https://zypp.postgresql.org/>.

Ce nouveau dépôt contient des paquets pour les versions 9.5, 9.6 et 10 de
Postgres, ainsi que de nombreux outils associés : pgAdmin4, PostGIS, etc.

<!--MORE-->

Depuis des années, la communauté PostgreSQL fournit des paquets DEB officiels 
pour Debian et Ubuntu via <https://apt.postgresql.org> et des paquets RPM 
pour Red Hat / CentOS sur <https://yum.postgresql.org>.

Ce dépot SLES supplémentaire contient quasiment tous les paquets que l'on trouve
déja dans le dépôt YUM : les versions 10, 9.6 et 9.5 sont supportés ainsi qu'une 
centaine de logiciels additionnels, notamment des outils produits ou soutenus
par Dalibo comme [pgBadger](http://dalibo.github.io/pgbadger/), 
[PoWA](http://dalibo.github.io/powa/), 
[emaj](https://github.com/beaud76/emaj), 
[HypoPG](http://dalibo.github.io/hypopg/), 
[pg_activity](https://github.com/julmon/pg_activity)

La liste complète des logiciels distribués est disponible ici:
<https://zypp.postgresql.org/news-packagelist.php>

Pour utiliser ce dépôt SLES, vous pouvez vous reporter à un 
["How To" détaillé](https://zypp.postgresql.org/howtozypp.php) .

Ces nouveaux paquets et ce dépot SLES sont maintenus par 
[Devrim Gündüz](https://twitter.com/devrimgunduz) avec le soutien 
d'[EnterpriseDB](https://www.enterprisedb.com/). Profitons ce billet pour le
remercier pour tout le travail qu'il accomplit pour fournir des paquets RPM à la
communauté PostgreSQL !

---

From now on, PostgreSQL community will offer a RPM packet repository for SUSE SLES 12 distribution on <https://zypp.postgresql.org/>.
This new repo contains packets for version 9.5, 9.6 adn 10 of PostgreSQL, as well as multiple associated tools such as pgAdmin4, PostGIS, etc.

For years, PostgreSQL community offered official DEB packets for Debian and Ubuntu via <https://apt.postgresql.org> and RPM packets for RedHat and centOS on <https://yum.postgresql.org>.

This additionnal SLES repo contains almost every packet one can find on the YUM repo: versions 10, 9.6 and 9.5 are supported as well as around a hundred addiotionnal pieces of software and tools: for instance, tools produiced or supported by Dalibo such as [pgBadger](http://dalibo.github.io/pgbadger/), 
[PoWA](http://dalibo.github.io/powa/), 
[emaj](https://github.com/beaud76/emaj), 
[HypoPG](http://dalibo.github.io/hypopg/) and 
[pg_activity](https://github.com/julmon/pg_activity).
The complete list of tools is available here: <https://zypp.postgresql.org/news-packagelist.php>


To use these SLES repos, you can rely on this ["How To"](https://zypp.postgresql.org/howtozypp.php).


These new packets and this SLES repo are maintained by [Devrim Gündüz](https://twitter.com/devrimgunduz), with support of [EnterpriseDB](https://www.enterprisedb.com/). We all thank him a lot for all the work he has done to offer RPM packets to the PostgreSQL community.
