import { Card } from '../../card/model/card';
import { CardManager } from '../../card/card-manager';
import { StatsService } from '../../stats/stats-service';

export class CardWebViewer {

    private statsService = new StatsService();

    constructor(private readonly forSelection = false) {
    }

    public getDisplayableCards(cardList): string {
        let cardsView = '<div class="cards-container">';
        cardsView += this.buildCategoryView('Masterminds', cardList.masterminds, 'bg-danger');
        cardsView += this.buildCategoryView('Schemes', cardList.schemes, 'text-white bg-dark');
        cardsView += this.buildCategoryView('Villains', cardList.villains, 'bg-warning');
        cardsView += this.buildCategoryView('Henchmen', cardList.henchmen, 'bg-secondary');
        cardsView += this.buildCategoryView('Heroes', cardList.heroes, 'bg-info');
        cardsView += '</div>';
        return cardsView;
    }

    public showCardsByGroup(allCardList, extensions: string[]) {
        const cardManager = new CardManager();

        let view = '';
        extensions.forEach(extension => {
            const cardList = cardManager.filterAllCards(allCardList, [extension]);
            view += `<h3>${extension}</h3>${this.getDisplayableCards(cardList)}<hr>`;
        });
        return view;
    }

    private buildCardView(card: Card, categoryName?: string): string {
        let cardLabel = `
                <label for="${card.name + card.extension}">
                    ${card.name}<br />
                </label><br>
                <small>${card.extension}</small>
        `;
        if (!card.count) {
            cardLabel += '<small>(not played yet)</small>'
        }

        if (this.forSelection) {
            cardLabel = `<input type="checkbox" 
                            id="${card.name + card.extension}" 
                            name="${categoryName}|${card.name}|${card.extension}">
                        ${cardLabel}`;
        }
        return `<li class="list-group-item">${cardLabel}</li>`;
    }

    private buildCategoryView(categoryName, cards: Card[], style?: string): string {
        let statsView = '';
        if (cards.length > 0) {
            statsView =  `(${this.statsService.computeStats(cards)}% played)`;
        }
        let categoryView = `
        <div class="card ${style}">
            <div class="card-header">
                ${categoryName} (${cards.length}) ${statsView}
            </div>
            <ul class="list-group list-group-flush">`;

        cards.forEach(c => categoryView += this.buildCardView(c, categoryName));

        categoryView += `
            </ul>
        </div>
        `;

        return categoryView;
    }
}
