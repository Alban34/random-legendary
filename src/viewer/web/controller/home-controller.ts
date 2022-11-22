import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { GameManager } from '../../../game/game-manager';
import { CardLoader } from '../../../card/card-loader';
import { inject } from 'inversify';
import TYPES from '../../../types';
import { GAME_MODE } from '../../../game/player-config';

@controller('/')
export class HomeController extends AbstractController {

    constructor(
        @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
        @inject(TYPES.GameManager) private readonly gameManager: GameManager
    ) {
        super();
    }

    @httpGet('/')
    public get(): string {
        return this.writeHTMLResponse(this.showUI());
    }

    private showUI(): string {

        const choices = [];
        const allCards = this.cardLoader.loadData();
        const availableGamesForScore = this.gameManager.loadRegisteredGameWithNoScore(allCards);
        if (availableGamesForScore.length > 0) {
            choices.push({ label: 'Enter a game score', path: '/scores' });
        }
        const registeredGames = this.gameManager.loadRegisteredGame(allCards);
        if (registeredGames.length > 0) {
            choices.push({ label: 'Show my game history', path: '/game/history' });
        }
        choices.push(...[
            { label: 'Select my extensions', path: '/extensions' },
            { label: 'Show all available cards', path: '/cards/all' },
            { label: 'Show all available cards (grouped by extensions)', path: '/cards/all/group' },
            { label: 'Show my cards (from selected extensions)', path: '/cards/mine' },
            { label: 'Show my cards (from selected extensions, grouped by extensions)', path: '/cards/mine/group' }
        ]);

        let webChoices = `
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Start new game
                    </button>
                    <ul class="dropdown-menu" style="">
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.SOLO}">Solo</a></li>
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.ADVANCED_SOLO}">Advanced Solo</a></li>
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.TWO_PLAYERS}">2 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.THREE_PLAYERS}">3 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FOUR_PLAYERS}">4 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FIVE_PLAYERS}">5 players</a></li>
                    </ul>
                </div>`;

        choices.forEach(choice => webChoices += `<a href="${choice.path}">${choice.label}</a>`);
        return webChoices;
    }
}
