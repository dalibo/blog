---
layout: post
title: Nouvelle version 16.0 d'Ora2Pg !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 19 Octobre 2015*

La nouvelle version 16.0 d'Ora2Pg vient d'être publiée. Il s'agit d'une version majeure apportant beaucoup de nouveautés, notamment :

  * Migration complète de bases de données MySQL, exactement comme avec les bases Oracle.
  * Rapport d'estimation de la charge de migration pour les bases MySQL.
  * Nouveau script, ora2pg_scanner, qui permet de scanner un parc entier d'instances Oracle et MySQL.
  * Ajout d'une précision de niveau de difficulté technique sur l'estimation de la migration.
  * Possibilité de faire une estimation de la migration côté client en analysant les requêtes extraites de la table AUDIT_TRAIL (oracle) ou general_log (mysql).
  * Ora2Pg a aussi un nouveau site Internet qui a été fait en une nuit, et qui nécessite donc encore du travail. Voir http://ora2pg.darold.net/

<!--MORE-->

Exemple de rapport sur la difficulté technique estimée par Ora2Pg pour la migration de la base MySQL sakila spatiale avec quelques difficultés en plus:

	Total	83.90 cost migration units means approximatively 1 man-day(s).
	Migration level: B-5

Voici les explications du code de niveau de difficulté technique :

    Migration levels:
	A - Migration that might be run automatically
	B - Migration with code rewrite and a human-days cost up to 10 days
	C - Migration with code rewrite and a human-days cost above 10 days
    Technical levels:
	1 = trivial: no stored functions and no triggers
	2 = easy: no stored functions but with triggers, no manual rewriting
	3 = simple: stored functions and/or triggers, no manual rewriting
	4 = manual: no stored functions but with triggers or views with code rewriting
	5 = difficult: stored functions and/or triggers with code rewriting

Ceci est une aide précieuse pour trouver quelles sont les bases qui peuvent être migrées en premier parce qu'elles ne nécessitent que peu d'effort (type A et B). Et quelles sont celles qui nécessitent la mise en place d'une gestion de projet complète pour la migration (type C).

Cette version amène aussi beaucoup d'améliorations:

  * Les export de type SHOW_TABLE montrent maintenant des informations additionnelles sur les tables (FOREIGN, EXTERNAL ou PARTITIONED avec le nombre de partitions).
  * Les login et mot de passe de connexion peuvent maintenant être passés au travers des variables d'environnement ORA2PG_USER et ORA2PG_PASSWD pour éviter d'avoir à les saisir en ligne de commande du script ora2pg.
  * Amélioration de la conversion du PL/SQL pour les fonctions ADD_MONTH(), ADD_YEAR(), TRUNC(), INSTR() et suppression des limitations du nombre de paramètres dans la conversion de la fonction DECODE().
  * Ajout de la détection des difficultés techniques à la migration dans les views. Avant, seuls les fonctions, procédures, packages et triggers étaient concernés.
  * Remplacement des valeurs données dans les options -s, -n, -u et -p de la ligne de commande dans le fichier de configuration auto-généré quand l'option --init_project est utilisée.
  * Ajustement des scores attribués aux difficultés selon les avancées techniques d'Ora2Pg, ex: les transactions autonomes, les dblink et synomyms sont maintenant traités plus facilement.

Il y a aussi quelques nouvelles options en ligne à la commande ora2pg:

  * "-m" ou "--mysql" : doit être utilisé avec --init_project ou -i pour informer ora2pg qu'il faut travailler sur un format MySQL
  * "-T" ou "--temp_dir" : option à utiliser pour avoir plusieurs exécutions d'ora2pg en parallèle et utiliser des répertoires de fichiers temporaires différents.
  * "--audit_user" : option pour définir le ou les nom d'utilisateur du filtre utilisé pour les traces dans la table AUDIT_TRAIL (oracle) ou general_log table (mysql). Cette option active l'analyse et l'estimation de l'effort de migration sur les requêtes contenues dans ces tables.
  * "--dump_as_sheet" et "--print_header" sont des options pour obtenir un fichier CSV avec tous les rapports d'estimation de migration d'un parc d'instances Oracle ou MySQL par lignes.
  * "--dump_as_csv" est une option pour générer le rapport d'évaluation de la migration dans un fichier CSV. Cela n'inclut pas les commentaires ni les détails, mais seulement les types d'objets, leur nombre et le coût estimé.

Compatibilité arrière :

  - La valeur par défaut de NULL_EQUAL_EMPTY est maintenant 0 pour forcer l'utilisateur à opérer les changements au niveau applicatif ou des données au lieu d'avoir à transformer le PL/SQL.

Cette version ajoute aussi un certain nombre de directives ou variables de configuration :

  * MYSQL_PIPES_AS_CONCAT: à activer si le double pipe et le double ampersand (\|\| et &&) ne doivent pas être pris comme équivalent du OR et du AND.
  * MYSQL_INTERNAL_EXTRACT_FORMAT: à activer si vous voulez que le remplacement d'EXTRACT() utilise le format interne retournant un integer.
  * AUDIT_USER: option pour définir le ou les noms d'utilisateur du filtre utilisé pour les traces dans la table AUDIT_TRAIL (oracle) ou general_log table (mysql). Cette option active l'analyse et l'estimation de l'effort de migration sur les requêtes contenues dans ces tables.
  * REPLACE_ZERO_DATE: les "zero" dates : 0000-00-00 00:00:00 sont normalement remplacées par un NULL, utilisez cette directive pour donner une date de votre choix en lieu et place du NULL. -INFINITY est aussi supporté.
  * INDEXES_RENAMING: force le renommage de tous les index en utilisant nomtable_nomcolonnes. C'est très utile lorsque la base de données a de manière répétée les mêmes noms d'index définis, cela concerne principalement MySQL.
  * HUMAN_DAYS_LIMIT: défaut à 5 jours, utilisé pour définir le nombre limite de jours-homme pour passer à une migration de type C.

De nombreux correctifs ont été apportés, pour avoir la liste complète, consulter le [changelog](https://github.com/darold/ora2pg/changelog).

## Liens

  * Site Web : [http://ora2pg.darold.net/](http://ora2pg.darold.net/)
  * Télécharger : [https://sourceforge.net/projects/ora2pg/](https://sourceforge.net/projects/ora2pg/)
  * Développement : [https://github.com/darold/ora2pg](https://github.com/darold/ora2pg)

----

## À propos d'Ora2Pg :

Ora2Pg est un outil Open Source gratuit qui permet de convertir les bases de données Oracle et MySQL en PostgreSQL.
Il se connecte à la base Oracle ou MySQL, scanne la base, en extrait les structures de données puis génère des scripts
SQL qui permettront en les injectant dans PostgreSQL d'avoir la même base de données, mais en format PostgreSQL.
Il permet aussi la migration automatique des données de la base Oracle en passant par des fichiers ou de les
charger directement dans PostgreSQL. Certaines fonctionnalités très avancées permettent l'audit d'une base
Oracle et la génération d'un rapport d'estimation du coût de la migration vers PostgreSQL.

