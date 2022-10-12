import { DataManager } from './data-manager';
import { PlayerConfig } from './player-config';
import { GameViewer } from './game-viewer';
import { GameBuilder } from './game-builder';
import { GameManager } from './game-manager';

const inquirer = require('inquirer');

const dataManager = new DataManager();
const legendaryBase = dataManager.loadData();
const gameManager = new GameManager();
const availableGamesForScore = gameManager.loadRegisteredGame(legendaryBase);

const buildInitialQuestion = () => {
    const choices = ['Start a new game'];
    if (availableGamesForScore.length > 0) {
        choices.push('Enter a game score');
    }
    return choices;
};

const questions = [
    {
        name: 'option',
        type: 'list',
        choices: () => buildInitialQuestion(),
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
        type: 'list',
        choices: availableGamesForScore,
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

    const playerConfig = new PlayerConfig(playerCount);
    const gameBuilder = new GameBuilder();

    const game = gameBuilder.buildGame(legendaryBase, playerConfig);

    dataManager.saveData(legendaryBase);

    const gameViewer = new GameViewer();
    console.log(gameViewer.buildView(playerCount, game));
};

const recordScore = (gameId: string, score: number) => {
    console.log(`Congratulation for scoring ${score} on game with id '${gameId}'.\nYour score has been saved in scores.json file.`);
    dataManager.saveScore(gameId, score);
};
