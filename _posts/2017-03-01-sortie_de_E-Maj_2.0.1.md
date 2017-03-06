---
layout: post
title: Sortie de E-Maj 2.0.1 
author: Philippe Beaudoin
twitter_id:
github_id: beaud76
tags: [PostgreSQL, emaj, audit-log, flashback, logical rollback, log trigger, table log]
---

La version 2.0.1 de l'extension PostgreSQL E-Maj vient de sortir.

Cette version mineure corrige essentiellement un bug dans la procédure d'upgrade de la version précédente. 

Mais la "vraie" nouveauté touche à la documentation. Celle-ci est maintenant disponible en ligne, en français comme en anglais, sur [https://emaj.readthedocs.io/fr/latest/index.html](https://emaj.readthedocs.io/fr/latest/index.html).

<!--MORE-->

E-Maj, acronyme de "Enregistrement des Mises à jour", est une extension de PostgreSQL qui permet de tracer les mises à jour du contenu de tables applicatives (INSERT/UPDATE/DELETE) à des fins d'examen ou d'annulation. Ceci permet de faire voyager dans le temps tout ou partie d'une base de données, avec une granularité de niveau table. Idéal notamment pour les environnements de test, E-Maj permet de limiter les sauvegardes intermédiaires coûteuses en temps et en espace disque. Une interface graphique sous la forme d'un plugin pour phpPgAdmin facilite les opérations pour les utilisateurs.

Soutenu par Dalibo, E-Maj est disponible en Open Source sur pgxn [https://pgxn.org/dist/e-maj/](https://pgxn.org/dist/e-maj/). Les sources sont accessibles sur github [https://github.com/beaud76/emaj](https://github.com/beaud76/emaj) et [https://github.com/beaud76/emaj_ppa_plugin](https://github.com/beaud76/emaj_ppa_plugin).

Toute contribution est la bienvenue, via github par exemple.

