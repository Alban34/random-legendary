import { GameManager } from '../../game/game-manager';
import { ALL_CARDS } from '../../card/base-cards';
import { CardManager } from '../../card/card-manager';
import { CardLoader } from '../../card/card-loader';
import { CardWebViewer } from './card-web-viewer';

export class SetupWebViewer {

    private choices;

    constructor() {
        this.choices = [{ label: 'Start a new game', path: '' }];
        const gameManager = new GameManager();
        const availableGamesForScore = gameManager.loadRegisteredGameWithNoScore(ALL_CARDS);
        if (availableGamesForScore.length > 0) {
            this.choices.push({ label: 'Enter a game score', path: '' });
        }
        this.choices.push(...[
            { label: 'Select your extensions', path: '/showExtensions' },
            { label: 'Show all available cards', path: '/showAllCards' },
            { label: 'Show my cards (from selected extensions)', path: '' }]);
    }

    public showUI(): string {
        let webChoices: string = '';
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

        const availableExtensionsAsWeb = allExtensions.map((ext, index) => {
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
        return cardViewer.getDisplayableCards(ALL_CARDS);
    }
}
