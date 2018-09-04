---
layout: post
title: Release - temboard v2.0 features Alerting
author: Julien Tachoires, Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, temboard, foss, floss, version, 2, release, 2018]
---

---

*Paris, le 6 septembre 2018*

La nouvelle version de temboard inclut une toute nouvelle fonctionalité, l'Alerting ! 

<!--MORE-->

En cette rentrée 2018, nos développeurs [Julien Tachoires](https://github.com/julmon), [Étienne Bersac](https://github.com/bersace) et [Pierre Giraud](https://github.com/pgiraud) sortent la version 2.0 de notre outil de **gestion PostgreSQL** préféré : **temboard**.
Cette nouvelle version inclut l'alerting, une nouvelle fonctionnalitée très attendue. L'alerting est intégré dans le plugin de `monitoring` de temboard et vous permet de mettre en place des alertes sur vos données sondées par l'agent temboard : dès lors qu'une métrique dépasse un seuil choisit au préalable (ou pré-configuré par temboard), la donnée en question apparaitra en Orange ("Warning" = Attention) ou en rouge (Critical = Critique).

![alerting-dashboard](https://raw.githubusercontent.com/dalibo/blog/temboard2.0/img/alerting_dashboard.png)
