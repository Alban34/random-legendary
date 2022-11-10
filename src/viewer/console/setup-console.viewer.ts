import inquirer from 'inquirer';
import { CardConsoleViewer } from './card-console-viewer';
import { GameDataManager } from '../../game/game-data-manager';
import { CardLoader } from '../../card/card-loader';
import { GameManager } from '../../game/game-manager';
import { CardManager } from '../../card/card-manager';
import { PlayerConfig } from '../../game/player-config';
import { GameBuilder } from '../../game/game-builder';
import { GameConsoleViewer } from './game-console-viewer';
import { FileDataManager } from '../../data/file-data-manager';

export class SetupConsoleViewer {

    private readonly legendaryBase;
    private dataManager = new FileDataManager();
    private gameDataManager = new GameDataManager(this.dataManager);
    private cardLoader = new CardLoader(this.dataManager);
    private gameManager = new GameManager(this.gameDataManager);
    private cardManager = new CardManager();

    private readonly availableGamesForScore;
    private selectedExtensions;

    private questions = [
        {
            name: 'option',
            type: 'list',
            choices: () => this.getInitialChoices(),
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
            choices: () => this.availableGamesForScore(),
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
            choices: () => this.loadExtensions(),
            message: 'Which extensions do you want to play with?',
            when: (answer => answer.option === 'Select your extensions'),
            default: () => this.selectedExtensions
        }

    ];

    constructor() {
        this.legendaryBase = this.cardLoader.loadData();
        this.availableGamesForScore = () => this.gameManager.loadRegisteredGameWithNoScore(this.legendaryBase);
        this.selectedExtensions = this.cardLoader.loadExtensions();
        if (this.selectedExtensions.length === 0) {
            this.selectedExtensions = this.cardManager.getAvailableExtensions(this.legendaryBase);
        }
    }

    public showUI() {
        inquirer.prompt(this.questions)
            .then(answer => {
                if (answer.option === 'Show all available cards') {
                    this.showAllCards();
                }
                if (answer.option === 'Show my cards (from selected extensions)') {
                    this.showMyCards(this.selectedExtensions);
                }
                if (answer.playerCount) {
                    this.startGame(answer.playerCount);
                }
                if (answer.score) {
                    this.recordScore(answer.gameId, answer.score);
                }
                if (answer.extensions) {
                    this.selectedExtensions = answer.extensions;
                    this.cardLoader.saveExtensions(this.selectedExtensions);
                }

                if (answer.option !== 'Quit') {
                    this.showUI();
                }
            });
    }

    private getInitialChoices() {
        const choices = ['Start a new game'];
        if (this.availableGamesForScore().length > 0) {
            choices.push('Enter a game score');
        }
        choices.push(...['Select your extensions', 'Show all available cards', 'Show my cards (from selected extensions)', 'Quit']);
        return choices;
    }

    private showAllCards() {
        const cardViewer = new CardConsoleViewer();
        console.log(cardViewer.getDisplayableCards(this.legendaryBase));
    }

    private showMyCards(extensions: string[]) {
        const cardList = this.cardManager.filterAllCards(this.legendaryBase, extensions);
        const cardViewer = new CardConsoleViewer();
        console.log(cardViewer.getDisplayableCards(cardList));
    }

    private startGame(playerCount: number) {

        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();

        const cardList = this.cardManager.filterAllCards(this.legendaryBase, this.selectedExtensions);
        const game = gameBuilder.buildGame(cardList, playerConfig);

        this.gameDataManager.saveData(this.legendaryBase);

        const gameViewer = new GameConsoleViewer();
        console.log(gameViewer.buildView(playerCount, game));
    }

    private recordScore(gameId: string, score: number) {
        let intro = `Congratulation for scoring ${score} on game with id '${gameId}'.`;
        if (score < 0) {
            intro = `Sorry to hear you lost the game with id '${gameId}'.`;
        }
        console.log(`${intro}\nYour score has been saved in scores.json file.`);
        this.gameDataManager.saveScore(gameId, [{ score, player: 'player' }]);
    }

    private loadExtensions() {
        const availableExtensions = this.cardManager.getAvailableExtensions(this.legendaryBase).map(ext => {
            return {
                'value': ext, disabled: false
            };
        });
        availableExtensions.push({ value: '(End of the list)', disabled: true });
        return availableExtensions;
    }

}
