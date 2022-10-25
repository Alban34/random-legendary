# Another Legendary Marvel randomizer

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
- run `npm run start:web` to connect to http://localhost:9615 with your web browser to have a web user interface

If you play solo, only the advanced solo rules from the Dark City extension will be applied for now.

### Files
This app works based on 3 files:
- assets/legendary.json: it contains the basic information about cards that are needed for the app
- games.json: it will be created by randomizing your first game: it will store which mastermind, scheme, villains, henchmen and heroes you already played, so that they will not be selected on your next game.
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
- Secret Wars, Volume 1
- Secret Wars, Volume 2
- The New Mutants

## What's next?
This is a very early version of the randomizer that addresses only my personal needs (with only my personally owned extensions).
I will add more extensions in the future (as I acquired them ;)).
I may also:
- set up the "Always lead" constraints of the Masterminds (implemented but information is not fully set in card reference file).
- display a history of the games with the most used cards and the best scores
- create an executable app for ease of use
- implement the core solo rules
- make it "multi-tenant" so that heruko deployment can be used by everyone

## Disclaimer
This software is not affiliated to Upper Deck nor Marvel. 

If by any means, distributing the name of the cards violates any copyright, I will remove them from the source repository.

Finally, this software is for personal use only, this is not meant to be sold. 
