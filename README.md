# Another Legendary Marvel randomizer
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Alban34_random-legendary&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Alban34_random-legendary)

Looking for more variety in my games, I wrote this randomizer that stores your previous games so that the groups used previously will not be selected.
This is a fan made randomizer for Legendary Marvel, unofficial software.

## How to use it?

### Pre-requisites
To use it, you will need nodejs.

#### Use the randomizer from the published bundle
>If you download the random-legendary.js bundle, you can run it by just entering the following command line: `node ./random-legendary.js`

Once running, you can connect to http://localhost:3000 to access the randomizer.

#### Installing from the source code

> First, clone the repository

Get all source code locally by cloning this GitHub repository.

> Then, install all dependencies

Run `npm install` to install required dependencies.

> Then, build the static resources

Run `npm build` to build all static resources (mainly css)

> Run the randomizer

Once the dependencies are installed you have 2 options:
- run `npm run start:console` to have a command line user interface (not recommended, I no longer use it)
- run `npm run start:web` to connect to http://localhost:3000 with your web browser to have a web user interface
- run `npm run start:client` to start a desktop version of the application, based on Electron toolbox

You can also build a standalone app with `npm run package:electron`. In the `out` folder, you should find the executable app that you can use rather than starting a web server.

If you play solo, both core and advanced solo rules can be used.

### Files
This app works based on 3 files:
- games.json: it will be created by randomizing your first game: it will store which mastermind, scheme, villains, henchmen and heroes you already played, so that they will not be selected on your next game.
- extensions.json: it will be created when storing your first selection of extensions.
- scores.json: it will be created when storing your first score.

## Known extensions
So far, the cards that are randomly chosen come from:
- Annihilation
- Ant-Man
- Black Panther
- Black Widow
- Captain America 75th Anniversary
- Champions
- Civil War
- Core Set
- Dark City
- Deadpool
- Dimensions
- Doctor Strange and the Shadows of Nightmare
- Fantastic Four
- Fear Itself
- Guardians of the Galaxy
- Heroes of Asgard
- Into the Cosmos
- Marvel Noir
- Marvel Studios' Guardians of the Galaxy
- Marvel Studios, Phase 1
- Messiah Complex
- Paint the Town Red
- Realm of Kings
- Revelations
- S.H.I.E.L.D.
- Secret Wars, Volume 1
- Secret Wars, Volume 2
- Spider-Man Homecoming
- The New Mutants
- Venom
- Villains
- World War Hulk
- X-Men

## What's next?
I may add the following features in the future:
- improve bystanders and master strike requirements base on the scheme setup
- display a history of the games with the most used cards and the best scores
- add some statistics on games and cards:
  - percentage of completion of user's collection on extension selection page
- add special setup rules for:
  - Avengers VS X-Men scheme
  - Organized Crime Wave
- add a button to replay a given game

## Known issue
- scheme cards that would add villains to the game break the player count guess mechanism, leading to a wrong player count in scoring page.

## Disclaimer
This software is not affiliated to Upper Deck nor Marvel. 

If by any means, distributing the name of the cards violates any copyright, I will remove them from the source repository.

Finally, this software is for personal use only, this is not meant to be sold. 
