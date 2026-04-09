import { Card } from '../../card/card.module';

type DisplayCard = Pick<Card, 'name'>;
type DisplayCardCatalog = {
    masterminds: DisplayCard[];
    schemes: DisplayCard[];
    villains: DisplayCard[];
    henchmen: DisplayCard[];
    heroes: DisplayCard[];
};

export class CardConsoleViewer {

    public getDisplayableCards(cardList: DisplayCardCatalog): string {
        let cardsView = this.buildCategoryView('Masterminds', cardList.masterminds);
        cardsView += this.buildCategoryView('\n\nSchemes', cardList.schemes);
        cardsView += this.buildCategoryView('\n\nVillains', cardList.villains);
        cardsView += this.buildCategoryView('\n\nHenchmen', cardList.henchmen);
        cardsView += this.buildCategoryView('\n\nHeroes', cardList.heroes);
        return cardsView;
    }

    private buildCardView(card: DisplayCard): string {
        return `\n|- ${card.name}`;
    }

    private buildCategoryView(categoryName: string, cards: DisplayCard[]): string {
        let categoryView = `${categoryName}:`;
        cards.forEach(c => categoryView += this.buildCardView(c));
        return categoryView;
    }
}
