import * as express from 'express';
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { ScoreInputParser } from '../score-input-parser';
import { GameDataManager } from '../../../game/game-data-manager';
import { CardLoader } from '../../../card/card-loader';
import { GameManager } from '../../../game/game-manager';
import { inject } from 'inversify';
import TYPES from '../../../types';
import { GameLoader } from '../../../game/game-loader';
import { PlayerConfig } from '../../../game/game.module';

@controller('/scores')
export class ScoreController extends AbstractController {

    constructor(
        @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
        @inject(TYPES.GameManager) private readonly gameManager: GameManager,
        @inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager,
        @inject(TYPES.GameLoader) private readonly gameLoader: GameLoader
    ) {
        super();
    }

    @httpGet('/')
    public getAll(): string {
        return this.writeHTMLResponse(this.showAvailableGameForScore());
    }

    @httpPost('/')
    public save(@response() res: express.Response,
                @requestBody() unparsedScores: any) {
        const parser = new ScoreInputParser();
        const scores = parser.parseObject(unparsedScores);
        for (const gameId in scores) {
            this.gameDataManager.saveScore(gameId, scores[gameId]);
        }
        res.redirect('/');
    }

    private showAvailableGameForScore(): string {

        const allCardList = this.cardLoader.loadData();
        const allAvailableGamesForScore = this.gameManager.loadRegisteredGameWithNoScore(allCardList);

        if (allAvailableGamesForScore.length === 0) {
            return `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">No game without score</h4>
                    <p>There is no game that needs to fill in a score. Please start a new game first.</p>
                </div>`;
        }

        let webView = `
                <form action="/scores" method="post" class="col-lg-6 col-md-8 col-sm-12">`;
        allAvailableGamesForScore.forEach(gameId => {
            const game = this.gameLoader.load(allCardList, gameId);
            const playerCount = PlayerConfig.guessPlayerCount(game.villains.length, game.henchmen.length);
            webView += `
                        <div class="card">
                            <div class="card-header">
                                Game ID: ${gameId}<br/>
                                Mastermind: ${game.mastermind.name}<br/>
                                Scheme: ${game.scheme.name}<br/>
                                ${this.showMultiple(game.villains, 'Villains')}
                                ${this.showMultiple(game.henchmen, 'Henchmen')}
                                ${this.showMultiple(game.heroes, 'Heroes')}
                            </div>
                            <div class="card-body">
                                ${this.getPlayersView(playerCount, gameId)}
                                <div class="form-check form-switch">
                                    <input class="form-check-input" 
                                        type="checkbox" 
                                        role="switch" 
                                        id="${gameId}:won" 
                                        name="${gameId}:won" 
                                        checked>
                                    <label class="form-check-label" for="${gameId}:won">Game won</label>
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

    private showMultiple(cardsList, label) {
        let show = `${label}<ul>`;
        cardsList.forEach(card => {
            let teams = '';
            if (card.teams) {
                teams = '&nbsp;<small>(';
                card.teams.forEach(t => teams += `${t}, `);
                teams = teams.substring(0, teams.length - 2) + ')</small>';
            }
            show += `<li>${card.name}${teams}</li>`;
        });
        show += `</ul>`;
        return show;
    }

    private getPlayersView(playerCount: number, gameId: string) {
        let view = '';
        for (let i = 0; i < playerCount; i++) {
            view += `
                <div>
                    Score: <input name="${gameId}:score_${i}" type="number">
                    Player: <input name="${gameId}:player_${i}" type="string" value="Player ${i + 1}">
                </div>
            `;
        }
        return view;
    }
}
