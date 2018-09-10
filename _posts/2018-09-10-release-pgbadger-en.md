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


This release of pgBadger is a major release that adds some new features and fix all issues reported by users since last release. Every one should upgrade.


  * Add support of pgbouncer syslog log file format.
  * Add support to all auto_explain format (text, xml, json and yaml).
  * Add support to %q placeholder in log_line_prefix.
  * Add jsonlog format of Michael Paquier extension, with -f jsonlog
    pgbadger will be able to parse the log.
  * Replace the SQL formatter/beautify with v3.0 of pgFormatter.


There is some new command line options:

  - Add --prettify-json command line option to prettify JSON output.
  - Add --log-timezone  +/-XX  command line option to set the number
    of hours from GMT of the timezone that must be used to adjust
    date/time read from log file before beeing parsed. Note that you
    might still need to adjust the graph timezone using -Z when the
    client has not the same timezone.
  - Add --include-time option to add the ability to choose times that
    you want to see, instead of excluding all the times you do not
    want to see (--exclude-time).

The pgBadger project and copyrights has been transferred from Dalibo
to the author and official maintainer of the project. Please update
your links:

  - Web site: http://pgbadger.darold.net/
  - Source code: https://github.com/darold/pgbadger
