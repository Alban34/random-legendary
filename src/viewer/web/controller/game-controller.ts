import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { GAME_MODE, PlayerConfig } from '../../../game/player-config';
import { GameBuilder } from '../../../game/game-builder';
import { GameWebViewer } from '../game-web-viewer';
import { CardLoader } from '../../../card/card-loader';
import { CardManager } from '../../../card/card-manager';
import { GameDataManager } from '../../../game/game-data-manager';
import TYPES from '../../../types';
import { GameManager } from '../../../game/game-manager';
import { GameLoader } from '../../../game/game-loader';
import { Card } from '../../../card/model/card';
import { DataManager } from '../../../data/data-manager.interface';
import { Scores } from '../../../game/model/scores';
import { CardWebViewer } from '../card-web-viewer';
import * as express from 'express';
import { GameCustomParser } from '../../../game/game-custom.parser';
import { PredefinedGame } from '../../../game/model/predefined-game';

@controller('/game')
export class GameController extends AbstractController {

    constructor(
        @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
        @inject(TYPES.GameDataManager) private readonly dataGameManager: GameDataManager,
        @inject(TYPES.GameManager) private readonly gameManager: GameManager,
        @inject(TYPES.GameLoader) private readonly gameLoader: GameLoader,
        @inject(TYPES.DataManager) private readonly dataManager: DataManager,
    ) {
        super();
    }

    @httpGet('/new/:playerCount')
    public get(request: Request): string {
        const gameMode = Number.parseInt(request['params'].playerCount, 10);
        return this.writeHTMLResponse(this.startGame(gameMode));
    }

    @httpGet('/custom/new')
    public getCustom(): string {
        const cardViewer = new CardWebViewer(true);

        const allCardList = this.cardLoader.loadData();
        const extensions = this.cardLoader.loadExtensions();

        const view = `
            <section class="page-stack">
                <section class="page-section">
                    <div class="page-section__header">
                        <div>
                            <span class="eyebrow">Curated encounter</span>
                            <h2 class="page-section__title">Select the cards for the game</h2>
                            <p class="page-section__subtitle">Compose a dream matchup with your own hand-picked mastermind, scheme, villains, henchmen, and heroes.</p>
                        </div>
                    </div>
                    <form method="post" action="/game/custom/create" class="page-stack">
                        <div class="hero-panel">
                            <label class="summary-item d-inline-flex flex-column gap-2">
                                <span class="summary-item__label">Game mode</span>
                                <select class="form-select" name="gameMode">
                                    <option value="0">Solo</option>
                                    <option value="1">Advanced Solo</option>
                                    <option value="2">2 players</option>
                                    <option value="3">3 players</option>
                                    <option value="4">4 players</option>
                                    <option value="5">5 players</option>
                                </select>
                            </label>
                        </div>
                        ${cardViewer.showCardsByGroup(allCardList, extensions)}
                        <button type="submit" class="btn btn-primary btn-lg align-self-start">Start game with selected cards</button>
                    </form>
                </section>
            </section>
        `;

        return this.writeHTMLResponse(view);
    }

    @httpPost('/custom/create')
    public createCustom(@response() res: express.Response,
                        @requestBody() body: any) {
        const gameCustomParser = new GameCustomParser();
        const predefinedGame = gameCustomParser.parse(body);
        const gameMode = Number.parseInt(body.gameMode, 10);
        return this.writeHTMLResponse(this.startGame(gameMode, predefinedGame));
    }

    @httpGet('/history')
    public getHistory(): string {
        return this.writeHTMLResponse(this.showHistory());
    }

    private startGame(gameMode: number, predefinedGame?: PredefinedGame): string {
        const cardManager = new CardManager();

        const playerConfig = new PlayerConfig(gameMode);
        const gameBuilder = new GameBuilder();

        const allCardList = this.cardLoader.loadData();
        const cardList = cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig, predefinedGame);

        this.dataGameManager.saveData(allCardList);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerConfig.playerCount, game);
    }

    private getMultipleCards(cards: Card[]): string {
        let view = '<ul>';
        cards.forEach(card => view += `<li>${card.name}</li>`);
        view += '</ul>';
        return view;
    }

    private getScores(allScores: Scores, gameId: string): string {
        let lost = false;
        let view = '';
        if (!allScores[gameId]) {
            return 'No score yet';
        }
        const config: PlayerConfig = PlayerConfig.extractPlayerConfigFromGameId(gameId);
        let showPlayerName = true;
        allScores[gameId].forEach(s => {
            if (s.score === -1) {
                lost = true;
            }
            let startWith = `${s.player}: `;
            if (!showPlayerName) {
                startWith = ` | `;
            }
            view += `${startWith} ${s.score}`;
            if (config.getGameMode() === GAME_MODE.TWO_HANDED_SOLO || config.getGameMode() === GAME_MODE.THREE_HANDED_SOLO) {
                showPlayerName = false;
            } else {
                view += `<br/>`;
            }
        });
        if (lost) {
            view = 'Game lost';
        }
        return view;
    }

    private showHistory() {
        const allCardList = this.cardLoader.loadData();
        const allScores = this.dataManager.readScores();
        const allGames = this.gameManager.loadRegisteredGame(allCardList);

        if (allGames.length === 0) {
            return `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">No game found</h4>
                    <p>There is no history to be displayed yet. Please start a new game first.</p>
                </div>`;
        }

        let view = `
            <section class="page-stack">
                <section class="page-section">
                    <div class="page-section__header">
                        <div>
                            <span class="eyebrow">Archive</span>
                            <h2 class="page-section__title">Show my history</h2>
                            <p class="page-section__subtitle">Review every generated setup, revisit your heroes, and compare the outcome of previous sessions.</p>
                        </div>
                    </div>
                    <div class="summary-grid mb-3">
                        <div class="summary-item">
                            <span class="summary-item__label">Recorded games</span>
                            <span class="summary-item__value">${allGames.length}</span>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Mastermind</th>
                                    <th scope="col">Scheme</th>
                                    <th scope="col">Villains</th>
                                    <th scope="col">Henchmen</th>
                                    <th scope="col">Heroes</th>
                                    <th scope="col">Scores</th>
                                </tr>
                            </thead>
                            <tbody>`;
        allGames.forEach(gameId => {
            const game = this.gameLoader.load(allCardList, gameId);
            const score = this.getScores(allScores, gameId);
            let rowClass;
            switch (score) {
                case 'No score yet':
                    rowClass = 'table-light';
                    break;
                case 'Game lost':
                    rowClass = 'table-danger';
                    break;
                default:
                    rowClass = 'table-success';
            }
            view += `
                    <tr class="${rowClass}">
                        <td>${game.mastermind.name}</td>
                        <td>${game.scheme.name}</td>
                        <td>${this.getMultipleCards(game.villains)}</td>
                        <td>${this.getMultipleCards(game.henchmen)}</td>
                        <td>${this.getMultipleCards(game.heroes)}</td>
                        <td>${score}</td>
                    </tr>
            `;
        });
        view += `
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        `;
        return view;
    }
}
