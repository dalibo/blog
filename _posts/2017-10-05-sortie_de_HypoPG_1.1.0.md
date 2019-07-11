---
layout: post
title: Sortie de HypoPG v1.1.0
author: Julien Rouhaud, Léo Cossic
twitter_id: rjuju123
github_id: Dalibo
tags: [postgresql, index, hypothétique, release, hypopg]
---

---
*Paris, le 05 octobre 2017*

HypoPG est une extension pour PostgreSQL ajoutant la fonctionnalité d’index
hypothétique. Les index hypothétiques, ou virtuels, n’existent pas réellement,
donc ne consomment aucune ressource disque ou CPU pour être créés. Ils sont
utiles pour savoir si des index peuvent améliorer les performances de requêtes
problématiques, car on peut savoir si PostgreSQL utiliserait ces index ou non,
sans dépenser de ressources pour les créer.

<!--MORE-->

### Version 1.1.0:

**Nouvelles fonctionnalités:**

   * ajout du support des index hypothétiques sur expression
   * ajout d'une fonction `hypopg_get_indexdef()` pour obtenir la définition
     d'un index hypothétique précédemment créé

**Correction de bug:**

   * ol n'est plus possible de créer des index hypothétiques uniques, ou sur
     plusieurs colonnes si le type d'index ne le supporte pas
   * tout comme pour les index standard, il n'est plus possible de créer des
     index hypothétiques sur les colonnes systèmes (à l'exception d'OID)
   * correction des index utilisant une clause de tri DESC avec un ordre des
     valeurs NULL par default NULLS (merci à Andrew Kane pour le rapport de bug
     et le cas de test)
   * correction du support de PostgreSQL 9.6+ (merci à Rob Stolarz pour le
     rapport de bug)

**Divers:**

   * ajout du support pour la version 10 de PostgreSQL



Pour signaler un problème, utilisez le système de correction de bug disponible
sur la page github du projet:
[https://github.com/dalibo/hypopg](https://github.com/dalibo/hypopg)
