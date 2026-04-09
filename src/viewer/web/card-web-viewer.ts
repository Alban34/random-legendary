import { Card, CardCatalog } from '../../card/card.module';
import { CardManager } from '../../card/card-manager';
import { StatsService } from '../../stats/stats-service';

export class CardWebViewer {

    private statsService = new StatsService();

    constructor(private readonly forSelection = false) {
    }

    public getDisplayableCards(cardList: CardCatalog): string {
        let cardsView = '<div class="cards-container">';
        cardsView += this.buildCategoryView('Masterminds', cardList.masterminds, 'bg-danger text-white');
        cardsView += this.buildCategoryView('Schemes', cardList.schemes, 'text-white bg-dark');
        cardsView += this.buildCategoryView('Villains', cardList.villains, 'bg-warning text-dark');
        cardsView += this.buildCategoryView('Henchmen', cardList.henchmen, 'bg-secondary text-white');
        cardsView += this.buildCategoryView('Heroes', cardList.heroes, 'bg-info text-dark');
        cardsView += '</div>';
        return cardsView;
    }

    public showCardsByGroup(allCardList: CardCatalog, extensions: string[]): string {
        const cardManager = new CardManager();

        let view = '';
        extensions.forEach(extension => {
            const cardList = cardManager.filterAllCards(allCardList, [extension]);
            view += `
                <section class="card-group-section">
                    <div class="page-section__header">
                        <div>
                            <h3 class="card-group-section__title">${extension}</h3>
                            <p class="page-section__subtitle">Explore the cards currently available from this extension.</p>
                        </div>
                    </div>
                    ${this.getDisplayableCards(cardList)}
                </section>`;
        });
        return view;
    }

    private buildCardView(card: Card, categoryName?: string): string {
        let cardLabel = `
                <label for="${card.name + card.extension}" class="d-block">
                    <span class="card-name">${card.name}</span><br />
                </label><br>
                <small class="text-body-secondary">${card.extension}</small>
        `;
        if (!card.count) {
            cardLabel += '<small class="text-info-emphasis d-block">Not played yet</small>'
        }

        if (this.forSelection) {
            cardLabel = `<div class="d-flex gap-2 align-items-start">
                            <input type="checkbox" 
                                class="form-check-input mt-1"
                                id="${card.name + card.extension}" 
                                name="${categoryName}|${card.name}|${card.extension}">
                            <div>${cardLabel}</div>
                        </div>`;
        }
        return `<li class="list-group-item">${cardLabel}</li>`;
    }

    private buildCategoryView(categoryName: string, cards: Card[], style?: string): string {
        let statsView = '';
        if (cards.length > 0) {
            statsView =  `(${this.statsService.computeStats(cards)}% played)`;
        }
        let categoryView = `
        <div class="card ${style}">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <span>${categoryName} (${cards.length})</span>
                    <small>${statsView}</small>
                </div>
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
