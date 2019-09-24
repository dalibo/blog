---
layout: post
title: "PostgreSQL Anonymizer 0.3 : Masquage permanent et dumps anonymes"
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, anonymisation, RGPD, Dalibo Labs, PostgreSQL Anonymizer]
---

---

*Paris, 24 Septembre 2019*

`postgresql_anonymizer` est une extension qui cache ou remplace les données personnelles ou sensibles dans une base PostgreSQL.

<!--MORE-->

![](https://raw.githubusercontent.com/dalibo/blog/gh-pages/img/PostgreSQL-Anonymizer_H_couleur.png)

Tout d'abord, on peut déclarer une liste de [Règles de Masquage] directement dans le modèle de données avec les commentaires SQL, comme ceci :

```sql
COMMENT ON COLUMN users.name IS 'MASKED WITH FUNCTION md5(name)';
```

Une fois que ces règles sont définies, l'anonymisation peut être obtenue de 3 manières différentes :

* [Dumps Anonymes] : exporter les données masqueés dans un fichier SQL
* [Anonymisation Permanente] : supprimer les données sensibles en appliquant les règles de masquage
* [Masquage Dynamique] : cacher les données sensibles, uniquement pour les utilisateurs masqués 

Par ailleurs, plusieurs [fonctions de masquage] sont disponibles : 
insertion de données aléatoires, données factices, masquage partiel, brassage, ajout de bruit, noise, etc. Vous pouvez aussi utiliser vos propres fonctions !

Pour plus de détail, consultez la documentation : https://postgresql-anonymizer.readthedocs.io/

[Règles de Masquage]: https://postgresql-anonymizer.readthedocs.io/en/latest/declare_masking_rules/
[fonctions de masquage]: https://postgresql-anonymizer.readthedocs.io/en/latest/masking_functions/
[Dumps Anonymes]: https://postgresql-anonymizer.readthedocs.io/en/latest/anonymous_dumps/
[Anonymisation Permanente]: https://postgresql-anonymizer.readthedocs.io/en/latest/in_place_anonymization/
[Masquage Dynamique]: https://postgresql-anonymizer.readthedocs.io/en/latest/dynamic_masking/


Installation
--------------------------------------------------------------------------------

Cette extension est supportée officiellement avec PostgreSQL 9.6 et les versions suivantes.

Elle nécessite une extension nommée [tsm_system_rows] (distribuée dans le
paquet `contrib` ) et une extension nommée [ddlx] (distribuée via [PGXN]):

```bash
$ pgxn install ddlx
$ pgxn install postgresql_anonymizer
```

> **AVERTISSEMENT:** Ce projet est en cours de développement et il devrait 
> être utilisé avec précaution.

[tsm_system_rows]: https://www.postgresql.org/docs/current/tsm-system-rows.html
[ddlx]: https://github.com/lacanoid/pgddl
[PGXN]: https://pgxn.org/


Comment contribuer ?
--------------------------------------------------------------------------------

PostgreSQL Anonymizer fait partie de l'initiative [Dalibo Labs]. Il est développé principalement par [Damien Clochard].

Il s'agit d'un projet ouvert, les contributions sont les bienvenues. Nous avons 
besoin de feedback et d'idées ! Dites-nous ce que vous pensez de cet outil, 
comment il répond à vos besoins et quelles fonctions vous manquent.

Si vous souhaitez nous aider, vous trouverez une liste de `Junior Jobs` ci-dessous :

https://gitlab.com/dalibo/postgresql_anonymizer/issues?label_name%5B%5D=Junior+Jobs


[Dalibo Labs]: https://labs.dalibo.com
[Damien Clochard]: https://www.dalibo.com/en/equipe#daamien
