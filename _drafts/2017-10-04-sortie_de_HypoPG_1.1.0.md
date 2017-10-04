---
layout: post
title: Sortie de HypoPG v1.1.0
author: Julien Rouhaud, Léo Cossic
twitter_id: rjuju123
github_id: Dalibo
tags: [PostgreSQL, hypothetical, indexes, index, hypothétiques, sortie, version, hypopg]
---

---
*Paris, le 04 octobre 2017*

HypoPG est une extension PostgreSQL ajoutant des fonctionnalités d’index hypothétique. Un index hypothétique, ou virtuel, n’existe pas réellement, donc ne consomme aucune ressource ou CPU pour être créé. Ils sont utiles pour savoir si des index peuvent améliorer les performances de requêtes problématiques, car on peut savoir si PostgreSQL utiliserait ces index ou non, sans dépenser de ressources pour les créer.

<!--MORE-->

### Version 1.1.0:

**Nouvelles fonctionnalités:**
   * ajout du support des indexes hypothétiques en expression
   * ajout d'une fonction hypopg_get_indexdef() pour obtenir la définition d'un index hypothétique classé
  
**Correction de bug:**
    
   * n'accepte plus les indexes hypothétiques à une ou plusieur colonnes si le AM ne le supporte pas
   * n'accepte plus les indexes hypothétiques sur les "system columns" (excepté OID)
   * correction des indexes utilisant les close DESC et l'ordre par default NULLS (merci à Andrew Kane pour l'avertissement et le test)
   * correction du support de PostgreSQL 9.6+ (merci à Rob Stolarz pour le signalement)

**Divers:**
   * ajout du support de la version 10 de PostgreSQL



Pour signaler un problème, utilisez le système de correction de bug disponible
sur la page github du projet:
[https://github.com/dalibo/hypopg](https://github.com/dalibo/hypopg)
