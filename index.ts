import { CardDrawer } from './card-drawer';
import { DataManager } from './data-manager';
import { PlayerConfig } from './player-config';
import { GameViewer } from './game-viewer';

const playerCount: number = 1;

let game = {};

const cardDrawer = new CardDrawer();
const dataManager = new DataManager();
const playerConfig = new PlayerConfig(playerCount);

const legendaryBase = dataManager.loadData();

game = {
    ...game, ...cardDrawer.drawRandomUnique(legendaryBase.masterminds, 'mastermind'),
    ...cardDrawer.drawRandomUnique(legendaryBase.schemes, 'scheme'),
    ...cardDrawer.drawRandomMultiple(legendaryBase.villains, 'villain', playerConfig.villainsCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.henchmen, 'henchman', playerConfig.henchmenCount),
    ...cardDrawer.drawRandomMultiple(legendaryBase.heroes, 'hero', playerConfig.heroesCount),
    ...{ 'bystanders': playerConfig.bystandersCount }
};

dataManager.saveData(legendaryBase);

const gameViewer = new GameViewer();
console.log(gameViewer.buildView(playerCount, game));
