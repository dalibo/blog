---
layout: post
title: Sortie de PostgreSQL 9.6.5, 9.5.9, 9.4.14, 9.3.19 et 9.2.23
author: Nicolas Thauvin
twitter_id: orgrim
github_id: orgrim
tags: [PostgreSQL,  update, 9, release]

---

---
*Paris, le 31 août 2017*


Le « PostgreSQL Global Development Group » a sorti une mise à jour
de toutes les versions supportées de notre SGBD, soit 9.6.5,
9.5.9, 9.4.14, 9.3.19, et 9.2.23.

Ces versions incluent des correctifs permettant d'éviter un crash
de pg_restore en mode parallèle.  Elles apportent aussi des
correctifs pour quelques autres bogues découverts depuis les
dernières sorties d'août.

<!--MORE-->

De plus, pour la 9.4.14 seulement, un correctif est disponible
pour le problème du walsender empêchant l'arrêt d'une instance
primaire qui imposait d'​utiliser un arrêt forcé (immediate).

Les utilisateurs sont encouragés à planifier cette mise à jour
lors de leur prochaine fenêtre de maintenance.

Correctifs et améliorations
---------------------------

Cette mise à jour corrige également un certain nombre de bogues
rapportés durant les dernières semaines. Certains problèmes
n'affectent que la version 9.6, mais d'autres concernent toutes
les versions supportées :

* Montrer les tables externes dans la vue
  information_schema.table_privileges. Le correctif ne s'applique
  qu'aux nouvelles instances, voir les notes de version pour
  obtenir la procédure à appliquer pour les instances existantes ;

* Tenir compte des colonnes de type range ou domaine dans un type
  composite ou domaine lors des vérifications faites par
  certaines commandes ALTER ;

* Empêcher un crash lors du passage par référence de types à
  taille fixe aux processus parallel worker ;

* Modification du parser ecpg pour permettre les clauses
  RETURNING sans variables C attachées ;

* Modifications du parser ecpg pour tenir compte des lignes de
  préprocesseur C continuées avec un anti-slash ;

* Améliorer le choix des options de compilateur pour le PL/Perl
  sur Windows.


Avertissement : Fin de support  de la version 9.2
-------------------------------------------------

La version 9.2 de PostgreSQL arrive en fin de
support (End-of-Life) en septembre 2017. Le projet prévoit de
sortir une seule mise à jour de cette version. Les utilisateurs
sont exhortés à planifier une migration vers une version plus
récente de PostgreSQL dès que possible. Voir la Politique de
gestion des versions pour plus d'informations.

Comment mettre à jour
---------------------

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour
n'importe qu'elle mise à jour mineure, un dump/restore ou
l'utilisation de pg_upgrade n'est pas nécessaire pour installer cette
mise à jour ; un redémarrage avec les nouveaux binaires suffit.

Liens (en anglais)
------------------

* [Téléchargement](https://www.postgresql.org/download)
* [Notes de version](https://www.postgresql.org/docs/current/static/release.html)
* [Informations de sécurité](https://www.postgresql.org/support/security/)
* [Politique de Versionnement](https://www.postgresql.org/support/versioning/)
