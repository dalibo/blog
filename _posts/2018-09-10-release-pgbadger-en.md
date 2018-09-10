---
layout: post
title: Release - temboard v2.0 features Alerting
author: Julien Tachoires, Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, temboard, foss, floss, version, 2, release, 2018]
---

---

*Paris, september 6th 2018*

[Gilles Darold](http://www.darold.net/) released today version 10.0 of pgBadger, the PostgreSQL log analyzer built for speed with fully detailed reports and professional rendering. It outperform any other PostgreSQL log analyzer.

<!--MORE-->

## Release
This release of pgBadger is a major release(**Every one should upgrade**) that adds some new features and fix all issues reported by users since last release :

  * Add support of pgbouncer syslog log file format.
  * Add support to all auto_explain format (text, xml, json and yaml).
  * Add support to %q placeholder in log_line_prefix.
  * Add jsonlog format of Michael Paquier extension, with -f jsonlog
    pgbadger will be able to parse the log.
  * Replace the SQL formatter/beautify with v3.0 of pgFormatter.

## Changes in status
pgBadger is no longer part of [DaliboLabs](https://github.com/dalibo). Gilles Darold (the project's creator and maintainer) chose to reclaim the project's repository, management and copyright, to be able to maintain it on his own. The project was considered mature enough to leave the DaliboLabs familly.

DaliboLabs contributes to PostgreSQL by developing tools, writing articles and organizing community events. Once a project is considered mature enough, the major developer or team can ask for the project to become independent.

## New links to the project

 * Web site: http://pgbadger.darold.net/
 * Source code: https://github.com/darold/pgbadger
