import { CardInterface } from './model/card.interface';

export class CardDrawer {

    /**
     * Draw randomly a single card from the given card list
     * @param cardList
     * @param nameInGame
     */
    public drawRandomUnique(cardList: CardInterface[], nameInGame: string) {
        return this.drawRandom(cardList, nameInGame);
    }

    /**
     * Draw randomly multiple cards from a give card list
     * @param cardList
     * @param nameInGame
     * @param countToDraw
     */
    public drawRandomMultiple(cardList: CardInterface[], nameInGame: string, countToDraw: number) {
        let choices = [];
        for (let i = 0; i < countToDraw; i++) {
            choices.push(this.drawRandom(cardList, nameInGame)[nameInGame]);
        }

        let choicesForGame = {};
        choicesForGame[nameInGame] = choices;

        return choicesForGame;
    }

    /**
     * Draw randomly multiple cards from a give card list but always select some of them without triggering the randomization
     * @param cardList
     * @param nameInGame
     * @param countToDraw
     * @param alwaysSelected
     */
    public drawRandomMultipleForce(cardList: CardInterface[], nameInGame: string, countToDraw: number, alwaysSelected: string[]) {
        const randomCount = countToDraw - alwaysSelected.length;

        let choices = cardList.filter(value => alwaysSelected.indexOf(value.name) > -1);
        for (let i = 0; i < randomCount; i++) {
            choices.push(this.drawRandom(cardList, nameInGame)[nameInGame]);
        }

        let choicesForGame = {};
        choicesForGame[nameInGame] = choices;

        return choicesForGame;
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    private filterList(element: CardInterface, countToKeep: number) {
        return element.count === countToKeep;
    }

    private drawRandom(cardList: CardInterface[], nameInGame: string) {
        const lowestCount = cardList.reduce((prev, curr) => {
            return prev.count < curr.count ? prev : curr;
        }).count;

        const filteredCardList = cardList.filter((value) => this.filterList(value, lowestCount));

        let choiceForGame = {};
        const choice = filteredCardList[this.getRandomInt(filteredCardList.length)];
        choiceForGame[nameInGame] = choice;

        choice.count++;

        return choiceForGame;
    }
}
