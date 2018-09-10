---
layout: post
title: Release - pgBadger v10.0 and status update
author: Léo Cossic, Gilles Darold
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, pgbadger, foss, floss, version, 10, 10.0, release, gilles, darold, 2018]
---

---

*Paris, september 10th 2018*

[Gilles Darold](http://www.darold.net/) released today version 10.0 of pgBadger, the PostgreSQL log analyzer built for speed with fully detailed reports and professional rendering. It outperform any other PostgreSQL log analyzer.

<!--MORE-->

## Release
This release of pgBadger is a major release(**Every one should upgrade**) that adds some new features and fixes all issues reported by users since the last release :

  * Add support of pgbouncer syslog log file format.
  * Add support to all auto_explain format (text, xml, json and yaml).
  * Add support to %q placeholder in log_line_prefix.
  * Add jsonlog format of Michael Paquier extension, with -f jsonlog
    pgbadger will be able to parse the log.
  * Replace the SQL formatter/beautify with v3.0 of pgFormatter.

## Changes in status
pgBadger is no longer part of [DaliboLabs](https://github.com/dalibo). Gilles Darold (the project's creator and maintainer) chose to reclaim the project's repository, management and copyright, to be able to maintain it on his own. The project was considered mature enough to leave the DaliboLabs familly.

DaliboLabs contributes to PostgreSQL by developing tools, writing articles and organizing community events. DaliboLabs benefits different projects by providing experienced developers and support on the tools' promotion. Once a project is considered mature enough, the major developer or team can ask for the project to regain it's total independence.

## New links to the project

 * Web site: http://pgbadger.darold.net/
 * Source code: https://github.com/darold/pgbadger
