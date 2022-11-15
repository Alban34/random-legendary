import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { PlayerConfig } from '../../../game/player-config';
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
        const gameMode = parseInt(request['params'].playerCount);
        return this.writeHTMLResponse(this.startGame(gameMode));
    }

    @httpGet('/history')
    public getHistory(): string {
        const allCardList = this.cardLoader.loadData();
        const allScores = this.dataManager.readScores();
        const allGames = this.gameManager.loadRegisteredGame(allCardList);
        let view = `
            <table class="table table-striped table-hover">
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
        `;
        return this.writeHTMLResponse(view);
    }

    private startGame(gameMode: number): string {
        const cardManager = new CardManager();

        const playerConfig = new PlayerConfig(gameMode);
        const gameBuilder = new GameBuilder();

        const allCardList = this.cardLoader.loadData();
        const cardList = cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

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
        allScores[gameId].forEach(s => {
            if (s.score === -1) {
                lost = true;
            }
            view += `<p>${s.player}: ${s.score}</p>`;
        });
        if (lost) {
            view = 'Game lost';
        }
        return view;
    }
}
