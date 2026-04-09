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
import { PlayerConfig, GAME_MODE } from '../../../game/game.module';

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
                <section class="page-stack">
                    <section class="page-section">
                        <div class="page-section__header">
                            <div>
                                <span class="eyebrow">Scoreboard</span>
                                <h2 class="page-section__title">Enter a score</h2>
                                <p class="page-section__subtitle">Wrap up your latest game, mark wins and losses, and keep your campaign history beautifully organized.</p>
                            </div>
                        </div>
                        <form action="/scores" method="post" class="page-stack">`;
        allAvailableGamesForScore.forEach(gameId => {
            const game = this.gameLoader.load(allCardList, gameId);
            webView += `
                        <div class="card score-game-card">
                            <div class="card-header">
                                <span class="eyebrow mb-2">Awaiting score</span>
                                <div class="summary-grid">
                                    <div class="summary-item">
                                        <span class="summary-item__label">Game ID</span>
                                        <span class="summary-item__value">${gameId}</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-item__label">Mastermind</span>
                                        <span class="summary-item__value">${game.mastermind.name}</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-item__label">Scheme</span>
                                        <span class="summary-item__value">${game.scheme.name}</span>
                                    </div>
                                </div>
                                ${this.showMultiple(game.villains, 'Villains')}
                                ${this.showMultiple(game.henchmen, 'Henchmen')}
                                ${this.showMultiple(game.heroes, 'Heroes')}
                            </div>
                            <div class="card-body">
                                <div class="score-form-grid">
                                    ${this.getPlayersView(gameId)}
                                </div>
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
                            <button type="submit" class="btn btn-primary btn-lg align-self-start">Save</button>
                        </form>
                    </section>
                </section>`;
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

    private getPlayersView(gameId: string) {
        const gameMode = Number.parseInt(gameId.split('|')[1]);
        const playerCount = PlayerConfig.getHumanPlayerCount(gameMode);
        let view = '';
        for (let i = 0; i < playerCount; i++) {
            view += `
                <div class="score-input-group">
                    <label>
                        <span class="summary-item__label">Player</span>
                        <input class="form-control" name="${gameId}:player_${i}" type="text" value="Player ${i + 1}">
                    </label>
                    <div>
                        <span class="summary-item__label">Score</span>
                        ${this.getInputsScore(gameMode, gameId, i)}
                    </div>
                </div>
            `;
        }
        return view;
    }

    private getInputsScore(gameMode: number, gameId: string, playerIndex: number): string {
        let scoreInputCount: number;
        switch (gameMode) {
            case GAME_MODE.TWO_HANDED_SOLO:
                scoreInputCount = 2;
                break;
            case GAME_MODE.THREE_HANDED_SOLO:
                scoreInputCount = 3;
                break;
            default:
                scoreInputCount = 1;
        }
        let scoreInputs = '';
        for (let i = 0; i < scoreInputCount; i++) {
            scoreInputs += `<input class="form-control mt-2" name="${gameId}:score_${playerIndex + i}" type="number">`;
        }
        return scoreInputs;
    }
}
