import { GameManager } from '../../game/game-manager';
import { CardManager } from '../../card/card-manager';
import { CardLoader } from '../../card/card-loader';
import { CardWebViewer } from './card-web-viewer';
import { PlayerConfig } from '../../game/player-config';
import { GameBuilder } from '../../game/game-builder';
import { GameDataManager } from '../../game/game-data-manager';
import { GameWebViewer } from './game-web-viewer';
import { FileDataManager } from '../../data/file-data-manager';

export class SetupWebViewer {

    private dataManager = new FileDataManager();
    private cardManager = new CardManager();
    private cardLoader = new CardLoader(this.dataManager);
    private dataGameManager = new GameDataManager(this.dataManager);
    private gameManager = new GameManager(this.dataManager);

    public showUI(): string {
        const choices = [];
        const availableGamesForScore = this.gameManager.loadRegisteredGameWithNoScore(this.cardLoader.loadData());
        if (availableGamesForScore.length > 0) {
            choices.push({ label: 'Enter a game score', path: '/enterScore' });
        }
        choices.push(...[
            { label: 'Select your extensions', path: '/showExtensions' },
            { label: 'Show all available cards', path: '/showAllCards' },
            { label: 'Show my cards (from selected extensions)', path: '/showMyCards' }]);

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

        choices.forEach(choice => webChoices += `<a href="${choice.path}">${choice.label}</a>`);
        return webChoices;
    }

    public showExtensions(): string {
        const allExtensions = this.cardManager.getAvailableExtensions(this.cardLoader.loadData());
        let selectedExtensions = this.cardLoader.loadExtensions();
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

        const allCardList = this.cardLoader.loadData();
        if (all) {
            return cardViewer.getDisplayableCards(allCardList);
        }

        const cardList = this.cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        return cardViewer.getDisplayableCards(cardList);
    }

    public startGame(playerCount: number): string {

        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();

        const allCardList = this.cardLoader.loadData();
        const cardList = this.cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

        this.dataGameManager.saveData(allCardList);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerCount, game);
    }

    public showAvailableGameForScore(): string {
        const allCardList = this.cardLoader.loadData();
        const allAvailableGamesForScore = this.gameManager.loadRegisteredGameWithNoScore(allCardList);

        let webView = `
                <form action="/saveScores" method="post" class="scores">`;
        allAvailableGamesForScore.forEach(value => {
            webView += `
                    <div class="card">
                        <div class="card-header">
                            Game ID: ${value}
                        </div>
                        <div class="card-body">
                            <div>
                                Score: <input name="${value}:score" type="number">
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" 
                                    type="checkbox" 
                                    role="switch" 
                                    id="${value}:won" 
                                    name="${value}:won" 
                                    checked>
                                <label class="form-check-label" for="${value}:won">Game won</label>
                            </div>
                        </div>
                    </div>
            `;
        });
        webView += `
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>`;
        return webView;
    }
}
