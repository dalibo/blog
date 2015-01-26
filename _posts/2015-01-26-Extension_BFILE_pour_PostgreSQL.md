---
layout: post
title: Extension BFILE pour PostgreSQL&#58; external_file
author: Gilles Darold
twitter_id: dalibo
github_id: darold
tags: [PostgreSQL, extension, lob, bfile]
---

Vous connaisez les BFILE d'Oracle ? Il s'agit d'un type de données qui permet d'accéder à des fichiers externes, stockés en dehors de la base.

Une nouvelle extension appelée [external file](https://github.com/darold/external_file) permet désormais de 
manipuler des fichiers à l'extérieur du système de base de
données PostgreSQL.

<!--MORE-->

Supposez par exemple que vous ayiez besoin de mettre à disposition d'un site Web
des images. Toutes les informations et les méta-données relatives à ces images
sont stockées dans votre base PostgreSQL et vous souhaitez que les utilisateurs
puissent ajouter ou manipuler les images via votre interface Web.

Aucun problème, vous pouvez stocker vos images sous forme d'objets binaires
(bytea). L'inconvénient étant le coût très élevé que cela peut avoir sur les
performances selon l'activité de votre site. Il y a bien sûr la possibilité
d'utiliser un cache en amont mais cela complexifie l'architecture. Dans notre
exemple l'idéal pourrait être de stocker les images sur un système de fichier
accessible à PostgreSQL et en même temps à un serveur Web. La manipulation
des images et des données associées passerait donc toujours par PostgreSQL
mais le service d'affichage/consultation des images serait rendu par un serveur
Apache, bien plus efficace pour ça.

C'est ce que permet la nouvelle extension "external_file" développée par
Dominique Legendre pour les besoins du Brgm (http://www.brgm.fr/). Voici
comment nous pourrions mettre en oeuvre notre exemple.

Pour installer cette extension, rien de plus simple, après avoir décompressé
l'archive :

    &#36; cd external_file/
    &#36; make
    &#36; make install


Les extensions nécessitent d'avoir un PostgreSQL >= 9.1. Reste à créer
l'extension dans la base de données cible :

```
    CREATE EXTENSION external_file;
```

Celle-ci va créer le schéma "external_file" et y créer les tables et fonctions
nécessaires à son utilisation. Pour que les utilisateurs puissent utiliser ce
schéma il est préférable de changer le ```search_path``` par défaut :

```
    ALTER DATABASE mabase SET search_path="&#36;user",public,external_file;
```

Il faut commencer par créer des ```DIRECTORY``` dans lesquels seront stockées les
images passées sous forme de bytea et selon le nom de fichier donné.

```
    INSERT INTO directories(directory_name,directory_path)
        VALUES ('mon_album_photo','/var/www/albums/gilles/famille/');
```

Bien sûr le répertoire cible doit exister et l'utilisateur postgres doit
pouvoir écrire dedans, mais l'autocréation du répertoire peut faire partie
d'une amélioration de l'extension. Il faut aussi que le '/' final soit
présent pour que l'extension fonctionne correctement.

Ici on a donc un emplacement de stockage nommé ```mon_album_photo``` avec comme
emplacement physique ```/var/www/albums/gilles/famille/```. Les photos seront
elle accessibles en consultation directement via Internet par une URL du
genre http://monserver/albums/gilles/famille/

Puis on sécurise l'accès à ce ```DIRECTORY``` :

```
    INSERT INTO directory_roles(directory_name,directory_role,directory_read,directory_write)
        VALUES ('mon_album_photo', 'gilles', true, true);
```

Seul l'utilisateur ```gilles``` pourra lire et écrire via PostgreSQL dans ce
répertoire. Cet utilisateur peut donc maintenant créer un fichier dans ce
```DIRECTORY``` :

```
    SELECT writeEfile('\x89504e470d0a1a0a0000000d4948445200000010000000100804000000b5fa37ea000000017352474200aece1ce900000002624b474400ff878fccbf000000097048597300000b1300000b1301009a9c180000000774494d4507df01170b1e22d266d3160000018c4944415428cf3d904d4b546100859ff77ac7b90e33232a8a3841392a82e1226c51b61a5018647025686452da2f109556b96b9121b8487021d942850441178a28820b093f080b669360146eca08111bc6f9784f8b2b9ecd599cb378ce01009a7d0bd5b6c61b622e80b8510f00c9a049c636927a20ef0d71803a3f8e00509df056db2f3e2aa39f7aa5583af4ba230c700ba0ce0b4e990b14d05b5bd0b97d2444c1f91eed03a0dc0d4c2084ba949124edab465864f25e373859cf267ca6300100829481417269b9eb38056c113070c831200ef8718d6fc9e180e4f28cfb9cb08fc8b202f4f2d040d1fe9553240a0c93a78335aef8c31e6da488e31136a5c681463a69e336dff844962ffcc66386799e90d12fb940c918357c002ab064805d604e39335b526970bd8ae505c98e2aac4d4979bd94ab3d494f45bf0042f7f83c983bd5b4a66d4acfed9c5dd78eee5cf2be29723d67c065a4eaeb94c6d562135ad48b2bb64801540244fd567dfdf8f6bfb44e3479c4e3da0840837f1074b30ae00c379f0d45d32cbdbb846ace00f80fc4ada500c15a80bc0000000049454e44ae426082', ('mon_album_photo', 'pgbadger-icon.png'));
```

On peut vérifier que le fichier est bien créé sur disque :

    &#36; ls -la /var/www/albums/gilles/famille/pgbadger.png
    -rw-r--r-- 1 postgres postgres 520 janv. 23 12:30 /var/www/albums/gilles/famille/pgbadger.png

Suivant votre modèle de données, il vous faut une table qui va stocker les
méta-données relatives à ces fichiers externes, par exemple :

```
    CREATE TABLE mon_album (
        id bigserial primary key,
	username name,
	filesize bigint,
	mime_type text,
        the_file efile
    );
```

La table utilise un type utilisateur créé par l'extension ```efile```, voici
la définition de ce type :

```
    CREATE TYPE efile AS (
        directory name,
        filename varchar(256)
    );
```

Passons ensuite à l'ajout des informations sur le fichier que l'on vient
d'enregistrer :

```
    INSERT INTO mon_album VALUES (1, 'gilles', 520, 'images/pgn', ('mon_album_photo','pgbadger.png'));
```

Il est notamment possible de faire une copie du fichier par l'interface SQL :

```
    SELECT copyefile(('mon_album_photo','pgbadger.png'),('mon_album_photo','copie_de_pgbadger.png'))
```

Voilà, vous avez à peu près les BFILE d'Oracle dans PostgreSQL. Reportez vous
à la documentation de l'extension pour plus d'explications.

Cette extension n'est pas parfaite et ne résoud pas toutes les problématiques,
mais cela peut être une solution simple à ce que vous voulez faire. Il faut
cependant prendre en compte la sauvegarde et la réplication de ces fichiers,
qui doivent être traitées en parallèle des solutions internes à PostgreSQL.

Au niveau de la performance en entrée / sortie elle est généralement sans importance.
Le chargement devrait être peu utilisé comparativement aux autres requêtes, l'idée
du BFILE est quand même celui d'un "pointeur" vers quelque chose de défini et
utilisé par des moyens externes. D'ailleurs ce chargement direct n'existe pas non
plus pour les BFILE sous Oracle.

N'hésitez pas à faire des remarques et à remonter les dysfonctionnements via
le dépôt github : https://github.com/darold/external_file . Toute contribution
est aussi la bienvenue.

Si vous ne savez pas comment importer directement vos fichiers sous forme de
donnée bytea, voici une fonction qui peut être utilisée pour avoir la donnée
au format bytea du logo de pgbadger :

```
    CREATE OR REPLACE FUNCTION bytea_import(p_path text, p_result out bytea) 
    AS &#36;&#36;
    DECLARE
      l_oid oid;
      r record;
    BEGIN
      p_result := '';
      SELECT lo_import(p_path) INTO l_oid;
      FOR r IN ( select data 
                 from pg_largeobject 
                 where loid = l_oid 
                 order by pageno ) LOOP
        p_result = p_result || r.data;
      END LOOP;
      PERFORM lo_unlink(l_oid);
    END;
    &#36;&#36;
    LANGUAGE PLPGSQL;
    
    CREATE TABLE bytea_tbl (file_content bytea);
    INSERT INTO bytea_tbl(file_content) SELECT bytea_import('/tmp/pgbadger.png');
```

Il ne me reste plus qu'a faire un SELECT dans la table bytea_tbl pour obtenir
la donnée bytea.

