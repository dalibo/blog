---
layout: post
title: temboard v2.0 introduit les Alertes
author: Julien Tachoires, Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, temboard, foss, floss, version, 2, release, 2018]
---

---

*Paris, le 6 septembre 2018*

En cette rentrée 2018, nos développeurs [Julien Tachoires](https://github.com/julmon), [Étienne Bersac](https://github.com/bersace) et [Pierre Giraud](https://github.com/pgiraud) sortent la version 2.0 de notre outil de **gestion PostgreSQL** préféré : **temboard**.

<!--MORE-->

## Nouvelle fontionnalité : les Alertes

Cette nouvelle version inclut les alertes, une nouvelle fonctionnalitée très attendue. Cette fonction est intégré dans le plugin de `monitoring` de temboard et vous permet de mettre en place des alertes sur vos données sondées par l'agent temboard : dès lors qu'une métrique dépasse un seuil choisit au préalable (ou pré-configuré par temboard), la donnée en question apparaitra en Orange ("Warning" = Attention) ou en rouge (Critical = Critique).

![alerting-dashboard](https://raw.githubusercontent.com/dalibo/blog/temboard2.0/img/alerting_dashboard.png)

Cette nouvelle fonctionnalité s'accompagne de **changements dans l'interface de l'outil**, afin de rendre l'utilisation plus intuitive et efficace pour l'utilisateur. Une page `Status` vous permet désormais de surveiller l'état de l'ensemble de vos données sondées avec davantage de précision. 

Lorsque temboard vous alerte qu'une **donnée sondée** dépasse (ou a dépassé) le seuil prévu au préalable, vous pouvez cliquer sur cette dernière pour **visualiser son état passé et courant**, grâce à des graphiques et un historique de l'état de la donnée sondée. Une fonctionnalité très pratique pour déterminer l'origine d'éventuels problèmes que vos bases de données peuvent recontrer.

## Liens utiles

   * Retrouvez le "How to Alerting" dans le [ReadTheDocs](https://temboard.readthedocs.io/en/latest/temboard-howto-alerting/) du projet temboard
   * Retrouver le tutoriel vous permettant de faire la mise à jour sur [ReadTheDocs](https://temboard.readthedocs.io/en/latest/temboard-upgrade-1.2-2.0/) également.
   * Suivez le projet sur [Github](https://github.com/dalibo/temboard) et Twitter en suivant [Dalibo Labs](https://twitter.com/DaliboLabs)
