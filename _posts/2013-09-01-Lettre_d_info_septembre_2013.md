~~NOTOC~~

# Lettre d'information de Dalibo

L'actualité de PostgreSQL et de ses projets satellites. *Juin/Juillet/Août/Septembre 2013.*

## Événements

### PostgreSQL 9.3 en version finale dans quelques jours

PostgreSQL 9.3 est disponible depuis quelques jours en version RC1, et le stamp 9.3.0 a été ajouté sur le code source. Autrement dit, la version finale est pour très bientôt.

Elle est prévue pour le 9 septembre, à moins qu'un bug important ne soit découvert d'ici là.

Les nouveautés sont maintenant bien connues:


*  Écriture sur les tables distantes. La version 9.3 permet ainsi l'échange de données dans les deux sens entre des systèmes hétérogènes. Les environnements informatiques sont de nos jours de plus en plus complexes. Ils impliquent de nombreux SGBD, mais aussi des sources de données autres, semi-structurées. PostgreSQL vous aide à les intégrer de façon cohérente. Pour cela, il propose l'écriture sur les tables distantes, ainsi qu'un connecteur pour PostgreSQL, très performant et utilisable en lecture/écriture;

*  Meilleure disponibilité et fiabilité;
    * somme de contrôle sur les fichiers de données, pour détecter rapidement une corruption de données due à du matériel défaillant;
    * "failover" plus rapide, pour basculer un maître en esclave très rapidement;
    * reconstruction d'un esclave par "streaming" seulement, reconfiguration plus simple et plus rapide d'esclaves en cascade;

*  Pour les utilisateurs / développeurs / administrateurs;
    * Nouvelles fonctions pour les données de type JSON;
    * Données des vues modifiables automatiquement;
    * pg_dump parallélisé pour accélérer les sauvegardes;
    * Clause LATERAL.

### Workshop 9.3

Pour fêter la sortie de la version 9.3, Dalibo propose des ateliers de découverte des fonctionnalités de la 9.3. Voici l'annonce du workshop de septembre:

À l'occasion de l'arrivée de cette nouvelle version, Dalibo propose des ateliers d'une journée pour en découvrir les nouveautés et les améliorations. 

Les deux premières journées se dérouleront respectivement les vendredi 13 septembre et vendredi 18 octobre 2013 dans les locaux de Dalibo, au 10 rue d'Uzès à Paris (Métro Grands Boulevards). Ces deux journées affichent déjà complet. D'autres dates seront proposées prochainement.

Au menu: démonstrations, travaux pratiques, échanges entre professionnels et séance de questions/réponses pour mieux comprendre ce que PostgreSQL 9.3 va changer pour vos bases de données et vos environnements de production.

Les ateliers s'étendront de 9h à 17h selon le programme suivant :


*  9h - 9h30, accueil autour d'un café

*  9h30- 11h, Présentation des nouveautés

*  11h - 12h, Compilation / Installation

*  12h - 13h, Repas

*  13h - 15h, Tests des nouvelles fonctionnalités

*  15h - 17h, Questions / Réponses

Chaque société dispose d'une invitation gratuite et sans engagement pour une personne. Si vous-même ou l'un de vos collaborateurs êtes intéressés, n'hésitez pas à réserver rapidement... Le nombre de places est très limité !

### Événement PGConf.eu à Dublin

PostgreSQL Conference Europe se précise très fortement. Tutoriels et conférences sont pratiquement tous annoncés, vous en trouverez la liste sur http://www.postgresql.eu/events/sessions/pgconfeu2013/. Le planning est aussi disponible, sur http://www.postgresql.eu/events/schedule/pgconfeu2013/. Vous y retrouverez beaucoup de noms connus, européens, américains et japonais principalement.

Dalibo a été sélectionné pour trois conférences :


*  Conduite du changement d'Oracle à PostgreSQL (en anglais, par Jean-Paul Argudo);

*  pgBadger version 4 (en anglais, par Jean-Paul Argudo) ;

*  Multicorn, où comment écrire des Foreign Data Wrappers en Python (en anglais, par Ronan Dunklau).

Il est toujours possible de s'enregistrer à prix réduit (« Early bird registration »). Toutes les informations se trouvent sur http://2013.pgconf.eu/registration/

Les consultants de Dalibo seront présents en nombre à cet événement majeur. Ne manquez pas cette occasion de nous rencontrer !

## Actualité des produits dérivés


*  dbExpress for PostgreSQL 3.2, connecteur dbExpress pour PostgreSQL, http://www.devart.com/dbx/postgresql/


*  Slony-I 2.2.0 RC1, système de réplication par trigger, http://www.slony.info/


*  psqlODBC 09.02.0100, connecteur ODBC pour PostgreSQL, http://www.postgresql.org/ftp/odbc/versions/


*  Barman 1.2.1, un gestionnaire de sauvegarde et de restauration pour PostgreSQL, http://www.pgbarman.org


*  Benetl 4.4, un ETL libre pour PostgreSQL, http://www.benetl.net


*  pgBadger 3.5, un outil d'analyse des journaux applicatifs PostgreSQL, https://sourceforge.net/projects/pgbadger/


*  PG Commander, un client d'administration pour PostgreSQL, http://eggerapps.at/pgcommander/


*  psycopg2 2.5.1, un connecteur Python pour PostgreSQL, http://initd.org/psycopg/articles/2013/06/23/psycopg-251-released/


*  DataFiller 1.1.2, un générateur de données aléatoires pour PostgreSQL, https://www.cri.ensmp.fr/people/coelho/datafiller.html


*  PostgreSQL Maestro 13.7, un outil de gestion de bases de données, utilisant ODBC, http://www.sqlmaestro.com/products/postgresql/maestro/


*  PG Partition Manager 1.3.0, une extension pour gérer des partitions dates et séries, https://github.com/keithf4/pg_partman


*  pgpool-II 3.3.0 et pgpoolAdmin 3.3.0, outil de réplication, de pooling de connexions, de répartition de charge, etc, http://www.pgpool.net/


*  openBarter 0.8.2, une extension PostgreSQL implémentant les primitives d'un modèle de place de marché, http://olivierch.github.com/openBarter/


*  PostGIS 2.1.0, le système spatial de PostgreSQL, http://postgis.net/2013/08/17/postgis-2-1-0


*  Nouveau livre, "PostgreSQL Server Programming", http://www.2ndquadrant.com/en/books/


*  Skytools 3.1.5, un ensemble d'outils développés par Skype pour la réplication et les bascules, https://github.com/markokr/skytools


*  MicroOLAP Database Designer for PostgreSQL 1.9.1, outil de conception de bases de données, http://microolap.com/products/database/postgresql-designer/download/


*  Postgres-XC 1.1, un cluster symétrique multi-maître basé sur PostgreSQL, http://postgres-xc.sourceforge.net/docs/1_1_beta/release-xc-1-1.html


*  Mimeo 1.0.0, une extension de réplication logique fournissant plusieurs méthodes de réplication, avec une configuration minimale, https://github.com/omniti-labs/mimeo

## Avancées sur PostgreSQL

Comme à chaque fois en période de beta, les développeurs se concentrent sur l'amélioration de la documentation, la correction des bugs, l'écriture des « release notes » et règlent quelques points de détails (comme ne pas autoriser les vues matérialisées non journalisées ou permettre aux tables distantes d'avoir des colonnes de type serial) pour finaliser la version 9.3.

Mi-juin a marqué le début du développement de la future 9.4, avec la première « commit-fest ». Elle a été dirigé par Josh Berkus qui a cherché à la rendre très efficace. Plusieurs nouveautés ont été intégrées pendant cette « commit-fest » :


*  SQL
    * ajout du support de l'ordre « ALTER TABLE ... ALTER CONSTRAINT » permettant de modifier des clés étrangères existantes (par exemple la propriété DEFERRABLE)
    * ajout de la clause WITH CHECK OPTION pour les vues dont les données sont automatiquement modifiables ;
    * ajout de la clause CONCURRENTLY à l'ordre REFRESH MATERIALIZED VIEW
    * ajout de la clause FILTER pour les appels aux fonctions d'agrégat
    * ajout de la clause WITH ORDINALITY pour les fonctions renvoyant un ensemble de lignes ;

*  Configuration
    * ajout du paramètre session_preload_libraries permettant de charger des bibliothèques au démarrage d'une session ;
    * ajout du paramètre max_worker_processes pour limiter le nombre de processus en tâche de fond ;
    * ajout de l'unité de mémoire TB (pour téra-octets) pour la configuration des variables ;

*  Supervision
    * ajout de la colonne n_mod_since_analyze au catalogue statistique pg_stat_all_tables pour rapporter le nombre de lignes modifiés depuis le dernier ANALYZE (à noter que Guillaume Lelarge a créé une extension pour pouvoir utiliser cette fonction sur des versions antérieures de PostgreSQL, voir http://pgxn.org/dist/mods_since_analyze/1.0.0/) ;

*  Modules contribs
    * ajout de l'option --rate pour pgbench
    * ajout de la variable :client_id pour les scripts personnalisés de pgbench ;

*  Moteur
    * ajout du support du démarrage dynamique de processus en tâche de fond ;
    * ajout du support de plusieurs types de données placés dans le fichier TOAST (il s'agit de l'infrastructure de base qui devrait permettre d'amener, entre autres, le support d'autres algorithmes de compression) ;

Le développement de la 9.4 commence ainsi très fort. Il est à noter qu'il s'agit du « commit fest » disposant du plus grand nombre de patchs: 102 patchs ont été soumis, 49 ont été intégrés, 47 ont été revus et renvoyés à l'auteur pour qu'il apporte les améliorations demandées, et 6 ont été rejetés. 

Le prochain « commit-fest », qui aura lieu mi-septembre, a déjà 36 patchs de proposés.

## Avancées sur pgAdmin

Les développeurs de pgAdmin ont principalement travaillé sur des corrections de bugs, ainsi que sur le support de la 9.3 et une refonte de l'interface de débogage des procédures PL/pgsql.

Étant en beta depuis quelques mois, une vingtaine de bugs ont été corrigés. Un gros effort a été réalisé sur les connexions par certificat SSL, ainsi que sur les commentaires des objets SQL (comme les colonnes et les contraintes).

Contrairement aux deux précédentes années, le support de la nouvelle version a accusé un certain retard. Heureusement, ce dernier a été rattrapé grâce à l'ajout du support des vues matérialisées et des triggers sur événement. Parmi les autres nouveautés, il faudra aussi compter sur:


*  la suppression du bouton « Appliquer » sur les propriétés des fonctions, vues et tables distantes ;

*  l'amélioration de la gestion de la copie dans la fenêtre d'édition des données ;

*  un meilleur traitement des séquences dans le gestionnaire de droits ;

*  le format « custom » sélectionné par défaut pour une sauvegarde ;

*  la mise à jour des options utilisables pour les clés étrangères ;

*  la correction d'un bug de placement dans le « EXPLAIN » graphique (certains nœuds pouvaient apparaître les uns sur les autres).

La grande majorité de ce travail a été réalisée par Dave Page et son équipe de développeurs chez EnterpriseDB.

La version RC1 est disponible. Sa traduction française, réalisée par Guillaume Lelarge, est livrée avec. N'hésitez pas à tester cette version et à rapporter tout problème que vous pourriez rencontrer.

## Avancées sur pgBadger

Durant l'été Gilles Darold a publié deux nouvelles versions de pgBadger, 3.4 en Juin et 3.5 en Juillet. Elles apportent principalement des corrections de bogues et de nombreuses améliorations au niveau des graphiques notamment pour les logs ne dépassant pas 1 heure.

Il s'agit là des dernières versions de pgBadger sur la branche de développement 3.x, les prochaines versions seront publiées sous la branche 4.x avec un tout nouveau design. Cette version est prévue pour la fin de l'automne 2013.

## Sessions de formation

Dalibo organise régulièrement des sessions de formation à Paris et en province. Les prochaines sessions inter-entreprises auront lieu aux dates suivantes:

\\ -> 09-11 septembre, Formation Administration PostgreSQL
\\ -> 16-18 septembre, Formation PostgreSQL avancé
\\ -> 23-24 septembre, Formation Haute disponibilité avec PostgreSQL
\\ -> 01-02 octobre, Formation Architectes PostgreSQL
\\ -> 07-08 octobre, Formation PostgreSQL Développeur PL/pgsql
\\ -> 09-11 octobre, Formation PostGIS : Mise en oeuvre
\\ -> 14-16 octobre, Formation PostGIS : Fonctionnalités avancées
\\ -> 04-06 novembre, Formation SQL: conception et mise en oeuvre
\\ -> 13-14 novembre, Formation Migration Oracle vers PostgreSQL
\\ -> 09-10 décembre, Formation PostgreSQL Performance


Retrouvez toutes nos dates et nos plans de cours sur :
http://www.dalibo.com/formations

N'hésitez pas à nous contacter aussi pour tout besoin de formation en inter-entreprise comme en intra-entreprise.

## Dernières versions

Depuis le 4 avril 2013 :


*  9.2.4

*  9.1.9

*  9.0.13

*  8.4.17

## Informations générales

Cette lettre d'information présente l'actualité francophone et internationale de PostgreSQL et de ses logiciels satellites. Elle vous est proposée par la société Dalibo.

Dalibo est une société d'expertise sur PostgreSQL et tous ses projets satellites.

Dalibo peut vous accompagner dans la mise en œuvre efficace et professionnelle de PostgreSQL. Qu'il s'agisse d'un nouveau projet ou de la migration d'un existant, notre équipe d'experts se tient à votre disposition.

Si vous ne souhaitez plus recevoir cette lettre, envoyez simplement un courriel à l'adresse : newsletter-desabonnement@listes.dalibo.com

Vous pouvez retrouver cette lettre à l'adresse suivante :

http://dalibo.org/septembre_2013
