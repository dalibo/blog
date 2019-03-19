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

## Changelog

   * Full screen mode for home page 
   * Full screen mode for dashboard 
   * Limit double authentication to not read only APIs 
   * Maintenance plugin 
   * Collapsible sidebar 
   * New monitoring probes: replication lag and connection, temporary files 
   * UI functional tests 
   * Support Tornado 4.4 and 5 
   * Add auto configuration script 
   * Show number of waiting/blocking req in activity tabs 
   * Show availability status on home page 
   * Dashboard like home page 
   * Improve activity views 
   * Review web framework 
   * Review debian packaging 
   * pg_hba.conf and pg_ident.conf edition removed from pgconf plugin 
   * Avoid monitoring data to get stuck in agent sending queue 
   * Documentation cleaning and updates 
   * Limit useless rollback statements on read only queries (repository database)
   
More about this version's changelog: [https://temboard.readthedocs.io/en/latest/CHANGELOG/](https://temboard.readthedocs.io/en/latest/CHANGELOG/)

## Demo

## Links
  * Website: [http://dali.bo/temboard](http://dali.bo/temboard)
  * Documentation: [https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/](https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/)
  * GitHub: [https://github.com/dalibo/temboard](https://github.com/dalibo/temboard)


**temboard is mainly developed by Julien Tachoires, Étienne Bersac and Pierre Giraud.**
