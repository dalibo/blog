---
layout: post
title: Sortie de E-Maj v3.0
author: Philippe Beaudoin, Laura Ricci
twitter_id: dalibolabs
github_id: dalibo
tags: [dalibolabs, emaj, maj, update, postgresql, tables, version]
---

---

*Paris, le 1er avril 2019*

E-Maj, la solution permettant de "faire voyager les données PostgreSQL dans le temps"... (re)découvrez ses fonctionnalités et les nouveautés de sa version 3.0 !

<!--MORE-->

![logo-emaj](https://raw.githubusercontent.com/dalibo/blog/article_e-maj_v3/img/E-Maj_H_couleur.png)

"Faire voyager dans le temps"... Pour en présenter les fonctionnalités de manière moins… emphatique, disons qu’il s’agit de **capturer les mises à jour effectuées sur des tables relationnelles**, par les habituelles requêtes INSERT/UPDATE/DELETE, afin de pouvoir les dénombrer, les examiner et potentiellement les annuler.
      
## Les particularités d'E-Maj

Il existe plusieurs extensions de PostgreSQL qui permettent de tracer voire annuler les mises à jour de tables. 
Mais E-Maj s’en distingue, notamment par les caractéristiques suivantes :
  * pour garantir une intégrité fonctionnelle des données, l’utilisateur manipule des ensembles cohérents de tables, appelés **"groupes de tables"**,
  * un groupe de tables peut aussi contenir des **séquences**,
  * les **annulations** de mises à jour peuvent elles-mêmes être annulées,
  * il est possible également de générer des **scripts SQL** rejouant les mises à jour,
  * un client graphique web, **Emaj_web**, en facilite grandement l’usage.

La solution E-Maj peut se révéler très utile aussi bien en développement (Build) pour fluidifier les tests applicatifs, qu’en production (Run) pour sécuriser des traitements lourds par exemple.

## La version 3.0

La sortie de la version 3.0 marque une étape importante dans la vie de ce projet Open Source. 
Peu de fonctionnalités ont été ajoutées à la version précédente. En revanche :
  * cette version signe l’entrée d’E-Maj dans la constellation **DaliboLabs**, marquant ainsi le support actif de Dalibo au projet, et une ouverture plus grande aux contributions extérieures,
  * le client Emaj_web a été profondément remanié et l’**ergonomie** en a été sensiblement améliorée,
  * E-Maj peut maintenant être installé dans des environnements de **cloud public** de type PGaaS, tel qu’Amazon RDS.
  
## Liens importants
    
 * la documentation est en ligne sur [ReadTheDocs](http://emaj.readthedocs.io/fr/latest/),
 * vous pouvez télécharger cette version E-Maj sur [PGXN](http://pgxn.org/dist/e-maj/),
 * le dépôt de l’extension PostgreSQL sur [github](https://github.com/dalibo/emaj),
 * le client web Emaj_web est disponible sur [github](https://github.com/dalibo/emaj_web).
