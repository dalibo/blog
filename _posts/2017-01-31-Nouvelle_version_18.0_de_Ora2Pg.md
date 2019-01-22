---
layout: post
title: Nouvelle version 18.0 d'Ora2Pg !
author: Gilles Darold
twitter_id: ora2pg
github_id: darold
tags: [PostgreSQL, migration, oracle]

---
*Paris, le 31 Janvier 2017*

La nouvelle version 18.0 d'Ora2Pg vient d'être publiée. Il s'agit d'une version majeure apportant beaucoup de nouveautés, notamment :

  * La réécriture automatique des outer join (+) en syntaxe ANSI.
    Ceci fait d'Ora2Pg le premier outil libre en ligne de commande
    permettant la réécriture de cette syntaxe. Cela ne fonctionne
    encore que sur des formes simples, mais c'est un commencement.
  * Ajout de l'export des colonnes virtuelles d'Oracle en une
    colonne réelle avec un trigger associé.
  * Ajout de la possibilité de convertir les types RAW/CHAR/VARCHAR2
    avec une précision dans un type particulier avec la directive
    DATA_TYPE. Très pratique lorque l'on veut par exemple transformer
    les RAW(32) ou VARCHAR2(32) en type uuid sous PostgreSQL.
  * Ajout de l'export des statuts 'NOT VALIDATED' des clés étrangères
    et contraintes check d'Oracle en contraintes 'NOT VALID' dans PostgreSQL.
  * Ajout de l'export des variables globales d'Oracle définies dans les
    packages en "customs variables" définies dans une session. Si une
    variable est une constante ou a une valeur assignée par défaut, ora2pg
    créera un nouveau fichier de déclaration de ces variables initialisées
    (global_variables.conf) pour son inclusion depuis le fichier postgresql.conf.
  * Création automatique de la configuration full text search lorsque la directive
    USE_UNACCENT est activée en utilisant la détection automatique de la langue
    des lexèmes dans Oracle. Par exemple :

```
  	CREATE TEXT SEARCH CONFIGURATION fr (COPY = french);
    	ALTER TEXT SEARCH CONFIGURATION fr ALTER MAPPING FOR
    		hword, hword_part, word WITH unaccent, french_stem;
    	CREATE INDEX place_notes_cidx ON places
    			USING gin(to_tsvector('fr', place_notes));
```

    La directive FTS_CONFIG permet maintenant de forcer cette valeur.

<!--MORE-->

Autres changements majeurs :

  * Remplacement des appels à SYS_GUID() par uuid_generate_v4().
  * Ajout de la création des extensions dblink ou pg_background
    avant les transactions autonomes.
  * Réécriture complète de la façon dont Ora2Pg analyse le PL/SQL
    pour la réécriture des appels de fonction. Il ne doit plus y avoir
    de limitation dans leur réécriture lorsqu'elles contiennent des
    sous-requêtes ou des appels à d'autres fonctions dans leur zone
    de paramètres.
  * Changement dans la mise en oeuvre d'Ora2Pg pour ne plus nécessiter
    le module DBD::Oracle et tous les autres drivers DBD par défaut.
    Ils sont maintenant optionnels à l'installation et ora2pg attend
    par défaut un fichier SQL avec des ordres DDL ou DML à convertir.

Changements et incompatibilités avec les versions précédentes :

  * La directive FTS_INDEX_ONLY est maintenant activée par défaut
    car l'addition d'une colonne n'est pas toujours possible et
    pas toujours nécessaire là ou un simple index fonctionnel est
    suffisant.
  * Suppression de l'utilisation de setweigth() sur les index FTS
    basés sur une seule colonne.
  * La majorité du fonctionnement de l'export des index FTS dans
    Ora2Pg a changé, reportez vous à la documentation pour plus
    de détail.

Une nouvelle option de ligne de commande et quelques nouvelles
directives de configuration ont été ajoutées :

  * L'option -D | --data_type permet de définir des réécritures de
    type de données depuis la ligne de commande, tout comme avec DATA_TYPE.
  * UUID_FUNCTION permet de redéfinir la fonction appelée pour remplacer
    la fonction Oracle SYS_GUID(). Par défaut c'est uuid_generate_v4.
  * REWRITE_OUTER_JOIN pour désactiver la réécriture de la syntaxe des
    outer join (+) d'Oracle dans les cas où le code généré serait incorrect.
  * USE_UNACCENT et USE_LOWER_UNACCENT pour l'utilisation de l'extension
    unaccent dans les index FTS à base de pg_trgm.
  * FTS_INDEX_ONLY, Ora2Pg crée une colonne tsvector supplémentaire
    avec un trigger dédié pour les index FTS. L'activation de cette
    directive permet l'utilisation d'un index fonctionnel simple :
    `CREATE INDEX ON t_document USING gin(to_tsvector('pg_catalog.english', title));`
    par défaut cette directive est maintenant activée.
  * FTS_CONFIG, utilisez cette directive pour forcer l'utilisation d'un
    langage particulier pour les lexèmes utilisés avec les index FTS.
    Par exemple, on peut positionner FTS_CONFIG à pg_catalog.english ou
    pg_catalog.french pour forcer leur utilisation.

De très nombreux correctifs ont été apportés, pour avoir la liste complète, consulter le [changelog](https://github.com/darold/ora2pg/changelog).

## Liens

  * Site Web : [https://ora2pg.darold.net/](https://ora2pg.darold.net/)
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

