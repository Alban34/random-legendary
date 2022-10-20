import { GameManager } from '../../game/game-manager';
import { ALL_CARDS } from '../../card/base-cards';
import { CardManager } from '../../card/card-manager';
import { CardLoader } from '../../card/card-loader';

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
            { label: 'Show all available cards', path: '' },
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

        const availableExtensionsAsWeb = allExtensions.map(ext => {
            return `
                <input type='checkbox' id='${ext}' checked='${selectedExtensions.indexOf(ext) > -1}'>
                <label for='${ext}'>${ext}</label>
            `;
        });
        let webContent = availableExtensionsAsWeb.join('');
        webContent += `<button>Cancel</button><button>Save</button>`;
        return webContent;
    }
}
