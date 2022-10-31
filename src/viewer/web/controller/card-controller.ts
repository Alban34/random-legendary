import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { CardWebViewer } from '../card-web-viewer';
import { CardLoader } from '../../../card/card-loader';
import { FileDataManager } from '../../../data/file-data-manager';
import { CardManager } from '../../../card/card-manager';
import { inject } from 'inversify';
import { Card } from '../../../card/model/card';
import TYPES from '../../../types';

@controller('/cards')
export class CardController extends AbstractController {

    constructor(@inject(TYPES.CardLoader) private readonly cardLoader: CardLoader) {
        super();
    }

    @httpGet('/all')
    public getAll(): string {
        return this.writeHTMLResponse(this.showCards());
    }

    @httpGet('/mine')
    public getMine(): string {
        return this.writeHTMLResponse(this.showCards(false));
    }

    /**
     * Show known cards
     * @param all if true (default) show all cards known by the app. Otherwise, show only the cards of the user own extensions.
     */
    private showCards(all = true): string {
        const cardManager = new CardManager();

        const cardViewer = new CardWebViewer();

        const allCardList = this.cardLoader.loadData();
        if (all) {
            return cardViewer.getDisplayableCards(allCardList);
        }

        const cardList = cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        return cardViewer.getDisplayableCards(cardList);
    }

}
