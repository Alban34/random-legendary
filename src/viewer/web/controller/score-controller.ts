import * as express from 'express';
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { ScoreInputParser } from '../score-input-parser';
import { GameDataManager } from '../../../game/game-data-manager';
import { CardLoader } from '../../../card/card-loader';
import { GameManager } from '../../../game/game-manager';
import { inject } from 'inversify';
import TYPES from '../../../types';

@controller('/scores')
export class ScoreController extends AbstractController {

    constructor(
        @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
        @inject(TYPES.GameManager) private readonly gameManager: GameManager,
        @inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager
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
            this.gameDataManager.saveScore(gameId, scores[gameId].score);
        }
        res.redirect('/');
    }

    private showAvailableGameForScore(): string {

        const allCardList = this.cardLoader.loadData();
        const allAvailableGamesForScore = this.gameManager.loadRegisteredGameWithNoScore(allCardList);

        let webView = `
                <form action="/scores" method="post" class="col-lg-6 col-md-8 col-sm-12">`;
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
