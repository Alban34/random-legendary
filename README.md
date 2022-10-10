# Another Legendary Marvel randomizer

Looking for more variety in my games, I wrote this randomizer that stores your previous games so that the groups used previously will not be selected.
This is a fan made randomizer for Legendary Marvel, unofficial software.

## How to use it?

### Pre-requisites
To use it, you will need nodejs.

### Install dependencies
Once the project is cloned, just run `npm install` to install required dependencies.

### Run the randomizer
Once the dependencies are installed, run `npm run start`.
You will be prompted for the number of player to attend this game.
If you play solo, the advanced solo rules from the Dark City extension will be applied.

### Files
This app works based on 2 files:
- assets/legendary.json: it contains the basic information about cards that are needed for the app
- games.json: it will be created by randomizing your first game: it will store which mastermind, scheme, villains, henchmen and heroes you already played, so that they will not be selected on your next game.

## What's next?
This is a very early version of the randomizer that addresses only my personal needs (with only my personally owned extensions).
I will add more extensions in the future (as I acquired them ;)).
I may also:
- setup the "Always lead" constraints of the Masterminds (which is not taken into account for now).
- save the score and date for a given game
- create an executable app for ease of use
