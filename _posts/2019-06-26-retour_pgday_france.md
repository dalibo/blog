---
layout: post
title: De retour du PGDay France
author: Stefan Fercot
twitter_id: pgstef
github_id: pgstef
tags: [PostgreSQL, communauté, france, pgday, conférences]
---

*Paris, le 26 juin 2019*

La semaine dernière avait lieu une nouvelle édition très réussie du [PGDay France](https://pgday.fr/) à Lyon.

<!--MORE-->

-----

L'Université Lyon 2 nous recevait dans un cadre magnifique :

![pgday_fr_2019_1](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_1.jpg)
![pgday_fr_2019_2](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_2.jpg)
![pgday_fr_2019_3](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_3.jpg)



L'ensemble du programme est disponible [ici](https://pgday.fr/programme). La plupart des supports de présentation sont
déjà disponibles.

Le ressenti que je vous livre ci-dessous est tout à fait personnel, mais il me tenait à cœur de partager avec vous cette
expérience une nouvelle fois très enrichissante humainement.

Préalablement au pgDay lui-même avait lieu la soirée d'ouverture sur la péniche Ayers Boat à Lyon. Un premier moment de
partage et d'échange très apprécié. Ce qui fut également très apprécié de mon côté "belge" fut le très large choix de
bières belges au fût : Triple Karmeliet, Kwak, Chouffe... Mais revenons à nos moutons...

Pour commencer cette nouvelle journée de conférences, Zoé Maltet nous a parlé de la place des femmes dans le monde
informatique d'hier, d'aujourd'hui et de demain : **Informatique, genre et légitimité**. Bien que certains pays, 
comme la Malaisie, nous montre l'exemple, il est encore difficile de combattre les stéréotypes des métiers du domaine
des TIC.

![pgday_fr_2019_zoe](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_zoe.jpg)

Daniel Vérité nous raconte ensuite comment une attaque de type _ACIDRain_ (via des transactions concurrentes) a pu faire
fermer une banque. Le mode d'isolation des transactions par défaut de PostgreSQL étant _READ COMMITED_, il nous apprend
comment **sécuriser nos transactions concurrentes** avec d'autres niveaux d’isolation (_REPEATABLE READ_ et _SERIALIZABLE_).

![pgday_fr_2019_daniel](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_daniel.jpg)

Après une pause café bien méritée (et bien fournie en viennoiseries), Lætitia Avrot nous emmène non pas dans les schémas
de données avec le système Avro de la fondation Apache, mais bien dans le monde **merveilleux du SQL**. 
Elle nous décrit comment, à l'aide de ce langage complet bien que non-procédural, il est possible de venir à bout des
problèmes les plus complexes à l'aide de fonctionnalités méconnues.

![pgday_fr_2019_laetitia](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_laetitia.jpg)

Gilles Darold nous montre par la suite quelques-unes des **fonctionnalités avancées** et intéressantes de [**pgBadger**](http://pgbadger.darold.net/).
Cet outil, à la fois simple et extrêmement utile, comporte toutefois plus de 80 options en ligne de commande.
Une nouvelle version contenant certaines nouveautés intéressantes devrait d'ailleurs voir le jour très prochainement.

![pgday_fr_2019_gilles](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_gilles.jpg)


Vient alors le temps de la pause repas. Les grands espaces (tant à l'intérieur qu'à l'extérieur) offerts par l'Université,
ainsi que la durée appréciable de cet interlude, ont vraiment été propices aux échanges entre participants.


Manuel Pavy explique ensuite comment il a pu implémenter du **partitionnement** au CNES en se servant de **coordonnées
géographiques (latitude et longitude)** comme clé de partitionnement. Un très bel exemple d'utilisation de l'extension
PostGIS. Une impression personnelle me fait penser que de plus en plus d'utilisateurs viennent à utiliser PostgreSQL
de par leur utilisation de PostGIS justement. Cette extension étant très largement plébiscitée dans la communauté SIG...

![pgday_fr_2019_manuel](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_manuel.jpg)

Le point d'orgue technique de cette journée, pour moi, arrive enfin avec Ronan Dunklau. Il nous montre comment il a pu, 
avec l'aide de plusieurs collègues, se servir de l'infrastructure de réplication existante dans PostgreSQL pour 
**construire son propre système de réplication logique** plus adapté aux besoins de PeopleDoc. Déclinée en plusieurs
briques, écrite en langages différents (C, Python, Perl), l’intention est bien de libérer le code dès que possible
afin d'en faire profiter la communauté. Affaire à suivre donc !

![pgday_fr_2019_ronan](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_ronan.jpg)

Après une nouvelle pause, Anthony Nowocien nous fait part de son retour d'expérience sur les différents outils disponibles
pour **charger un volume important de données**. De l'_INSERT_ au _COPY_, en passant par des outils externes comme
`pg_bulkload`, il est même allé jusqu'à développer son propre système : `pg_discard`. Chaque méthode ayant ses avantages
et inconvénient dans chaque situation, il est recommandé à chacun de tester avec son cas d'utilisation précis.

![pgday_fr_2019_anthony](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_anthony.jpg)

Pour revenir au monde SIG, Regis Haubourg, président de l'association OSGeo-fr, nous explique **du SIG à une base de
données de référence décisionnelle, quelle architecture de base de données** choisir. Il s'agit peut-être de la
conférence dont le contenu m'a le plus surpris. Plutôt qu'une longue introduction théorique, Régis nous a plutôt fait 
partager son expérience au travers des "pires" pratiques qu'il ait pu rencontrer. Didactique et convivial, il remet les
données au cœur de nos métiers. Du développeur au DBA, il est important de valoriser les données récoltées pour réussir à
concevoir une architecture cohérente.

![pgday_fr_2019_regis](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_regis.jpg)

Enfin, une dernière pause et Julien Riou nous emmène **dans les coulisses de l'infrastructure interne (et hautement
disponible)** chez OVH. Toutes les étapes sont passées en revue. De l'outil de promotion automatique des instances
PostgreSQL (Patroni), à la technologie de sauvegarde utilisée, en passant par l'intégration des processus de BI et de
mise à jour. Cette architecture, bien qu'encore uniquement disponible en interne chez OVH actuellement semble toutefois
robuste. En effet, Julien, qui était d'astreinte lors de sa présentation, n'a pas été dérangé par un incident de
production en plein milieu... :-)

![pgday_fr_2019_julien](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/pgday_fr_2019_julien.jpg)


Ayant eu la chance de participer au comité de sélection des conférences cette année, j'avais vraiment hâte d'assister à
cette journée. Avec une organisation au top, des pauses régulières et de durées appréciables, j'ai réellement pris
beaucoup de plaisir aux différentes rencontres et aux nombreuses conversations avec les participants.

À nouveau, je tenais à remercier chaleureusement organisateurs, orateurs et participants.

À l'année prochaine !
