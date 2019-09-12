---
layout: post
title: Sortie de PostgreSQL 11.5, 10.10, 9.6.15, 9.5.19, 9.4.24 et de la version 12 Bêta 3 
author: Florent Jardin, Maël Rimbault, Christophe Courtois
twitter_id: dalibo
github_id: dalibo
tags: [PostgreSQL, release, mineure, sécurité, sortie, 11, 10, 9, 12, bêta, update]
source: https://www.postgresql.org/about/news/1960/
---

*Paris, le 9 août 2019*

Le PostgreSQL Global Development Group vient de publier une mise à jour pour toutes les versions supportées de PostgreSQL, à savoir : 11.5, 10.10, 9.6.15, 9.5.19, 9.4.24 et ainsi que la troisième bêta de PostgreSQL 12. 

<!--MORE-->

Ces mises à jour corrigent deux failles de sécurité dans le logiciel serveur PostgreSQL, deux failles de sécurité dans un des assistants d'installation Windows, et près de 40 bugs signalés depuis la dernière mise à jour mineure.

Les  utilisateurs doivent mettre à jour dès que possible.

## Note sur la Bêta PostgreSQL 12

Dans l'esprit de la communauté open-source PostgreSQL, nous vous encourageons vivement à tester les nouvelles fonctionnalités de PostgreSQL 12 sur vos systèmes de bases de données pour nous aider à identifier et corriger tout bug ou anomalie encore existants. Bien que nous ne vous conseillions pas d'exécuter PostgreSQL 12 Bêta 3 sur vos environnements de production, nous vous encourageons à tenter d'exécuter vos charges de travail applicatives sur cette version bêta.

Vos tests et vos retours aideront la communauté à s'assurer que la version PostgreSQL 12 respecte nos standards de livraison pour une version stable et fiable de la base de données relationnelle open-source la plus avancée au monde.

## Correctifs de sécurité

Quatre vulnérabilités ont été corrigées dans cette version :

* CVE-2019-10208 : `TYPE` dans `pg_temp` permettent l'exécution de code SQL arbitraire lors d'un appel avec une clause `SECURITY DEFINER`

Versions concernées : 9.4 à 11

Si une fonction comprend une clause `SECURITY DEFINER`, l'attaquant peut exécuter n'importe quel code SQL sous l'identité du propriétaire de la fonction. L'attaquant doit posséder le droit d'exécution sur la fonction, qui doit elle-même contenir un appel de fonction avec un type d'argument différent de celui attendu. Par exemple, `length('foo'::varchar)` et `length('foo')` fournissent un argument d'un type différent de celui attendu, contrairement à `length('foo':text)`. Pour exploiter cette vulnérabilité, l'attaquant utilise la commande `CREATE DOMAIN` pour créer un type dans le schéma `pg_temp`. Ce modèle d'attaque et son correctif sont similaires à la vulnérabilité [CVE-2007-2138](https://nvd.nist.gov/vuln/detail/CVE-2007-2138)

L'usage de la clause `SECURITY DEFINER` sur des fonctions nécessite par ailleurs de suivre les recommandations mentionnées dans la documentation :

<https://www.postgresql.org/docs/devel/sql-createfunction.html#SQL-CREATEFUNCTION-SECURITY>

Le projet PostgreSQL remercie Tom Lane pour avoir signalé ce problème.

* CVE-2019-10209 : Exposition de la mémoire lors d'une comparaison de conversion de type d'un sous-plan haché

Version concernée : 11

Dans une base de données qui contiendrait d'hypothétiques opérateurs d'égalité par hachage définis par l'utilisateur, un attaquant peut lire n'importe quelle partie de la mémoire du serveur. Pour qu'une attaque soit possible, un super utilisateur doit avoir créé des opérateurs personnalisés. Il est possible que certains opérateurs non conçus spécifiquement pour l'attaque aient les propriétés suffisantes pour permettre l'attaque, mais nous n'avons pas connaissance d'exemples spécifiques.

Le projet PostgreSQL remercie Andreas Seltenreich pour avoir signalé ce problème

* CVE-2019-10210 : L'installeur EnterpriseDB pour Windows écrit le mot de passe du super utilisateur PostgreSQL dans un fichier temporaire non protégé

Versions concernées : l'installeur EnterpriseDB pour Windows des versions 9.4 à 11

L'installeur EnterpriseDB pour Windows écrit un mot de passe dans un fichier temporaire du répertoire d'installation, crée les bases de données initiales et supprime le fichier temporaire. Durant ces quelques secondes où le fichier est présent sur le disque, un attaquant local peut lire le mot de passe du super utilisateur PostgreSQL dans ce fichier.

Le projet PostgreSQL remercie Noah Misch pour avoir signalé ce problème.

* CVE-2019-10211 : L'installeur EntrepriseDB pour Windows avec OpenSSL exécute du code à partir d'un répertoire non protégé

Versions concernées : l'installeur EnterpriseDB pour Windows des versions 9.4 à 11

Quand un serveur de base de données ou une bibliothèque client `libpq` ouvre une session SSL, la bibliothèque `libeay32.dll` tente de lire la configuration à partir d'un répertoire codé en dur. Habituellement, ce répertoire n'existe pas, mais n'importe quel utilisateur local pourrait le créer pour injecter de la configuration. Cette configuration peut imposer à OpenSSL de charger et d'exécuter du code malveillant sous l'identité de l'utilisateur exécutant le processus PostgreSQL ou le client. La plupart des outils clients PostgreSQL et des bibliothèques utilisent `libpq`, et sont donc tous exposés à cette vulnérabilité. Cette vulnérabilité s'apparente à [CVE-2019-5443](https://nvd.nist.gov/vuln/detail/CVE-2019-5443), mais a été déclarée indépendamment. Un contournement possible consiste à positionner la variable d'environnement `OPENSSL_CONF` à `NUL:/openssl.cnf` ou n'importe quel autre nom qui ne peut en aucun cas correspondre à un fichier.

Le projet PostgreSQL remercie Daniel Gustafsson de l'équipe sécurité du projet "curl" d'avoir signalé ce problème.

## Corrections de bugs et améliorations

Cette mise à jour corrige également près de 40 bugs qui ont été rapportés sur les derniers mois. Certains de ces problèmes concernent exclusivement la version 11, mais de nombreux autres touchent toutes les versions supportées.

Parmi ces correctifs, on trouve :

* Correctif pour la commande `ALTER TABLE ... ALTER COLUMN TYPE` lorsque plusieurs types de colonnes sont modifiés en une seule commande. Ce problème est apparu dans la précédente mise à jour cumulative (11.4, 10.9, 9.6.14, 9.5.18, 9.4.23, et 12 bêta 2).
* Garantie qu'une clé de partition ne sera pas supprimée lors d'une suppression indirecte, telle qu'une suppression en cascade d'un type de colonne personnalisé. Ce correctif ne s'applique que sur les nouvelles tables partitionnées : si vous pensez avoir une telle table partitionnée (i.e. l'une de vos clés de partition utilise un type de colonne personnalisé), vous aurez besoin de créer une nouvelle table et d'y déplacer les données.
* Évite la suppression d'un trigger de table partitionnée lorsqu'un évenement est toujours en cours sur l'une des partitions de cette table. Cela concerne particulièrement les contraintes de clés étrangères, qui sont implémentées par les triggers.
* Plusieurs correctifs additionnels pour le partitionnement, incluant un correctif sur l'élagage de partition qui pouvait induire des pertes de performance.
* Correctif sur les jointures hashées parallélisées qui pouvaient provoquer des lignes dupliquées en résultat de requêtes avec une clause `EXISTS`.
* Plusieurs correctifs pour le planificateur de requête.
* Plusieurs correctifs pour des problèmes de deadlock de requête.
* Correctif pour des clés étrangères composites lors de la reconstruction de la contrainte de clé.
* Évite la construction des statistiques étendues pour les tables héritées.
* Correctif pour la canonisation des plages de dates comprenant des points de terminaison -infini/infini afin de garantir un comportement conforme à la documentation.
* Correctif de la perte de chiffres fractionnaires lors d'une conversion de valeurs monétaires (`money`) très élevées en valeurs numériques (`numeric`).
* Correctif pour les fonctions PL/pgSQL qui retournent des types composites.
* Permettre à `libpq` d'ignorer le retour chariot `\r` dans les fichiers de service, qui provoquait des échecs de connexion dans certains cas.
* Plusieurs correctifs pour `psql`, incluant un comportement incorrect d'une complétion après une commande `SET variable =`.
* Fiabilisation de la vérification d'index du module `contrib/amcheck`
* L'outil `initdb` préfère à présent la timezone définie dans la librairie C en lieu et place de celles définies par localtime ou posixrules. Cela garantit que PostgreSQL utilise le nom de fuseau horaire « réel » au lieu d'un nom artificiel.
* Correctif pour `pg_dump` pour garantir le déchargement dans le bon ordre des classes d'opérateurs personnalisées, et éviter la création d'une sauvegarde inutilisable.
* Correctif d'un blocage possible dans `pgbench` lors de l'utilisation de l'option `-R`
* Correctif sur le code assembleur spinlock pour les CPUs MIPS afin qu'ils soient supportés sur MIPS r6.

Cette mise à jour contient également la version 2019b de tzdata incluant les changements législatifs sur l'heure d'été au Brésil, ainsi que des corrections historiques pour Hong Kong, l'Italie et la Palestine. Cette mise à jour ajoute également la prise en charge de la nouvelle option `-b` de zic, afin de rédure la taille des fichiers de zone, bien que PostgreSQL ne l'intégre actuellement pas.

Pour plus de détails, vous pouvez lire la copie complète des notes de version ici :

<https://www.postgresql.org/docs/release/>

## Mise à jour

Toutes les mises à jour de PostgreSQL sont cumulatives. Comme pour les autres mises à jour mineures, les utilisateurs n’ont pas à sauvegarder et recharger leur base de données ou à utiliser `pg_upgrade` pour appliquer cette mise à jour ; vous pouvez simplement arrêter PostgreSQL et mettre les binaires à jour.

Les utilisateurs ayant sauté une ou plusieurs mises à jour peuvent avoir à exécuter certaines étapes supplémentaires après installation ; merci de consulter les notes des versions précédentes pour les détails.

PostgreSQL 9.4 ne recevra plus de correctifs après le 13 février 2020. Merci de consulter notre [politique de versionnement](https://www.postgresql.org/support/versioning/) pour plus d’informations.

## Test des bugs et compatibilité

La stabilité de chaque sortie de PostgreSQL dépend grandement de vous, la communauté, à travers les tests de la prochaine version dans des conditions de charges variées, dans le but d'identifier bugs et régressions avant la mise à disposition générale de la version 12 de PostgreSQL. Puisqu'il s'agit d'une bêta, des changements mineurs dans les comportements de la base de données, fonctionnalités ou API sont toujours possibles. Vos retours d'expérience et vos tests vont aider à déterminer les derniers réglages des nouvelles fonctionnalités, merci de les tester dans un avenir proche. La qualité des tests utilisateurs aide à établir le moment où nous aboutirons à une version finale.

Une liste des [problèmes ouverts](https://wiki.postgresql.org/wiki/PostgreSQL_12_Open_Items) est disponible publiquement sur le wiki de PostgreSQL. Vous pouvez [rapporter des bugs](https://www.postgresql.org/account/submitbug/) en utilisant le formulaire sur le site de PostgreSQL :

<https://www.postgresql.org/account/submitbug/>

## Planning des bêtas

La présente publication inclut la troisième bêta de la version 12. Le projet PostgreSQL publiera d’autres bêtas si les tests le nécessitent, suivies d’une ou plusieurs versions candidates, jusqu'à la version finale au cours de la fin d'année 2019. Pour plus d’informations, voir la [page de test des bêtas](https://www.postgresql.org/developer/beta/).

---
## Liens

* [Téléchargement](https://www.postgresql.org/download/)
* [Notes de versions](https://www.postgresql.org/docs/release/)
* [Page sur la sécurité](https://www.postgresql.org/support/security/)
* [Politique de versionnement](https://www.postgresql.org/support/versioning/) 
* [Informations sur les bêtas](https://www.postgresql.org/developer/beta/).
* [Notes de version sur PostgreSQL 12 Bêta](https://www.postgresql.org/docs/devel/release-12.html)
* [Problèmes en cours sur PostgreSQL 12](https://wiki.postgresql.org/wiki/PostgreSQL_12_Open_Items)
* [Remontez un bug](https://www.postgresql.org/account/submitbug/)
* [@postgresql sur Twitter](https://twitter.com/postgresql)

