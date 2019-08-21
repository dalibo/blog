---
layout: post
title:  PostgreSQL, annonce de mise à jour de sécurité
author: Marc Cousin
github_id: marco44
tags: [PostgreSQL, sécurité, 9, upgrade]

---
*Paris, le 9 octobre 2015*

Le PostgreSQL Global Development Group a sorti une mise à jour de toutes les versions supportées de notre système de bases de données, les versions 9.4.5, 9.3.10, 9.2.14, 9.1.19 et 9.0.23. Cette mise à jour corrige deux problèmes de sécurité, ainsi que plusieurs bugs trouvés sur les quatre derniers mois. 
Les utilisateurs vulnérables aux problèmes de sécurité devraient mettre à jour leurs installations immédiatement; les autres devraient réaliser la mise à jour à la prochaine interruption de production planifiée. 
Cette version est aussi la dernière de la branche 9.0.


<!--MORE-->

## Correctifs de sécurité

Deux failles de sécurité ont été corrigées dans cette mise à jour, qui affectent les utilisateurs des fonctionnalités PostgreSQL suivantes:

CVE-2015-5289: les valeurs d'entrées json ou jsonb construites à partir de valeurs saisies par l'utilisateur peuvent faire planter le serveur PostgreSQL et causer un déni de service.

CVE-2015-5288: La fonction crypt() incluse dans l'extension optionnelle pgCrypto peut être exploitée pour lire quelques octets supplémentaires de mémoire. Il n'existe pas d'exploit pour ce problème pour le moment.

Le projet PostgreSQL remercie Josh Kupershmidt et Oskari Saarenmaa pour avoir rapporté ces problèmes.

Cette mise à jour désactive aussi la renégociation SSL par défaut; auparavant, elle était activée par défaut. La renégociation SSL sera entièrement supprimée des versions PostgreSQL 9.5 et ultérieures.

## Autres correctifs et mises à jour

En plus de ce qui précède, de nombreux problèmes ont été corrigés dans cette mise à jour, en fonction des bugs rapportés par nos utilisateurs sur les derniers mois. Ces correctifs sont les suivants:

  * Empêcher les regex, LIKE et SIMILAR profondement imbriqués de faire planter le serveur
  * Nombreux autres correctifs avec la gestion des expressions régulières
  * S'assurer que ALTER TABLE acquiert tous les verrous nécessaires pour les modifications de contraintes
  * Corriger le nettoyage des sous-transactions quand un curseur échoue, empêchant un plantage
  * Se protéger d'un deadlock (interblocage) durant l'insertion dans le WAL quand commit_delay est positionné
  * Corriger le verrouillage durant la mise à jour des vues modifiables
  * Se prémunir de la corruption du cache de relations (init file)
  * Améliorer les performances des résultats de requêtes SPI (dans les procédures stockées) de grande taille
  * Améliorer le temps de démarrage de LISTEN
  * Désactiver la renégociation SSL par défaut
  * Réduire le minimum pour les paramètres *_freeze_max_age
  * Limiter le maximum pour wal_buffers à 2GB
  * Se prémunir contre de possibles dépassements de pile
  * Corriger la gestion de DOW et DOY dans les entrées datetime
  * Rendre plus réactive l'annulation des requêtes utilisant des expressions régulières
  * Corriger différents bugs de l'optimiseur
  * Corriger plusieurs problèmes à l'extinction dans le postmaster
  * Rendre l'autovacuum anti-wrapparound (bouclage du numéro de transaction) plus robuste
  * Corriger des bugs mineurs dans les indexes GIN et SP-GiST
  * Corriger plusieurs problèmes avec PL/Python, PL/Perl et PL/Tcl
  * Améliorer le garbage collection (nettoyage des entrées mortes) de pg_stat_statements
  * Améliorer la gestion des collations de pgsql_fdw
  * Améliorer la gestion par la libpq, des problèmes d'out of memory
  * Empêche un plantage de psql quand il n'y a pas de connection courante
  * Plusieurs correctifs à pg_dump, dont des problèmes de permissions sur les fichiers et les objets
  * Correction de problèmes de support des plateformes Alpha, PPC, AIX et Solaris
  * Correction d'un problème de démarrage sur Windows avec une locale Chinoise
  * Corriger le script install.bat de Windows pour gérer les espaces dans les noms de fichiers
  * Rendre la version numérique de PostgreSQL accessible aux extensions

Cette mise à jour contient aussi la version 2015g de tzdata, avec des mises à jour pour les Iles Caïman, La Moldavie, le Marc, l'île Norfolk, la Corée du Nord, la Turquie, l'Uruguay et une nouvelle zone pour America/Fort_Nelson.

## Cette version est la version finale pour 9.0

9.0.23 est la version finale pour la version majeure 9.0, qui est maintenant End-Of-Life (EOL), comme prévu. Les prochaines mises à jour de sécurité n’incluront pas la version 9.0. Par conséquent, les utilisateurs de cette version devraient planifier une mise à jour vers une autre version majeure aussi vite que possible. Pour plus d'informations à propos de la politique de support de la communauté, et le planning d'EOL, voyez «Versioning Policy».

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres versions mineures, les utilisateurs n'ont pas besoin de décharger et recharger leur base ou utiliser pg_upgrade pour appliquer cette mise à jour; vous pouvez simplement éteindre PostgreSQL et mettre à jour ses binaires. Les utilisateurs qui ont sauté plusieurs mises à jour pourraient avoir besoin d'exécuter des opérations supplémentaires après la mise à jour; voyez les notes de version pour plus de détails.

## Liens

  * Annonce originale : [http://www.postgresql.org/about/news/1615/](http://www.postgresql.org/about/news/1615/)
  * Download :  [http://www.postgresql.org/download/](http://www.postgresql.org/download/)
  * Release Notes :  [http://www.postgresql.org/docs/current/static/release.html](http://www.postgresql.org/docs/current/static/release.html)
  * Security Page :  [http://www.postgresql.org/support/security/](http://www.postgresql.org/support/security/)
