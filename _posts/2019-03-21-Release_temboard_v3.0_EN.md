---
layout: post
title: temboard - find out about the 3.0 version!
author: Léo Cossic, Laura Ricci
twitter_id: dalibolabs
github_id: dalibo
tags: [temboard, opensource, postgresql, instances, administration, gestion, manage, supervision, manager, outil, tool, software, version, 3.0]
---

Paris, March 21st 2019

Release of **temboard 3.0** version, the powerful PostgreSQL management tool! A new version of temboard is released today.

<!--MORE-->

## New feature: Maintenance

The aim of the maintenance plugin is to give the users an **overview** on the databases, **schemas**, **tables** or **indexes** respective size.

It's very useful to get information about bloat and toast. It can **help users determine potential issues** and understand or **prevent performance issues** due to unaccordingly used space. The plugin also provides easy access to maintenance actions such as VACUUM, ANALYZE or REINDEX in order to fix space or performances problems.

## Changelog

   * Full screen mode for home page 
   * Full screen mode for dashboard 
   * Limit double authentication to not read only APIs 
   * Maintenance plugin Collapsible sidebar 
   * New monitoring probes: replication lag and connection, temporary files UI functional tests 
   * Support Tornado 4.4 and 5 
   * Add auto configuration script Show number of waiting/blocking req in activity tabs Show availability status on home page Dashboard like home page Improve activity views Review web framework Review debian packaging pg_hba.conf and pg_ident.conf edition removed from pgconf plugin Avoid monitoring data to get stuck in agent sending queue Documentation cleaning and updates Limit useless rollback statements on read only queries (repository database)




## Links
    • Website: [http://dali.bo/temboard] 
    • Documentation: [https://temboard.readthedocs.io/en/latest/temboard-howto-maintenance/] 
    • ChangeLog: [https://temboard.readthedocs.io/en/latest/CHANGELOG/] 
    • GitHub: [https://github.com/dalibo/temboard] 


temboard is mainly developed by Julien Tachoires, Étienne Bersac and Pierre Giraud.
