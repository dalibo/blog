---
layout: post
title: temboard - find out about the 3.0 version!
author: Léo Cossic, Laura Ricci
twitter_id: dalibolabs
github_id: dalibo
tags: [temboard, opensource, postgresql, instances, administration, gestion, manage, supervision, manager, outil, tool, software, version, 3.0]
---

Paris, March 21st 2019

Release of **temboard 3.0**, the powerful PostgreSQL management tool developed inside Dalibo Labs!

<!--MORE-->

![logo-temboard](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/temboard-bandeau-orange-catchphrase-ombre.png)


## New feature: Maintenance

The maintenance plugin gives the users an **overview** on the databases, **schemas**, **tables** or **indexes** respective sizes.
It is very useful to get information about bloat and toast. It **helps users determine potential issues** and understand or **prevent performance issues** due to unaccordingly used space. The plugin also provides easy access to maintenance actions such as VACUUM, ANALYZE or REINDEX in order to fix space or performance problems.


## Enhancement of the interface

temboard’s interface is still improving. The 3.0 version lays out the instances as a grid on the homepage in order to better manage large database fleet. The sidebar is now collapsible to put forward the page's content. Moreover the homepage and the *dashboard* can be displayed in full screen mode which is more suitable when using a supervision screen.


## And more...

Many other improvements and bug fixes are included, among which:
   * Limit double authentication to not read only APIs,
   * New monitoring probes: replication lag and connection, temporary files,
   * Show number of waiting/blocking req in activity tabs,
   * `pg_hba.conf` and `pg_ident.conf` edition removed from pgconf plugin.

More about this version's [CHANGELOG](https://temboard.readthedocs.io/en/latest/CHANGELOG/).


## An easier installation

Installing temboard and its agent is simpler thanks to its auto configuration script and clean documentation. The rpm and debian packages are available in the Dalibo Labs deposits.
Find out more information in the [online documentation of temboard](https://temboard.readthedocs.io/en/v3/).


## Demo



## Links
  * Website: [http://dali.bo/temboard](http://dali.bo/temboard)
  * Documentation: [https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/](https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/)
  * GitHub: [https://github.com/dalibo/temboard](https://github.com/dalibo/temboard)


**temboard is mainly developed by Julien Tachoires, Étienne Bersac and Pierre Giraud.**
