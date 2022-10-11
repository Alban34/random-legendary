import { CardDrawer } from './card-drawer';
import { DataManager } from './data-manager';
import { PlayerConfig } from './player-config';
import { GameViewer } from './game-viewer';
import { GameBuilder } from './game-builder';

const inquirer = require('inquirer');

const question = [
    {
        name: 'playerCount',
        type: 'number',
        default: 1,
        message: 'How many players will participate to this game?'
    }
];

inquirer.prompt(question)
    .then(answer => {
        const playerCount = answer.playerCount;

        const dataManager = new DataManager();
        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();
        const legendaryBase = dataManager.loadData();

        const game = gameBuilder.buildGame(legendaryBase, playerConfig);

        dataManager.saveData(legendaryBase);

        const gameViewer = new GameViewer();
        console.log(gameViewer.buildView(playerCount, game));

    });
