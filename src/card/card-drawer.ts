import { Card } from './model/card';
import crypto from 'crypto';
import { CardIdentifier } from '../game/model/predefined-game';

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
    public drawRandomMultipleForce(cardList: Card[], countToDraw: number, alwaysSelected: CardIdentifier[] | string[], strict = true): Card[] {
        let randomCount = countToDraw - alwaysSelected.length;
        if (!strict) {
            randomCount = countToDraw - 1;
        }

        const cardToSelect = [];
        alwaysSelected.forEach(ci => {
            if (typeof ci === 'string') {
                cardToSelect.push({
                    name: ci,
                    extension: 'none'
                });
            } else {
                cardToSelect.push(ci);
            }
        });

        let choices = cardList.filter(this.cardFilter(cardToSelect));

        if (!strict) {
            const selectableCards = cardList.filter(this.containsFilter(cardToSelect));
            choices.push(this.drawRandom(selectableCards));
        }

        choices.forEach(card => this.updateCardCount(card));

        const remainingCards = cardList.filter(card => choices.indexOf(card) === -1);
        for (let i = 0; i < randomCount; i++) {
            choices.push(this.drawRandom(remainingCards));
        }

        return choices;
    }

    private containsFilter(searchValues: CardIdentifier[]) {
        return (value: Card) => {
            return searchValues.filter(search => value.name.indexOf(search.name) > -1).length > 0;
        };
    }

    private cardFilter(filteringCards: CardIdentifier[]) {
        return (value: Card) => {
            let found = filteringCards.map(ci => ci.name).indexOf(value.name) > -1;
            if (filteringCards.filter(ci => ci.extension !== 'none').length !== 0) {
                found = found && filteringCards.map(ci => ci.extension).indexOf(value.extension) > -1;
            }
            return found;
        }
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
