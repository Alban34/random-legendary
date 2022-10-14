import { Card } from './model/card.interface';

export class CardViewer {

    public getDisplayableCards(cardList): string {
        let cardsView = this.buildCategoryView('Masterminds', cardList.masterminds);
        cardsView += this.buildCategoryView('\n\nSchemes', cardList.schemes);
        cardsView += this.buildCategoryView('\n\nVillains', cardList.villains);
        cardsView += this.buildCategoryView('\n\nHenchmen', cardList.henchmen);
        cardsView += this.buildCategoryView('\n\nHeroes', cardList.heroes);
        return cardsView;
    }

    private buildCardView(card: Card): string {
        return `\n|- ${card.name}`;
    }

    private buildCategoryView(categoryName, cards: Card[]): string {
        let categoryView = `${categoryName}:`;
        cards.forEach(c => categoryView += this.buildCardView(c));
        return categoryView;
    }
}
