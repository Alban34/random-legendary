import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { GameManager } from '../../../game/game-manager';
import { CardLoader } from '../../../card/card-loader';
import { inject } from 'inversify';
import TYPES from '../../../types';

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
        return this.writeHTMLResponse(`Welcome to this Legendary: Marvel randomizer.<br/><br/>Please make your selection from the navigation bar on top.`);
    }
}
