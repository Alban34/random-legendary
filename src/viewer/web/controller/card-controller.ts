import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { CardWebViewer } from '../card-web-viewer';
import { CardLoader } from '../../../card/card-loader';
import { CardManager } from '../../../card/card-manager';
import { inject } from 'inversify';
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

    @httpGet('/all/group')
    public getAllByGroup(): string {
        return this.writeHTMLResponse(this.showCardsByGroup());
    }

    @httpGet('/mine')
    public getMine(): string {
        return this.writeHTMLResponse(this.showCards(false));
    }

    @httpGet('/mine/group')
    public getMineByGroup(): string {
        return this.writeHTMLResponse(this.showCardsByGroup(false));
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

    private showCardsByGroup(all = true) {
        const cardManager = new CardManager();

        const cardViewer = new CardWebViewer();

        const allCardList = this.cardLoader.loadData();
        let extensions = this.cardLoader.loadExtensions();
        if (all || extensions.length === 0) {
            extensions = cardManager.getAvailableExtensions(this.cardLoader.loadData());
        }

        let view = '';
        extensions.forEach(extension => {
            const cardList = cardManager.filterAllCards(allCardList, [extension]);
            view += `<h3>${extension}</h3>${cardViewer.getDisplayableCards(cardList)}<hr>`;
        });
        return view;
    }
}
