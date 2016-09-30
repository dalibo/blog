---
layout: post
title:  Sortie de PostgreSQL 9.6
author: Damien Clochard
twitter_id:  daamien   
github_id: daamien
tags: [PostgreSQL]

---

**Le 29 septembre 2016:** 

Le PostgreSQL Global Development Group vient de publier PostgreSQL 9.6, la dernière mouture de la base de données open source de référence.  Cette version va permettre aux utilisateurs de monter en puissance verticalement ("scale up") et horizontalement ("scale out") avec ses nouvelles fonctionnalités, notamment : les requêtes parallèles, l'amélioration de la réplication synchrone, la recherche de phrase et des gains sur les performances et le confort d'utilisation.


Scalabilité verticale avec les requêtes parallèles
----------------------------------------------------------------------------------------

La version 9.6 est capable de paralléliser certaines opérations et ainsi mobiliser plusieurs processeurs pour retourner le résultat plus rapidement. Cela concerne notamment les scans séquentiels, les agrégats et les jointures. Selon le contexte et le nombre de cœurs disponibles, la parallélisation peut accélérer certaines requêtes jusqu'à 32 fois plus vite.

Mike Sofen, responsable des bases de données chez Synthetic Genomics explique : "J'ai migré la totalité de notre plateforme de données génomiques (25 milliard de lignes précédemment hébergées sur MySQL) sur une seule instance Postgres en profitant de la compression du format JSONB datatype et des excellents modes d'indexation disponibles (GIN, BRIN, and B-tree). Maintenant grâce à la version 9.6, je compte sur la parallélisation pour accélérer certaines requêtes sur nos tables volumineuses".


Scalabilité horizontale avec la réplication synchrone et postgres_fdw
-----------------------------------------------------------------------------

Deux nouvelles options ont été ajoutées à PostgreSQL pour maintenir des lectures cohérentes sur l'ensemble des noeuds d'un cluster. D'une part, on peut répliquer plusieurs noeuds de manière synchrone ; d'autre part, l'option ''remote_apply'' assure une vue cohérente des données. Ces nouveautés permettent de créer des noeuds identiques et de répartir les lectures sur plusieurs instances. 

Par ailleurs, le connecteur postgres_fdw,  qui permet de relier deux instances PostgreSQL entre elles, est désormais capable de déporter des opérations sur les serveurs distants. Le driver postgres_fdw peut maintenant pousser ("push down") les jointures, les tris et les mises à jours groupées vers l'instance cible, ce qui permet aux utilisateurs de distribuer les gros trafics SQL sur plusieurs serveurs. Ces fonctions seront bientôt ajoutées sur les autres connecteurs FDW. 

"Avec la possibilité de déporter les ordres JOIN, UPDATE et DELETE, les Foreign Data Wrappers sont devenus 
une solution complète pour répartir des données sur plusieurs bases. Par exemple, PostgreSQL peut traiter des
données en provenance de 2 ou plusieurs bases différentes" déclare Julyanto Sutandang, Directeur des Solutions Business 
chez Equinix.


Recherche plein texte sur des phrases
-------------------------------------------

La recherche plein texte de PostgreSQL est désormais possible avec des phrases entières. Cela permet de rechercher une phrase exacte ou plusieurs mots qui seraient plus ou moins proches les uns des autres. 
En combinant cela avec de nouvelles options pour optimiser la recherche plein texte, PostgreSQL devient une solution de premier choix pour les "recherches hybrides" qui mélangent données relationnelles, JSON et recherche plein texte. 


Un moteur plus agréable, plus facile et plus simple
----------------------------------------------------------

Grâce aux nombreux tests réalisés par la communauté, les développeurs de PostgreSQL ont pu améliorer de nombreux points de performances et d'administration sur cette version. La réplication, l’agrégation, l'indexation, le tri et les procédures stockées sont devenus plus efficaces, et PostgreSQL utilise mieux les ressources en s'appuyant sur les derniers noyaux Linux. La gestion des tables volumineuses et volumétries complexes est plus simple, notamment grâce aux améliorations sur la commande VACUUM. 


Liens utiles 
-------------

* Téléchargement :  https://www.postgresql.org/downloads
* Press Kit: https://www.postgresql.org/about/press/presskit96
* Note de Version : https://www.postgresql.org/docs/current/static/release-9-6.html
* Liste des nouveautés: http://docs.postgresql.fr/9.6/release.html
  https://wiki.postgresql.org/wiki/NewIn96

----

**À propos de PostgreSQL:**

PostgreSQL est le SGBD open source de référence, soutenu par une communauté internationale comprenant plusieurs milliers d'utilisateurs et des douzaines de sociétés.
Lancé il y a 25 ans à l'université de Berkeley (Californie), le projet PostgreSQL avance à un rythme de développement inégalé. Au niveau fonctionnel, PostgreSQL est comparable aux SGBD propriétaires et les surpasse en terme d'extensibilité, de sécurité et de stabilité.

Plus d'informations sur PostgreSQL et sa communauté: http://www.postgresql.org/

