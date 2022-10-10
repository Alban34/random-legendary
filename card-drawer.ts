export class CardDrawer {

    /**
     * Draw randomly a single card from the given card list
     * @param cardList
     * @param nameInGame
     */
    public drawRandomUnique(cardList, nameInGame) {
        return this.drawRandom(cardList, nameInGame);
    }

    /**
     * Draw randomly multiple cards from a give card list
     * @param cardList
     * @param nameInGame
     * @param countToDraw
     */
    public drawRandomMultiple(cardList, nameInGame, countToDraw) {
        let choices = [];
        for (let i = 0; i < countToDraw; i++) {
            choices.push(this.drawRandom(cardList, nameInGame)[nameInGame]);
        }

        let choicesForGame = {};
        choicesForGame[nameInGame] = choices;

        return choicesForGame;
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    private filterList(element, countToKeep) {
        return element.count === countToKeep;
    }

    private drawRandom(cardList, nameInGame) {
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
