import { Card } from './model/card';
import crypto from 'crypto';

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
     * Draw randomly multiple cards from a given card list but always select some of them without triggering the randomization
     * @param cardList
     * @param countToDraw
     * @param alwaysSelected
     * @param strict when true, search for the exact name found in alwaysSelected. Otherwise, search for a card containing this value.
     */
    public drawRandomMultipleForce(cardList: Card[], countToDraw: number, alwaysSelected: string[], strict = true): Card[] {
        let randomCount = countToDraw - alwaysSelected.length;
        if (!strict) {
            randomCount = countToDraw - 1;
        }

        let choices = cardList.filter((value: Card) => alwaysSelected.indexOf(value.name) > -1);

        if (!strict) {
            const selectableCards = cardList.filter(this.containsFilter(alwaysSelected));
            choices.push(this.drawRandom(selectableCards));
        }

        choices.forEach(card => this.updateCardCount(card));

        const remainingCards = cardList.filter(card => choices.indexOf(card) === -1);
        for (let i = 0; i < randomCount; i++) {
            choices.push(this.drawRandom(remainingCards));
        }

        return choices;
    }

    private containsFilter(searchValues: string[]) {
        return (value: Card) => {
            return searchValues.filter(search => value.name.indexOf(search) > -1).length > 0;
        };
    }

    private getRandomInt(max: number) {
        return crypto.randomInt(max);
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

        this.updateCardCount(choice);

        return choice;
    }

    private updateCardCount(card: Card) {
        if (!card.count) {
            card.count = 0;
        }
        card.count++;
    }
}
