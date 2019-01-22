---
layout: post
title: New Official RPM packages for SUSE SLES
author: Damien clochard
twitter_id: daamien
github_id: daamien
tags: [postgresql, Linux, SUSE, SLES]
---

---
*Paris, November 8th 2017* 


From now on, PostgreSQL community will offer a RPM package repository for SUSE SLES 12 distribution on <https://zypp.postgresql.org/>.
This new repo contains packages for version 9.5, 9.6 and 10 of PostgreSQL, as well as multiple associated tools such as pgAdmin4, PostGIS, etc.

<!--MORE-->

For years, PostgreSQL community offered official DEB packages for Debian and Ubuntu via <https://apt.postgresql.org> and RPM packages for RedHat and centOS on <https://yum.postgresql.org>.

This additional SLES repo contains almost every package one can find on the YUM repo: versions 10, 9.6 and 9.5 are supported as well as about a hundred additionnal pieces of software and tools: for instance, tools produced or supported by Dalibo such as [pgBadger](https://dalibo.github.io/pgbadger/), 
[PoWA](https://dalibo.github.io/powa/), 
[emaj](https://github.com/beaud76/emaj), 
[HypoPG](https://dalibo.github.io/hypopg/) and 
[pg_activity](https://github.com/julmon/pg_activity).


The complete list of tools is available here: <https://zypp.postgresql.org/news-packagelist.php>


To use these SLES repos, you can rely on this ["How To"](https://zypp.postgresql.org/howtozypp.php).


These new packages and this SLES repo are maintained by [Devrim Gündüz](https://twitter.com/devrimgunduz), with support of [EnterpriseDB](https://www.enterprisedb.com/). We all thank him a lot for all the work he has done to offer RPM packages to the PostgreSQL community.
