import { Card } from './model/card.interface';

export class CardDrawer {

    /**
     * Draw randomly a single card from the given card list
     * @param cardList
     */
    public drawRandomUnique(cardList: Card[]) {
        return this.drawRandom(cardList);
    }

    /**
     * Draw randomly multiple cards from a give card list
     * @param cardList
     * @param countToDraw
     */
    public drawRandomMultiple(cardList: Card[], countToDraw: number): Card[] {
        let choices = [];
        for (let i = 0; i < countToDraw; i++) {
            choices.push(this.drawRandom(cardList));
        }

        return choices;
    }

    /**
     * Draw randomly multiple cards from a give card list but always select some of them without triggering the randomization
     * @param cardList
     * @param countToDraw
     * @param alwaysSelected
     */
    public drawRandomMultipleForce(cardList: Card[], countToDraw: number, alwaysSelected: string[]): Card[] {
        const randomCount = countToDraw - alwaysSelected.length;

        let choices = cardList.filter(value => alwaysSelected.indexOf(value.name) > -1);
        for (let i = 0; i < randomCount; i++) {
            choices.push(this.drawRandom(cardList));
        }

        return choices;
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    private filterList(element: Card, countToKeep: number) {
        return element.count === countToKeep;
    }

    private drawRandom(cardList: Card[]): Card {
        const lowestCount = cardList.reduce((prev, curr) => {
            if (!prev.count) {
                return prev;
            }
            return prev.count < curr.count ? prev : curr;
        }).count;

        const filteredCardList = cardList.filter((value) => this.filterList(value, lowestCount));
        const choice = filteredCardList[this.getRandomInt(filteredCardList.length)];

        if (!choice.count) {
            choice.count = 0;
        }
        choice.count++;

        return choice;
    }
}
