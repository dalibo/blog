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

Our developers [Julien Tachoires](https://github.com/julmon), [Étienne Bersac](https://github.com/bersace) and [Pierre Giraud](https://github.com/pgiraud) are releasing a new version (v2.0) of our favorite **PostgreSQL management** tool : **temboard**.

<!--MORE-->

## New feature : Alerting

This new version includes `alerting`, a very awaited feature. `Alerting` is part of the monitoring plugin, it allows you to compare values for monitored metrics with warning or critical thresholds. It then allows users to get notified if something gets wrong on the Postgres instance.
When activated, alerting can show some information on the dashboard page. First of all, the current status for the different probes are displayed.

![alerting-dashboard](https://raw.githubusercontent.com/dalibo/blog/temboard2.0/img/alerting_dashboard.png)

This new feature is accompagnied by some user interface improvements. A new `status` page gives a more detailed view on all monitored probes. 

By clicking on probe name, one can also get access to an even more detailed view for each probe. In this view, users will find:

   * the current status,
   * the thresholds values over time,
   * the values for the monitored probe over time,
   * the past alerts (ie. status change),
   * the time ranges for which the status was warning or critical or if the check was disabled.


## Useful links

   * Find the "How to Alerting" on the project's [ReadTheDocs](https://temboard.readthedocs.io/en/latest/temboard-howto-alerting/) page.
   * Find the update tutorial to install temboard's new version on the project's [ReadTheDocs](https://temboard.readthedocs.io/en/latest/temboard-upgrade-1.2-2.0/) page.
   * Follow the project on [Github](https://github.com/dalibo/temboard) and Twitter by following [Dalibo Labs](https://twitter.com/DaliboLabs).
