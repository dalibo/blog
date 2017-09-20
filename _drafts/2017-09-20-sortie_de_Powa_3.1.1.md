---
layout: post
title: Sortie de PoWA 3.1.1
author: Julien Rouhaud, Léo Cossic
twitter_id: rjuju123
github_id: Dalibo
tags: [PostgreSQL, Workload, analyser, release, sortie, version]
---

---
*Paris, le 20 septembre 2017*

PoWA est un extension PostgreSQL d'analyse de charge (similaire à AWR pour Oracle). PoWA collecte et stocke les données sur l’utilisation de vos bases et permet de mettre en relation les requêtes effectuées avec les ressources utilisées.

<!--MORE-->

Correction de bug:

  * Correction de codes risqué grâce à sighup handler (Andreas Seltenreich, Julien Rouhaud)
  * Vérification de l'attente de powa.frequency entre deux apperçus (Marc Cousin, Julien Rouhaud)
  * Correction de la portabilité vers win32 de compute_powa_frequency (Julien Rouhaud)
  * Ne pas essayer de lire dbentry->tables si c'est NULL (Julien Rouhaud)
  * Correction de la compilation pour les platformes avec HAVE_CLOCK_GETTIME (Julien Rouhaud, signalé par Maxence Ahlouche)

Miscellaneous

  * Ajout de la compatibilité PostgreSQL 10 (Julien Rouhaud)
  * Une seule éxécution des fonctions powa_stat (Julien Rouhaud)

Pour signaler un problème, utilisez le système de correction de bug disponible sur la page github du projet: [https://github.com/dalibo/powa](https://github.com/dalibo/powa)
