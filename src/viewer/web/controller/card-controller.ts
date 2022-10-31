import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { CardWebViewer } from '../card-web-viewer';
import { CardLoader } from '../../../card/card-loader';
import { FileDataManager } from '../../../data/file-data-manager';
import { CardManager } from '../../../card/card-manager';

@controller('/cards')
export class CardController extends AbstractController {

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
        const dataManager = new FileDataManager();
        const cardLoader = new CardLoader(dataManager);
        const cardManager = new CardManager();

        const cardViewer = new CardWebViewer();

        const allCardList = cardLoader.loadData();
        if (all) {
            return cardViewer.getDisplayableCards(allCardList);
        }

        const cardList = cardManager.filterAllCards(allCardList, cardLoader.loadExtensions());
        return cardViewer.getDisplayableCards(cardList);
    }

}
