---
layout: post
title:  Sortie de PostgreSQL 9.4.1, 9.3.6, 9.2.10, 9.1.15 et 9.0.19
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, securite, upgrade]

---



Le PostgreSQL Global Development Group vient de publier une importante mise à jour contenant des correctifs pour plusieurs failles de sécurité pour l'ensemble des versions supportées du SGBDR PostgreSQL, il s'agit des versions mineures 9.4.1, 9.3.6, 9.2.10, 9.1.15, et 9.0.19.
Ces mises à jour contiennent des correctifs de sécurité et des correctifs pour les problèmes découverts depuis la dernière publication. En particulier pour la mise à jour de la version 9.4, une modification sur l'échappement des chaînes de caractères unicode avec les types JSON et JSONB est incluse.

<!--MORE-->


Tous les utilisateurs sont invités à mettre à jour leurs installations de PostgreSQL au plus vite.

## Correctifs de sécurité

Cette mise à jour corrige plusieurs failles de sécurité découvertes dans PöstgreSQL ces derniers mois. L'exploitation de toutes ces failles nécessite une authentification préalable, et certaines des conditions supplémentaires, par conséquent elles ne sont pas considérées comme graves. Cependant, chacun est invité à vérifier dans la liste suivante des failles corrigées celles les impactant :

* [CVE-2015-0241] Dépassement de tampon dans les fonctions "to_char".
* [CVE-2015-0242] Dépassement de tampon dans les wrappers de fonction de type printf.
* [CVE-2015-0243] Erreur de mémoire dans certaines fonctions de l'extension pgcrypto.
* [CVE-2015-0244] Erreur dans la lecture des messages du protocole étendu.
* [CVE-2014-8161] Erreurs de violation de contraintes permettant d'afficher les valeurs de colonnes même si elles sont interdites d'accès à l'utilisateur.

Cette mise à jour corrige également le problème d'accès non autorisé à l'instance utilisée pour les tests de regression, pour Windows. Cette vulnérabilité a été corrigée pour les autres plate-formes lors dans les versions précédentes.

De plus amples informations sur les failles ci-dessus et l'historique des correctifs de sécurité sont disponibles sur la page [Sécurité] de postgresql.org

## Echappement de l'Unicode dans JSON et JSONB

La gestion de l'échappement de l'Unicode dans les types JSON et JSONB de PostgreSQL 9.4.0 a été modifiée de façon non retro compatible pour certains cas d'utilisation. Afin de corriger certains incohérences, le type JSONB n'accepte plus la séquence unicode "\u0000". Le type JSON accepte "\u0000" uniquement dans les contextes où la séquence ne nécessite pas d'être convertie sous sa forme non échappée. Voir les notes de versions pour de plus amples informations.

## Autres correctifs et améliorations

En plus de ce qui précède, plus de 60 problèmes rapportés ont été corrigés dans cette mise à jour cumulative. Certaines d'entre elles n'affectent que la version 9.4, mais de nombreuses corrigent
des problèmes présents dans des versions antérieures. Ces correctifs incluent: 

* Supporter le nom non-ASCII de locale Norvégienne sous Windows.
* Éviter une corruption de données quand les bases sont déplacées dans un nouveau tablespace, puis ramenées à leur point d'origine.
* S'assurer que les tables UNLOGGED sont correctement copiées durant les opérations d'ALTER DATABASE.
* Éviter des deadlocks lors du verrouillage d'enregistrements récemment modifiés.
* Corriger deux problèmes sur des requêtes SELECT FOR UPDATE.
* Éviter les faux-négatif lors de recherches «pas gourmandes» (ungreedy) sur expressions régulières.
* Corriger des faux positifs et négatifs dans l'opérateur de contenance de tsquery.
* Corriger la gestion des namespaces dans xpath().
* Éviter qu'une fonction produisant des enregistrements puisse produire des noms de colonnes vides.
* Permettre à autovacuum d'utiliser des paramèters cost_limit et cost_delay par table.
* Quand autovacuum=off, limiter le travail d'autovacuum à uniquement la prévention du bouclage (wraparound).
* Corriger plusieurs problèmes sur le décodage logique en 9.4.
* Corriger des erreurs temporaires sur des requêtes sur une instance hot_standby du au remplacement de page.
* Éviter la duplication de l'archivage d'un fichier WAL à la fin de la récupération d'instance ou à la promotion d'une instance de standby
* Éviter un deadlock dans la restoration en parallèle d'un export ne contenant qu'un schéma et pas de données.

En plus des correctifs ci-dessus, les modules contrib et extensions suivants ont des correctifs de bugs dans
cette version: pg_upgrade, auto_explain, hstore, pageinspect, pgcrypto, pg_test_fsync, tablefunc,  et xml2. Par ailleurs, plusieurs fonctions, concernant différents modules contribs, ont vu leur niveau
de volatilité corrigé. Plusieurs correctifs ont aussi été appliqués sur des problèmes mineurs mis en avant par l'outil d'analyse statique Coverity Scan.

Cette mise à jour contient aussi de nombreuses modifications dans les fichiers de zone de temps (timezone) de PostgreSQL. Cela inclut une mise à jour vers la version 2015a de tzdata, avec des
mises à jour pour le Chili, le Mexique, les Iles Caicos et Fiji. PostgreSQL prend maintenant la date en compte lors d'une assignation faisant appel à un décalage dans une zone de temps en notation
abbrégée pour des zones ayant des changements historiques. Nous avons aussi réalisé un nettoyage global des abbréviations de zones de temps, et ajouté "CST" comme abbréviation pour
China Standard Time.

Comme pour les autres versions mineures, les utilisateurs n'ont pas besoin d'exporter et rimporter leur base ou d'utiliser pg_upgrade pour appliquer cette mise à jour; vous pouvez vous contenter
d'éteindre PostgreSQL et mettre à jour les fichiers binaires. Les utilisateurs qui n'ont pas réalisé les mises à jour précédentes pourraient avoir besoin de réaliser des étapes supplémentaires après
la mise à jour; voyez les notes de mise à jour pour plus de détails.

## Liens: 

* [Téléchargement]
* [Notes de version]
* [Sécurité]
* [Annonce officielle]


[Téléchargement]: http://www.postgresql.org/download
[Notes de version]: http://www.postgresql.org/docs/current/static/release.html
[Sécurité]: http://www.postgresql.org/support/security/
[Annonce officielle]:  http://www.postgresql.org/about/news/1569/


[CVE-2015-0241]: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0241
[CVE-2015-0242]: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0242
[CVE-2015-0243]: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0243
[CVE-2015-0244]: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0244
[CVE-2014-8161]: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-8161 

