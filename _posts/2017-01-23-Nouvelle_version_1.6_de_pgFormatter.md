---
layout: post
title: Nouvelle version 1.6 de pgFormatter !
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [postgresql, pgformatter, release]

---
*Paris, le 23 janvier 2017*

La nouvelle version 1.6 de pgFormatter est sortie aujourd'hui. Elle corrige
certains problèmes et améliore grandement le formatage des requêtes SQL.

Elle inclut aussi une nouvelle option `--placeholder` ou `-p` qui a été
introduite pour permettre l'utilisation d'expressions régulières pour la
recherche de code à ne pas formater.

<!--MORE-->

Par exemple, une requête contenant des zones remplacées dynamiquement comme :

```
SELECT * FROM projects WHERE projectnumber
	IN <<internalprojects>> AND username = <<loginname>>;
```

va provoquer le formatage des zones `<<...>>` et donc modifier le code.
Pour éviter cela on peut maintenant utiliser une expression régulière
Perl pour informer pgFormatter de garder ces zones de la requête non
modifiées. Par exemple :

```
$ pg_format samples/ex9.sql -p '<<(?:.*)?>>'
```

instruira pgFormatter de ne pas formater les opérateurs de décalage de bit
tels qu'utilisés dans la requête comme zone modifiable dynamiquement.

pgFormatter v1.6 est aussi disponible comme service en ligne gratuit pour
formater des requêtes allant jusqu'à 100 KB. Pour voir un exemple de
formatage SQL généré par pgFormatter allez sur [http://sqlformat.darold.net/](http://sqlformat.darold.net/)
et cliquez sur le bouton "Load an example" puis sur "Format my code". Pour
formater votre code SQL, copier le dans la zone de texte et cliquez sur le
bouton "Format my code".

Pour la liste complète des changements dans cette version, consultez l'URL
[https://github.com/darold/pgFormatter/blob/master/ChangeLog](https://github.com/darold/pgFormatter/blob/master/ChangeLog)

## Liens

  * Site Web : [http://sqlformat.darold.net/](http://sqlformat.darold.net/)
  * Télécharger : [http://sourceforge.net/projects/pgformatter/](http://sourceforge.net/projects/pgformatter/)
  * Développement : [https://github.com/darold/pgFormatter](https://github.com/darold/pgFormatter)
  * ChangeLog : [https://github.com/darold/pgFormatter/blob/master/ChangeLog](https://github.com/darold/pgFormatter/blob/master/ChangeLog)

----

## À propos de pgFormatter :

pgFormatter est un outil Open Source gratuit qui permet de formater/embellir le code SQL. Il supporte
les mots clefs du SQL-92, SQL-99, SQL-2003, SQL-2008, SQL-2011 et les mots clefs spécifiques à PostgreSQL.
Il partage le même code que pgBadger, ainsi, la plupart des modifications et améliorations faites sur
pgFormatter sont reportées dans pgBadger. C'est un projet créé et maintenu par l'auteur de pgBadger, Gilles Darold.

