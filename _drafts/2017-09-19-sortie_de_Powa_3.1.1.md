---
layout: post
title: Sortie de PoWA 3.1.1
author: Julien Rouhaud, Léo Cossic
twitter_id: rjuju123
github_id: Dalibo
tags: [PostgreSQL, Workload, analyser, release, sortie, version]
---

---
Paris, le 19 septembre 2017

<!--MORE-->




Bugfix Correction de bug:

  * Correction de codes risqué grâce à sighup handler (Andreas Seltenreich, Julien Rouhaud)
  * Vérification de l'attente de powa.frequency entre deux apperçus (Marc Cousin, Julien Rouhaud)
  * 
    Fix unsafe coding with sighup handler
    Make sure we wait at least powa.frequency between two snapshot (Marc Cousin
    and Julien Rouhaud)
    Fix win32 portability of compute_powa_frequeny() (Julien Rouhaud)
    Don't try to read dbentry->tables if it's NULL (Julien Rouhaud)
    Fix compilation for platform with HAVE_CLOCK_GETTIME (Julien Rouhaud,
    reported by Maxence Ahlouche)

Miscellaneous

    Add pg10 Compatibility (Julien Rouhaud)
    Only execute once the powa_stat functions (Julien Rouhaud)


