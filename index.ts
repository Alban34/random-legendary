import { CardDrawer } from './card-drawer';
import { DataManager } from './data-manager';

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

let game = {};

const cardDrawer = new CardDrawer();
const dataManager = new DataManager();

const legendaryBase = dataManager.loadData();

game = {
    ...game, ...cardDrawer.drawRandomUnique(legendaryBase.masterminds, 'mastermind'),
    ...cardDrawer.drawRandomUnique(legendaryBase.schemes, 'scheme'),
    ...cardDrawer.drawRandomMultiple(legendaryBase.villains, 'villain', villainsCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.henchmen, 'henchman', henchmenCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.heroes, 'hero', heroesCount),
    ...{ 'bystanders': bystandersCount }
};

console.log(game);

dataManager.saveData(legendaryBase);
