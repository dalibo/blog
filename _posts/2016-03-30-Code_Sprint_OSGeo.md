---
layout: post
title: Retour sur le Code Sprint OSGeo
author: Ronan Dunklau
twitter_id: rdunklau  
github_id: rdunklau
tags: [PostgreSQL, postgis, SIG]

---
*Paris, le 30 mars 2016*

Dalibo a participé en février au Code Sprint OSGeo, ayant eu lieu dans les locaux de Mozilla à Paris. 
Petit retour sur l'évènement.


<!--MORE-->

## Organisation

Tout d'abord, un grand merci à l'OSGeo et à Oslandia de nous avoir conviés à cet évènement, [https://wiki.osgeo.org/wiki/Paris_Code_Sprint_2016](https://wiki.osgeo.org/wiki/Paris_Code_Sprint_2016). Celui-ci avait lieu dans les prestigieux locaux de la fondation Mozilla, qu'elle avait gracieusement mis à disposition.

Une cinquantaine de développeurs venus principalement d'Europe et d'Amérique du Nord étaient présents, pour collaborer sur de nombreuses problématiques liées aux logiciels de SIG open-source.

## Indexes BRIN pour Postgis

Mon collègue Julien Rouhaud et moi même avons eu la chance de travailler avec Giuseppe Brocollo sur le thème des index BRIN pour PostGIS. 
Les index BRIN sont un nouveau type d'index disponible depuis PostgreSQL 9.5, et concernent principalement les cas d'usages pour lesquels des index «classiques» ne tiennent pas en RAM.

Un premier prototype extrêmement prometteur a été produit à l'issue de cette semaine, et Giuseppe et Julien continuent de perfectionner celui-ci en vue d'une inclusion future dans PostGIS.

Les premiers tests sont concluants, même si nous attendons un jeu de données plus conséquent pour valider complètement leur intérêt sur des données réelles.

À ce sujet, avoir la présence de Paul Ramsey et d'autres développeurs PostGIS a été d'une grande aide, comme seuls ce genre d'évènements peuvent en apporter.

## Les contraintes dans Postgis Raster

Ce code sprint a aussi été l'occasion pour moi de rencontrer Regina Obe. Celle-ci travaille aussi sur PostGIS, et nous avons pu échanger sur un problème connu depuis longtemps concernant les problèmes de schéma et de search_path avec PostGIS, et plus particulièrement avec PostGIS raster.


Ronan Dunklau
