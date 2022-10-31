import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { GameManager } from '../../../game/game-manager';
import { CardLoader } from '../../../card/card-loader';
import { FileDataManager } from '../../../data/file-data-manager';

@controller('/')
export class HomeController extends AbstractController {

    @httpGet('/')
    public get(): string {
        return this.writeHTMLResponse(this.showUI());
    }

    private showUI(): string {
        const dataManager = new FileDataManager();
        const cardLoader = new CardLoader(dataManager);
        const gameManager = new GameManager(dataManager);

        const choices = [];
        const availableGamesForScore = gameManager.loadRegisteredGameWithNoScore(cardLoader.loadData());
        if (availableGamesForScore.length > 0) {
            choices.push({ label: 'Enter a game score', path: '/scores' });
        }
        choices.push(...[
            { label: 'Select your extensions', path: '/extensions' },
            { label: 'Show all available cards', path: '/cards/all' },
            { label: 'Show my cards (from selected extensions)', path: '/cards/mine' }]);

        let webChoices = `
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Start new game
                    </button>
                    <ul class="dropdown-menu" style="">
                        <li><a class="dropdown-item" href="/game/new/1">Solo</a></li>
                        <li><a class="dropdown-item" href="/game/new/1">Advanced Solo</a></li>
                        <li><a class="dropdown-item" href="/game/new/2">2 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/3">3 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/4">4 players</a></li>
                        <li><a class="dropdown-item" href="/game/new/5">5 players</a></li>
                    </ul>
                </div>`;

        choices.forEach(choice => webChoices += `<a href="${choice.path}">${choice.label}</a>`);
        return webChoices;
    }
}
