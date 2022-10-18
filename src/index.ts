import { PlayerConfig } from './game/player-config';
import { GameViewer } from './game-viewer';
import { GameBuilder, GameManager, GameDataManager } from './game/game.module';
import { CardManager, CardLoader } from './card/card.module';
import { CardViewer } from './card-viewer';
import inquirer from 'inquirer';

const dataManager = new GameDataManager();
const cardLoader = new CardLoader();
const legendaryBase = cardLoader.loadData();
const gameManager = new GameManager();
const availableGamesForScore = () => gameManager.loadRegisteredGameWithNoScore(legendaryBase);
const cardManager = new CardManager();

let selectedExtensions = cardLoader.loadExtensions();
if (selectedExtensions.length === 0) {
    selectedExtensions = cardManager.getAvailableExtensions(legendaryBase);
}

const questions = [
    {
        name: 'option',
        type: 'list',
        choices: () => getInitialChoices(),
        default: 0
    },
    {
        name: 'playerCount',
        type: 'number',
        default: 1,
        message: 'How many players will participate to the game?',
        when: (answer => answer.option === 'Start a new game' || !answer.option)
    },
    {
        name: 'gameId',
        type: 'list',
        choices: () => availableGamesForScore(),
        message: 'Which is the id of the game you played?',
        when: (answer => answer.option === 'Enter a game score')
    },
    {
        name: 'score',
        type: 'number',
        message: 'What is your score? (enter -1 if you lost)',
        when: (answer => answer.gameId)
    },
    {
        name: 'extensions',
        type: 'checkbox',
        choices: () => loadExtensions(),
        message: 'Which extensions do you want to play with?',
        when: (answer => answer.option === 'Select your extensions'),
        default: () => selectedExtensions
    }

];

const init = () => {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer.option === 'Show all available cards') {
                showAllCards();
            }
            if (answer.option === 'Show my cards (from selected extensions)') {
                showMyCards(selectedExtensions);
            }
            if (answer.playerCount) {
                startGame(answer.playerCount);
            }
            if (answer.score) {
                recordScore(answer.gameId, answer.score);
            }
            if (answer.extensions) {
                selectedExtensions = answer.extensions;
                cardLoader.saveExtensions(selectedExtensions);
            }

            if (answer.option !== 'Quit') {
                init();
            }
        });
};

const getInitialChoices = () => {
    const choices = ['Start a new game'];
    if (availableGamesForScore().length > 0) {
        choices.push('Enter a game score');
    }
    choices.push(...['Select your extensions', 'Show all available cards', 'Show my cards (from selected extensions)', 'Quit']);
    return choices;
}

const showAllCards = () => {
    const cardViewer = new CardViewer();
    console.log(cardViewer.getDisplayableCards(legendaryBase));
};

const showMyCards = (extensions: string[]) => {
    const cardList = cardManager.filterAllCards(legendaryBase, extensions);
    const cardViewer = new CardViewer();
    console.log(cardViewer.getDisplayableCards(cardList));
};

const startGame = (playerCount: number) => {

    const playerConfig = new PlayerConfig(playerCount);
    const gameBuilder = new GameBuilder();

    const cardList = cardManager.filterAllCards(legendaryBase, selectedExtensions);
    const game = gameBuilder.buildGame(cardList, playerConfig);

    dataManager.saveData(legendaryBase);

    const gameViewer = new GameViewer();
    console.log(gameViewer.buildView(playerCount, game));
};

const recordScore = (gameId: string, score: number) => {
    let intro = `Congratulation for scoring ${score} on game with id '${gameId}'.`;
    if (score < 0) {
        intro = `Sorry to hear you lost the game with id '${gameId}'.`;
    }
    console.log(`${intro}\nYour score has been saved in scores.json file.`);
    dataManager.saveScore(gameId, score);
};

const loadExtensions = () => {
    const availableExtensions = cardManager.getAvailableExtensions(legendaryBase).map(ext => {
        return {
            'value': ext, disabled: false
        };
    });
    availableExtensions.push({ value: '(End of the list)', disabled: true });
    return availableExtensions;
};

init();
