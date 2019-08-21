---
layout: post
title: Sortie de PostgreSQL 9.4.3
author: Damien  Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, sécurité, upgrade, 9]

---
*Paris, le 4 juin 2015*


Le PostgreSQL Global Development Group a publié une mise à jour de toutes les versions supportées du SGBD, incluant les versions 9.4.3, 9.3.8, 9.2.12, 9.1.17 et 9.0.21. Ces versions corrigent principalement un problème d'échec au démarrage causé par la dernière mise à jour, et devraient être appliquées par tout utilisateur ayant appliqué la correction précédente. 

<!--MORE-->

## Correction des permissions de fichiers


Les correctifs publiés le 2015-05-22 ont introduit une mesure contre la corruption de données, qui force un fsync sur tous les fichiers présents dans le répertoire de données de PostgreSQL (PGDATA) lors d'un redémarrage après un crash. Ceci empêchait PostgreSQL de démarrer si celui-ci rencontrait un problème sur les permissions de fichiers. Ce problème est désormais réglé. Vous trouverez plus d'informations sur l'[annonce précédente](http://blog.dalibo.com/2015/05/27/Probleme_sur_les_mises_a_jours_de_PostgreSQL.html) ([Version originale](https://wiki.postgresql.org/wiki/May_2015_Fsync_Permissions_Bug) sur le wiki PostgreSQL)


## Autres correctifs

En plus du correctif ci-dessus, des problèmes mineurs ont été corrigés dans ces versions. Ceux-ci incluent:

* La fonction pg_get_functiondef() affiche désormais l'attribut LEAKPROOF
* La fonction pushJsonbValue() gère désormais le type jbvBinary.
* Il est désormais possible de compiler contre une version de Python threadée sous OpenBSD.



Planning des prochaines mises à jour
------------------------------------

Les développeurs PostgreSQL travaillent d'arrache-pied à la correction de quelques bugs découverts lors des dernières semaines. C'est pourquoi le PostgreSQL Global Development Group prévoit de publier une nouvelle mise à jour lorsque ces problèmes auront trouvé une solution satisfaisante et testée. Le projet PostgreSQL s'excuse pour tout désagrément causé par ces mises à jour fréquentes. La priorité est de publier aussi vite que possible les correctifs importants.


Mise à jour
-----------

Comme pour les autres versions mineures, les utilisateurs n'ont pas à sauvegarder et restaurer leur base de données ou à utiliser pg_upgrade pour appliquer cette mise à jour. Vous pouvez simplement arrêter PostgreSQL et mettre à jour ses binaires. Les utilisateurs n'ayant pas appliqué les précédentes mises à jour peuvent avoir d'autres actions à entreprendre: veuillez vous référer aux notes de version pour plus d'information:

http://www.postgresql.org/docs/current/static/release.html

