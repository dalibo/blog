---
layout: post
title:  Mise à jour de sécurité 2017-05-11
author: Léo Cossic
twitter_id: Dalibo
github_id: Dalibo
tags: [PostgreSQL, release, upgrade, sécurité, 9]

---
*Paris, le 11 mai 2017*


Le groupe global de développement de PostgreSQL a délivré une mise à
jour pour toutes les versions de nos systèmes de bases de données
incluant les versions 9.6.3, 9.5.7, 9.4.12, 9.3.17 et 9.2.21. Cette mise à jour corrige trois problèmes de sécurité.
Il corrige aussi d'autres bugs rapportés au cours des trois derniers
mois.

<!--MORE-->

Les utilisateurs qui font usage de la variable d'environement
PGREQUIRESSL, ainsi que les utilisateurs de SQL/MED dont les connexions aux serveurs
distants sont protégées par un mot de passe, devraient installer cette
mise à jour dans les plus brefs délais.
Les autres utilisateurs devraient profiter du prochain arrêt de la base
pour effectuer la mise à jour.

Problèmes de sécurité:
---------------------

_Trois failles de sécurité ont été fermées grâce à cette mise à jour :_

    CVE-2017-7484 : les droits d'accès ne sont pas pris en compte lors
	de l'estimation de la sélectivité
    CVE-2017-7485 : libpq ignore la variable d'environement PGREQUIRESSL
    CVE-2017-7486 : la vue pg_user_mappings fait apparaître le mot de
	passe du serveur distant

La correction pour le bug CVE-2017-7486 s'applique par défaut aux
nouvelles bases de données.
La procédure d'implémentation pour les bases existantes est disponible
dans les notes de cette mise à jour.

Tout utilisateur de la variable PGREQUIRESSL est encouragé à utiliser
l'option sslmode dans la chaine de connexion,
l'utilisation de PGREQUIRESSL étant obsolète.

Le bug CVE-2017-7485 n'affecte que les versions 9.2.x.
Pour plus d'information sur ces questions et la façon dont elles
affectent la rétrocompatibilité, se reporter aux notes correspondantes.

Correction des bugs et améliorations :
-------------------------------------
Cette mise à jour corrige aussi plusieurs bugs rapportés ces
derniers mois.
Un certain nombre n'affectent que les versions 9.6.x, mais la majorité
impactent
toutes les versions. Il y a plus de 90 correctifs dans cette mise à
jour,
incluant:

* Correction sur la gestion de la politique de sécurité au niveau des
lignes
* Correction sur ALTER TABLE ... VALIDATE CONSTRAINT, afin que les
tables filles ne
 soient pas modifiées lorsque la contrainte est marquée en NO INHERIT.
* Meilleurs support des opérateurs sur le type box SP-GIST dont
l'utilisation pouvait conduire
  à des résultats incorrects.
* Correction de la gestion de l'annulation des requêtes.
* Non prise en compte des privilèges lorsque la commande ALTER TABLE ...
ALTER COLUMN TYPE
  conduit à la reconstruction d'un index.
* Correction de la génération d'une image initiale invalide lors d'un
décodage logique
* Correction de la corruption possible du fichier init d'un index non
journalisé.
* Plusieurs corrections ont été apportées au processus postmaster,
incluant les vérifications lorsqu'il
  tourne en tant que service windows.
* Plusieurs corrections du planificateur, notamment pour
les requêtes parallèles
* Eviter les crashs du walsender et le parcours des index uniquement
pour les index GiST
* Correction d'un problème sur le pg_stop_backup() lorsque l'arrêt d'un
backup non exclusif est tenté
* Mise à jour d'ecpg pour supporter COMMIT PREPARED et ROLLBACK PREPARED
* Plusieurs corrections pour pg_dump/pg_restore, dont la prise
en compte des privilèges
  pour le language procedural, et l'utilisation de
l'option --clean
* Plusieurs corrections pour le module contrib, comme dblink, pg_trgm et
postgres_fdw
* Correctifs sur la construction MSVC, comme l'utilisation de règles correctes du
changement d'horaire sur les fuseaux
  ayant des noms de type posix et supportant Tcl 8.6
* Plusieurs améliorations des performances
* Correction de cursor_to_xml() pour produire des résultats valides avec
tableforest = false
* Correction de problèmes d'arrondis lors de l'utilisation des
fonctions float8_timestamptz() et make_interval()
* Correction de pgbench pour prendre en compte correctement la
combinaison des options --connect et --rate
* Correction d'outils de commandes en ligne comme pg_upgrade et
pg_basebackup
* Corrections multiples sur le VACUUM et le CLUSTER.

Les utilisateurs d’outils de réplication basés sur le décodage logique, comme les utilisateurs des index non tracés (unlogged indexes), devraient consulter les notes de versions pour d’ éventuelles  étapes supplémentaires lors de la mise à jour.

Cette mise à jour contient aussi la version tzdata 2017b avec la mise à jour de la règle du passage à l’heure d’été (DST) qui a changé au Chili, en Haiti et en Mongolie, avec en plus des corrections historiques pour l’Equateur, le Kazakhstan, le Liberia, l’Espagne. Un passage aux abréviations numériques a eu lieu pour les fuseaux horaires d’Amérique du Sud, dans les océans Pacifique et Indien, ainsi que dans plusieurs pays d’Asie et du Moyen-Orient. La librairie en charge des fuseaux horaires est synchronisée avec l’IANA en version tzcode2017b.


Avertissement sur la fin de vie de la version 9.2
-------------------------------------------------

La version 9.2 sera en fin de vie en septembre 2017. La communauté PostgreSQL ne s’attend pas à fournir plus de 1 ou 2 mises à jour sur cette version. Nous recommandons vivement aux utilisateurs d’initier un planning de mise à jour vers une version de PostgreSQL plus récente, et ce dès que possible. Pour de plus amples explications, reportez-vous à  notre politique de gestion de versions.


Mise à jour
-----------

Toutes les mises à jour PostgreSQL sont cumulatives. Tout comme les autres versions mineures, il n’est pas utile pour les utilisateurs de décharger et recharger leur base de données ou d’utiliser pg_upgrade pour appliquer cette mise à jour. Vous devrez simplement arrêter votre instance PostgreSQL et mettre à jour les exécutables.

Après la mise à jour, les utilisateurs d’outils de réplication basés sur le décodage logique, comme les utilisateurs des index non tracés (unlogged indexes), devraient consulter les notes de versions pour d’éventuelles étapes supplémentaires lors de la mise à jour. Reportez-vous aux notes de la version pour plus d’explications.

Les utilisateurs qui ont sauté une ou plusieurs mises à jour mineures pourraient avoir besoin de lancer des étapes supplémentaires après la mise à jour; merci de consulter les notes de version des versions précédentes pour plus de détails.

Liens :
-------
* Téléchargement https://www.postgresql.org/download
* Notes de version https://www.postgresql.org/docs/current/static/release.html
* Page sur la sécurité https://www.postgresql.org/support/security/
* Politique de versionnement https://www.postgresql.org/support/versioning/

