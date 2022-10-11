import { DataManager } from './data-manager';
import { PlayerConfig } from './player-config';
import { GameViewer } from './game-viewer';
import { GameBuilder } from './game-builder';

const inquirer = require('inquirer');

const questions = [
    {
        name: 'option',
        type: 'list',
        choices: ['Start a new game', 'Enter a game score'],
        default: 0
    },
    {
        name: 'playerCount',
        type: 'number',
        default: 1,
        message: 'How many players will participate to this game?',
        when: (answer => answer.option === 'Start a new game')
    },
    {
        name: 'gameId',
        type: 'string',
        message: 'Which is the id of the game you played?',
        when: (answer => answer.option === 'Enter a game score')
    },
    {
        name: 'score',
        type: 'number',
        message: 'What is your score?',
        when: (answer => answer.gameId)
    }

];

inquirer.prompt(questions)
    .then(answer => {
        if (answer.playerCount) {
            startGame(answer.playerCount);
        }
        if (answer.score) {
            recordScore(answer.gameId, answer.score);
        }
    });

const startGame = (playerCount: number) => {

    const dataManager = new DataManager();
    const playerConfig = new PlayerConfig(playerCount);
    const gameBuilder = new GameBuilder();
    const legendaryBase = dataManager.loadData();

    const game = gameBuilder.buildGame(legendaryBase, playerConfig);

    dataManager.saveData(legendaryBase);

    const gameViewer = new GameViewer();
    console.log(gameViewer.buildView(playerCount, game));
};

const recordScore = (gameId: string, score: number) => {
    console.log(`Congratulation for scoring ${score} on game with id ${gameId}`);
}

