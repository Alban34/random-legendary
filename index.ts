import { CardDrawer } from './card-drawer';

const fs = require('fs-extra');

const categories: string[] = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

const playerCount: number = 4;

let villainsCount = 1;
let henchmenCount = 1;
let heroesCount = 3;
let bystandersCount = 1;
switch (playerCount) {
    case 2: {
        villainsCount = 2;
        henchmenCount = 1;
        heroesCount = 5;
        bystandersCount = 2;
        break;
    }
    case 3: {
        villainsCount = 3;
        henchmenCount = 1;
        heroesCount = 5;
        bystandersCount = 8;
        break;
    }
    case 4: {
        villainsCount = 3;
        henchmenCount = 2;
        heroesCount = 5;
        bystandersCount = 8;
        break;
    }
    case 5: {
        villainsCount = 4;
        henchmenCount = 2;
        heroesCount = 6;
        bystandersCount = 12;
        break;
    }
    default: {
        // Use default values, aka solo game
        break;
    }
}


let rawdata = fs.readFileSync('legendary.json');
const legendaryBase = JSON.parse(rawdata);

let games = '';
if (fs.existsSync('games.json')) {
    rawdata = fs.readFileSync('games.json');
    games = JSON.parse(rawdata);

    categories.forEach(category => {
        if (legendaryBase[category]) {
            legendaryBase[category].forEach(baseValue => {
                if (games[category]) {
                    const saveCatValue = games[category].filter(m => m.name === baseValue.name);
                    if (saveCatValue && saveCatValue.length === 1) {
                        baseValue.count = saveCatValue[0].count;
                    }
                } else {
                    console.warn(`Unsaved category "${category}"`);
                }
            });
        } else {
            console.error(`Unknown category "${category}"`);
        }
    });
}


let game = {};

const cardDrawer = new CardDrawer();

game = {
    ...game, ...cardDrawer.drawRandomUnique(legendaryBase.masterminds, 'mastermind'),
    ...cardDrawer.drawRandomUnique(legendaryBase.schemes, 'scheme'),
    ...cardDrawer.drawRandomMultiple(legendaryBase.villains, 'villain', villainsCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.henchmen, 'henchman', henchmenCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.heroes, 'hero', heroesCount),
    ...{ 'bystanders': bystandersCount }
};

console.log(game);

const gamesToSave = {
    "masterminds": legendaryBase.masterminds,
    "schemes": legendaryBase.schemes,
    "villains": legendaryBase.villains,
    "henchmen": legendaryBase.henchmen,
    "heroes": legendaryBase.heroes
};
const data = JSON.stringify(gamesToSave);
fs.writeFileSync('games.json', data);
