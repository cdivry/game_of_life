# LE JEU DE LA VIE


## Introduction

Le jeu de la vie est un automate cellulaire, Turing-complet, imaginé par John Horton Conway.

C'est un « jeu à zéro joueur », puisqu'il ne nécessite pas l'intervention du joueur lors de son déroulement.

Il s’agit d’un automate cellulaire, un modèle où chaque état conduit mécaniquement à l’état suivant à partir de règles pré-établies.

![Jeu de la vie](https://raw.githubusercontent.com/cdivry/game_of_life/master/img/illustration.png)

*Jeu de la vie stabilisé après 1000 itérations. On peut y appercevoir différentes structures reconnaissables, comme des carrés stables, des oscillateurs, et aussi quelques vaisseaux.*



## Règles

Le jeu se déroule sur une grille à deux dimensions, théoriquement infinie (mais de longueur et de largeur finies et plus ou moins grandes dans la pratique), dont les cases — qu’on appelle des « cellules », par analogie avec les cellules vivantes — peuvent prendre deux états distincts : « vivante » ou « morte ».

Une cellule possède huit voisins, qui sont les cellules adjacentes horizontalement, verticalement et diagonalement.

À chaque étape, l’évolution d’une cellule est entièrement déterminée par l’état de ses huit voisines de la façon suivante :

- Une chute de « bombes » non périodique.

- une cellule morte possédant exactement trois voisines vivantes devient vivante (elle naît) ;

- une cellule vivante possédant deux ou trois voisines vivantes le reste, sinon elle meurt.



## Edition

Taille de la boite de pétri :
var MAP = {WIDTH: 128, HEIGHT: 72}

Le pixel rouge suit votre curseur, et crée de la vie au moindre clic !
