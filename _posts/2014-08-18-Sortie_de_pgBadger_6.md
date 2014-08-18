---
layout: post
title: Sortie de pgBadger 6
author: Virginie Jourdan
twitter_id: @JourdanVirginie
github_id: 
tags: [PostgreSQL, performance, pgBadger]
---
DALIBO est fier d'annoncer la sortie de pgBadger 6.0.
PgBadger est un analyseur de performances pour PostgreSQL, conçu pour produire rapidement des rapports détaillés à partir de vos fichiers de logs Postgres.

<!--MORE-->

Cette nouvelle sortie majeure règle plusieurs problèmes et ajoute quelques nouvelles fonctionnalités :

* Le nettoyage automatique de fichiers binaires en mode incrémental
* Le traitement automatique de rétention avec un nombre maximal de semaines pour conserver des rapports
* L'amélioration du mode incrémental en permettant l'utilisation de multitraitement avec fichier de logs multiples    
* Rapporte maintenant la latence des requêtes par percentiles (les percentiles sont 90, 95, 99)
* Un nouveau format de sortie : JSON. Ce format est parfait pour partager des données avec d'autres outils
* L'option --anonymize rendra anonymes toutes les valeurs littérales des requêtes
* Le rajout d'un bouton devant chaque requête, permettant d'utiliser simplement Ctrl+C pour le copier sur le presse-papiers
* Plusieurs améliorations pour réduire l'espace nécessaire lors du mode incrémental, l'option-X permettant l'utilisation de CSS externe et de fichiers Javascript
* Un nouveau logo pgBadger 

**Avertissement** : le comportement de pgBadger en mode incrémental a changé. Il nettoiera systématiquement le répertoire de sortie de tous les fichiers binaires obsolètes. Si vous utilisiez ces fichiers pour construire vos propres rapports, vous pouvez empêcher pgBadger de les supprimer en utilisant l'option --noclean. Notez que si vous utilisez la fonction de rétention, tous les fichiers dans des répertoires obsolètes seront supprimés également.

Pour la liste complète des améliorations, consultez la note de la nouvelle version :
https://github.com/dalibo/pgbadger/blob/master/ChangeLog

###Liens & Remerciements

DALIBO souhaite remercier les développeurs ayant soumis des patchs et les utilisateurs ayant remonté des bugs et des demandes, notamment Herve Werner, Julien Rouhaud, Josh Berkus, CZAirwolf, Bruno Almeida, Marc Cousin, Thomas Reiss, Rodolphe Quiedeville, Himanchali, Guilhem Rambal, Shanzhang Lan, Xavier Millies-Lacroix, Kong Man, wmorancfi, flopma and birkosan.

pgBadger est un projet ouvert. Toute contribution est la bienvenue pour améliorer cet outil.
Vous pouvez soumettre vos idées, vos demandes et vos patchs via les outils GitHub ou directement sur notre liste de diffusion.
