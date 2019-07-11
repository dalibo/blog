---
layout: post
title:  Bug des droits fsync, PostgreSQL 9.4.1, 9.3.6, 9.2.10, 9.1.15 et 9.0.19
author: Ronan Dunklau
twitter_id: dalibo
github_id: dalibo
tags: [postgresql, sécurité, upgrade 9]

---


Le 22 mai 2015, le projet PostgreSQL a publié un ensemble de mises à jour pour toutes les versions supportées de PostgreSQL. Un des correctifs apportés par ces mises à jour forçait un appel à fsync pour tous les fichiers de PostgreSQL lors d'un redémarrage suite à un crash. Ce correctif a été ajouté pour empêcher certains types de corruption de données qui peuvent se produire lorsque le système hébergeant la base de données subit plusieurs pannes d'affilée.

Malheureusement, ce correctif pose des problèmes sur certaines installations de PostgreSQL en raison de droits sur les fichiers, qui peuvent empêcher PostgreSQL de redémarrer après un arrêt inattendu, ou lors d'une restauration de sauvegarde binaire (PITR).

<!--MORE-->

Qui est concerné par ce bug ?
-----------------------------

Les utilisateurs qui:

  * ont appliqué les mises à jour 9.4.2, 9.3.7, 9.2.11, 9.1.16 ou 9.0.20 ;
  * ont un ou plusieurs fichiers, répertoires, ou lien symboliques n'appartenant pas à l'utilisateur postgres (ou tout utilisateur possédant l'instance) situés dans le répertoire de données PostgreSQL (PGDATA).

Le second critère est répandu sur les installations de PostgreSQL activant SSL sur Debian et Ubuntu, pour les versions 9.1, 9.0 et antérieures, mais d'autres utilisateurs peuvent être affectés aussi. La plupart des utilisateurs sur d'autres plateformes ne sont pas impactés, puisque tous les fichiers et liens dans PGDATA appartiennent à l'utilisateur système postgres par défaut.

Quels sont les symptômes ?
--------------------------

Si vous êtes victime de ce bug, PostgreSQL refusera de redémarrer après un crash, ou de restaurer depuis une sauvegarde binaire, avec un message d'erreur ressemblant à celui-ci :

    * Starting PostgreSQL 9.1 database server
    * The PostgreSQL server failed to start. Please check the log output:
    2015-05-26 03:27:20 UTC [331-1] LOG:  database system was interrupted; last known up at 2015-05-21 19:56:58 UTC
    2015-05-26 03:27:20 UTC [331-2] FATAL:  could not open file "/etc/ssl/certs/ssl-cert-snakeoil.pem": Permission denied
    2015-05-26 03:27:20 UTC [330-1] LOG:  startup process (PID 331) exited with exit code 1
    2015-05-26 03:27:20 UTC [330-2] LOG:  aborting startup due to startup process failure

Pour plus d'informations, veuillez consulter le rapport de bug initial : http://www.postgresql.org/message-id/20150525142657.4686.35151@wrigleys.postgresql.org


Je suis affecté par ce bug, et n'arrive pas à redémarrer PostgreSQL, que puis-je faire ?
----------------------------------------------------------------------------------------

Un contournement temporaire consiste à modifier les droits de tout fichier pointé par un lien symbolique pour donner le droit d'écriture à l'utilisateur système postgres. Par exemple, sur Ubuntu avec PostgreSQL 9.1, les étapes suivantes permettent de corriger le problème :

    # (en tant que root)
    cd /var/lib/postgresql/9.1/main
    
    # Suppression des liens symboliques vers les certificats SSL
    rm server.crt
    rm server.key 
    
    # copie des certificats SSL vers le répertoire local
    cp /etc/ssl/certs/ssl-cert-snakeoil.pem server.crt
    cp /etc/ssl/private/ssl-cert-snakeoil.key server.key
    
    # positionnement des droits sur les certificats SSL,
    # et transfert de la propriété des fichiers à l'utilisateur postgres pour le reste,
    # par principe de précaution.
    chown postgres *
    chmod 640 ssl*

service postgresql start

Bien entendu, l'exemple précédent est à adapter à votre situation personnelle. L'objectif est de donner l'accès en écriture à l'utilisateur système postgres à l'ensemble des fichiers, ou fichiers pointés par des liens symboliques, résidant dans le répertoire PGDATA.

Dois-je éviter cette mise à jour ?
----------------------------------


Les mises à jour 9.4.2 et 9.3.7 corrigent un bug conséquent causant des pertes de données irrécupérables sous certaines conditions. En tant que tel, le projet PostgreSQL considère que le risque lié au contournement temporaire sur les droits de fichiers est bien moins important que les bugs corrigés, et recommande donc d'appliquer les mises à jour une fois les droits vérifiés et corrigés si nécessaire.

Les utilisateurs qui ne sont pas concernés par le problème lié à fsync sont également encouragés à appliquer la mise à jour lors de la prochaine période de maintenance.

Cela sera-t-il corrigé rapidement ?
-----------------------------------

La communauté PostgreSQL prévoit une nouvelle mise à jour imminente pour tenir compte du problème de droits sur le fichier. La date de sortie est estimée au 4 juin.

