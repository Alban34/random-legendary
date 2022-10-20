import { GameManager } from '../../game/game-manager';
import { ALL_CARDS } from '../../card/base-cards';

export class SetupWebViewer {

    private choices;

    constructor() {
        this.choices = ['Start a new game'];
        const gameManager = new GameManager();
        const availableGamesForScore = gameManager.loadRegisteredGameWithNoScore(ALL_CARDS);
        if (availableGamesForScore.length > 0) {
            this.choices.push('Enter a game score');
        }
        this.choices.push(...['Select your extensions', 'Show all available cards', 'Show my cards (from selected extensions)']);
    }

    public showUI(): string {
        let webChoices: string = '';
        this.choices.forEach(choice => webChoices += `<button>${choice}</button>`);
        return webChoices;
    }
}
