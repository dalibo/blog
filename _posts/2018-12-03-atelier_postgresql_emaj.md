---
layout: post
title: E-Maj - présentation de l'extension pour PostgreSQL au CNRS
author: Philippe Beaudoin, Léo Cossic
twitter_id: dalibo
github_id: dalibo
tags: [dalibo, postgresql, emaj, maj, update, postgres]
---

---

*Paris, le 3 décembre 2018*

Le 6 novembre dernier, **Philippe Beaudoin**, consultant Dalibo, a été invité par le **Réseau Bases de Données du CNRS** à co-animer deux ateliers sur l’utilisation de l’**extension PostgreSQL E-Maj** pour la traçabilité des changements de données.

<!--MORE-->

## Le Réseau Base de Données :
Le Réseau Bases de Données est une organisation transverse du CNRS visant à promouvoir les bonnes pratiques autour de l’utilisation des bases de données et à favoriser le partage d’expérience des différentes équipes de recherche en la matière. Au CNRS, PostgreSQL, souvent accompagné de PostGIS, occupe une place centrale dans le paysage SGBD.

Pour ce séminaire, plus de 50 « data scientists » étaient donc regroupés autour de différents thèmes, dont celui de la traçabilité.

## Présentation de l'extension E-Maj :
Placé sous la large bannière « DaliboLabs », le logiciel E-Maj est une extension de PostgreSQL qui permet d’enregistrer les mises à jour effectuées sur des ensembles de tables à des fins de consultation, de statistiques et d’annulation. Ses mécanismes permettent ainsi de « faire voyager les données dans le temps ». Il est doté d’une interface web qui en facilite grandement l’usage pour tout type d’utilisateur : développeurs et testeurs d’application, administrateurs, et d’une manière générale toute personne ayant besoin de tracer les évolutions de contenus de données.

La traçabilité revêt un enjeu majeur dans le domaine de la recherche. Il est en effet important de toujours être capable de parfaitement qualifier les jeux de données utilisés dans les travaux de recherche. Être capable de tracer de manière efficace et fiable les évolutions de contenu est donc essentiel. Durant ces ateliers, la présentation et les Travaux Pratiques proposés ont permis à chacun d’évaluer la pertinence de l’outil pour ses propres besoins.


## Pour plus d’info sur l’extension PostgreSQL E-Maj :

- le dépôt principal du projet : https://github.com/beaud76/emaj

- la documentation en ligne : https://emaj.readthedocs.io/fr/latest/

N’hésitez pas à nous contacter pour en savoir plus.
