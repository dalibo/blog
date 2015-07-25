---
layout: post
title: Sortie de pgCluu 2.4
author: Gilles Darold
twitter_id: dalibo
github_id: 
tags: [PostgreSQL, performance, tuning, pgCluu]
---
DALIBO est fier d'annoncer la sortie de pgCluu 2.4.

pgCluu est un programme Perl utilisé pour réaliser un audit complet d'une instance PostgreSQL
et du système. Il est divisé en deux parties, un collecteur pour récupérer les statistiques
du serveur PostgreSQL à l'aide des commandes psql et sar, et un créateur de rapports qui s'occupe
de générer tous les rapports au format HTML avec les graphes.

<!--MORE-->

Cette nouvelle version corrige plusieurs problèmes et ajoute quelques nouveaux rapports :

  * Transferts par seconde sur tous les devices (issus de la commande sar -b).
  * Transferts par seconde pour chaque device (issus de la commande sar -d).
  * Nombre de taches créées par seconde.
  * Nombre de context switches générés par seconde.
  * Amélioration du rapport sur pg_stat_statement avec l'ajout des statistiques sur les blocs et les temps sur les entrées/sorties.
  * Ajout du disque ayant le plus haut tps sur la pages des statistiques globales d'utilisation du système.

et quelques fonctionnalités très intéressantes :

  * Ajout d'un mode capture à pgcluu_collectd avec l'option --capture pour pouvoir obtenir un snapshot de l'instance PostgreSQL. A l'issue de la création des rapports, pgcluu créé une archive dans /tmp/pgcluu_capture.tar.gz contenant le snapshot. C'est utile pour obtenir très rapidement la configuration du serveur PostgreSQL.
  * Ajout du logo pgCluu et de l'icone directement dans les rapports HTML.
  * Ajout de l'option --charset pour permettre le changement du charset par défaut (utf8) utilisé dans les rapports HTML.
  * Ajout de la possibilité d'utiliser des expressions régulières dans les listes des bases à inclure dans les rapports. Par exemple, avec --db-only "p.*", seules les bases commençant par la lettre p seront reportées.
  * pgcluu est maintenant capable de traiter des fichiers de données compressés avec gzip.

Cette version ajoute aussi les options -r (--rotate-daily) et -R (--rotate-hourly) à pgcluu_collectd pour permettre la rotation des fichiers de données quotidiennement ou toutes les heures. Les fichiers ainsi historisés peuvent être compressés en utilisant l'option -z ou --compress option.

Il y a aussi du code relatif à la prochaine version majeure de pgCluu qui sera notamment utilisé pour pouvoir obtenir des rapports incrémentaux et une navigation temporelle. Ceci se fera de manière entièrement dynamique via des fichiers binaires et un programme CGI. Ce code active notamment le mode cache, avec l'option -C ou --cache, qui permet le stockage des statistiques dans des fichiers binaires. Une fois ces fichiers binaire créés, les fichiers de données peuvent être supprimés automatiquement avec l'option -c ou --clean. Les rapports peuvent être construit ensuite à partir des fichiers binaires.

Pour la liste complète des améliorations, consultez la note de la nouvelle version :
https://github.com/darols/pgcluu/blob/master/ChangeLog

**IMPORTANT:** Les releases officielles doivent maintenant être téléchargées depuis
GitHub et non plus depuis SourceForge. Url de téléchargement : https://github.com/darold/pgcluu/releases

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant
remonté des bugs et des demandes, notamment Nicolas Thauvin, Julien Rouhaud, Euler Taveira de Oliveira,
Michel Meyer, Assem Bayahi, Ronan Dunklau, Zsolt, Ezequiel Mina, David Cramblett, Gregoire Pineau,
and Bianca Santana Espichicoquez.

pgCluu est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement
à l'auteur Gilles Darold.


