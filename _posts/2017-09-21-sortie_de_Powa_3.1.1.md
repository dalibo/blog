---
layout: post
title: Sortie de PoWA 3.1.1
author: Julien Rouhaud, Léo Cossic
twitter_id: rjuju123
github_id: Dalibo
tags: [postgresql, workload, analyser, release]
---

---
*Paris, le 21 septembre 2017*

PoWA est une extension PostgreSQL permettant de collecter et échantillonner des
données sur l'utilisation de vos base, afin de vous fournir une analyse en temps
réelle de la charge de votre instance, quelles sont les ressources consommés et
proposer des optimisations des requêtes les plus consommatrices.

<!--MORE-->

Correction de bug:

  * Correction d'un bug sur le gestionnaire de signal sighup (Andreas Seltenreich, Julien Rouhaud)
  * Vérification que la fréquence d'échantillonnage est réspecté entre deux snapshots (Marc Cousin, Julien Rouhaud)
  * Correction de la portabilité vers win32 de la fonction compute_powa_frequency
  * Vérification que dbentry->tables est valué avant de le lire
  * Correction de la compilation pour les platformes avec HAVE_CLOCK_GETTIME (signalé par Maxence Ahlouche)

Divers

  * Ajout de la compatibilité pour PostgreSQL 10
  * N'exécute qu'une seule fois les fonctions powa_stat par échantillonnage

Pour signaler un problème, utilisez le système de correction de bug disponible
sur la page github du projet:
[https://github.com/dalibo/powa](https://github.com/dalibo/powa)
