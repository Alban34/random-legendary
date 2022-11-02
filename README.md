# Another Legendary Marvel randomizer
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)

Looking for more variety in my games, I wrote this randomizer that stores your previous games so that the groups used previously will not be selected.
This is a fan made randomizer for Legendary Marvel, unofficial software.

## How to use it?

### Pre-requisites
To use it, you will need nodejs.

### Install dependencies
Once the project is cloned, just run `npm install` to install required dependencies.

### Run the randomizer
Once the dependencies are installed you have 2 options:
- run `npm run start:console` to have a command line user interface
- run `npm run start:web` to connect to http://localhost:3000 with your web browser to have a web user interface

If you play solo, only the advanced solo rules from the Dark City extension will be applied for now.

### Files
This app works based on 3 files:
- games.json: it will be created by randomizing your first game: it will store which mastermind, scheme, villains, henchmen and heroes you already played, so that they will not be selected on your next game.
- extensions.json: it will be created when storing your first selection of extensions.
- scores.json: it will be created when storing your first score.

## Known extensions
So far, the cards that are randomly chosen come from:
- Ant-Man
- Champions
- Civil War
- Core Set
- Dark City
- Doctor Strange and the Shadows of Nightmare
- Guardians of the Galaxy
- Heroes of Asgard
- Paint the Town Red
- S.H.I.E.L.D.
- Secret Wars, Volume 1
- Secret Wars, Volume 2
- The New Mutants
- World War Hulk

## What's next?
This is a very early version of the randomizer that addresses only my personal needs (with only my personally owned extensions).
I will add more extensions in the future (as I acquired them ;)).
I may also:
- improve bystanders and master strike requirements base on the scheme setup.
- display a history of the games with the most used cards and the best scores
- give possibility to enter multiple scores for a given game (depending on number of players)
- create an executable app for ease of use
- implement the core solo rules
- make it "multi-tenant" so that heruko deployment can be used by everyone

## Quick try
If you do not want to install it locally to try it, you can go to [the heroku deployment](http://marvel-legendary-randomizer.herokuapp.com/)

/!\ Be aware that this is for demo only, all your data might be lost at anytime and might be changed by any other user connecting to this URL.

## Disclaimer
This software is not affiliated to Upper Deck nor Marvel. 

If by any means, distributing the name of the cards violates any copyright, I will remove them from the source repository.

Finally, this software is for personal use only, this is not meant to be sold. 
