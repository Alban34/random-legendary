import { Card } from '../../card/model/card';

export class CardWebViewer {

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

    private buildCardView(card: Card): string {
        return `<li class="list-group-item">${card.name}</li>`;
    }

    private buildCategoryView(categoryName, cards: Card[], style?: string): string {
        let categoryView = `
        <div class="card ${style}">
            <div class="card-header">
                ${categoryName} (${cards.length})
            </div>
            <ul class="list-group list-group-flush">`;

        cards.forEach(c => categoryView += this.buildCardView(c));

        categoryView += `
            </ul>
        </div>
        `;

        return categoryView;
    }
}
