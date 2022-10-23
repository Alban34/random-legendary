import { GameManager } from '../../game/game-manager';
import { ALL_CARDS } from '../../card/base-cards';
import { CardManager } from '../../card/card-manager';
import { CardLoader } from '../../card/card-loader';
import { CardWebViewer } from './card-web-viewer';
import { PlayerConfig } from '../../game/player-config';
import { GameBuilder } from '../../game/game-builder';
import { GameConsoleViewer } from '../console/game-console-viewer';
import { GameDataManager } from '../../game/game-data-manager';
import { GameWebViewer } from './game-web-viewer';

export class SetupWebViewer {

    private choices;
    private cardManager = new CardManager();
    private cardLoader = new CardLoader();
    private dataManager = new GameDataManager();

    constructor() {
        this.choices = [];
        const gameManager = new GameManager();
        const availableGamesForScore = gameManager.loadRegisteredGameWithNoScore(ALL_CARDS);
        if (availableGamesForScore.length > 0) {
            this.choices.push({ label: 'Enter a game score', path: '/enterScore' });
        }
        this.choices.push(...[
            { label: 'Select your extensions', path: '/showExtensions' },
            { label: 'Show all available cards', path: '/showAllCards' },
            { label: 'Show my cards (from selected extensions)', path: '/showMyCards' }]);
    }

    public showUI(): string {
        let webChoices = `
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Start new game
                    </button>
                    <ul class="dropdown-menu" style="">
                        <li><a class="dropdown-item" href="/newGame?playerCount=1">Solo</a></li>
                        <li><a class="dropdown-item" href="/newGame?playerCount=1">Advanced Solo</a></li>
                        <li><a class="dropdown-item" href="/newGame?playerCount=2">2 players</a></li>
                        <li><a class="dropdown-item" href="/newGame?playerCount=3">3 players</a></li>
                        <li><a class="dropdown-item" href="/newGame?playerCount=4">4 players</a></li>
                        <li><a class="dropdown-item" href="/newGame?playerCount=5">5 players</a></li>
                    </ul>
                </div>`;

        this.choices.forEach(choice => webChoices += `<a href="${choice.path}">${choice.label}</a>`);
        return webChoices;
    }

    public showExtensions(): string {

        const cardLoader = new CardLoader();
        const cardManager = new CardManager();
        const allExtensions = cardManager.getAvailableExtensions(ALL_CARDS);
        let selectedExtensions = cardLoader.loadExtensions();
        if (selectedExtensions.length === 0) {
            selectedExtensions = allExtensions;
        }

        const availableExtensionsAsWeb = allExtensions.map((ext) => {
            return `
                <div class="input-group mb-2">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" 
                           type="checkbox" 
                           id="${ext}" 
                           name="ext"
                           value="${ext}"
                           ${selectedExtensions.indexOf(ext) !== -1 ? 'checked' : ''}>
                    <label style="margin-left: 10px" for="${ext}">${ext}</label>
                  </div>
                </div>
            `;
        });
        return `
            <form action="/saveExtensions" method="post">
                ${availableExtensionsAsWeb.join('')}
                <button class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        `;
    }

    /**
     * Show known cards
     * @param all if true (default) show all cards known by the app. Otherwise, show only the cards of the user own extensions.
     */
    public showCards(all = true): string {
        const cardViewer = new CardWebViewer();

        if (all) {
            return cardViewer.getDisplayableCards(ALL_CARDS);
        }

        const cardList = this.cardManager.filterAllCards(ALL_CARDS, this.cardLoader.loadExtensions());
        return cardViewer.getDisplayableCards(cardList);
    }

    public startGame(playerCount: number): string {

        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();

        const cardList = this.cardManager.filterAllCards(ALL_CARDS, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

        this.dataManager.saveData(ALL_CARDS);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerCount, game);
    }

}
