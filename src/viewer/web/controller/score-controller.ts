import * as express from "express";
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { FileDataManager } from '../../../data/file-data-manager';
import { ScoreInputParser } from '../score-input-parser';
import { GameDataManager } from '../../../game/game-data-manager';
import { CardLoader } from '../../../card/card-loader';
import { GameManager } from '../../../game/game-manager';

@controller('/scores')
export class ScoreController extends AbstractController {

    @httpGet('/')
    public getAll(): string {
        return this.writeHTMLResponse(this.showAvailableGameForScore());
    }

    @httpPost('/')
    public save(@response() res: express.Response,
                @requestBody() unparsedScores: any) {
        const dataManager = new FileDataManager();
        const parser = new ScoreInputParser();
        const scores = parser.parseObject(unparsedScores);
        const gameDataManager = new GameDataManager(dataManager);
        for (const gameId in scores) {
            gameDataManager.saveScore(gameId, scores[gameId].score);
        }
        res.redirect('/');
    }

    private showAvailableGameForScore(): string {
        const dataManager = new FileDataManager();
        const cardLoader = new CardLoader(dataManager);
        const gameManager = new GameManager(dataManager);

        const allCardList = cardLoader.loadData();
        const allAvailableGamesForScore = gameManager.loadRegisteredGameWithNoScore(allCardList);

        let webView = `
                <form action="/scores" method="post" class="scores">`;
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
