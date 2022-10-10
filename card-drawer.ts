export class CardDrawer {

    public drawRandomUnique(category, nameInGame) {
        return this.drawRandom(category, nameInGame);
    }

    public drawRandomMultiple(category, nameInGame, countToDraw) {
        let choices = [];
        for (let i = 0; i < countToDraw; i++) {
            choices.push(this.drawRandom(category, nameInGame)[nameInGame]);
        }

        let choicesForGame = {};
        choicesForGame[nameInGame] = choices;

        return choicesForGame;
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    private sortLists(a, b) {
        if (a.count === b.count) {
            return 0;
        }
        if (a.count > b.count) {
            return 1;
        }
        return -1;
    }

    private filterList(element, countToKeep) {
        return element.count === countToKeep;
    }

    private drawRandom(category, nameInGame) {
        category = category.sort(this.sortLists);

        const valueToFilter = category[0].count;

        const filteredMasterminds = category.filter((value) => this.filterList(value, valueToFilter));

        let choiceForGame = {};
        const choice = filteredMasterminds[this.getRandomInt(filteredMasterminds.length)];
        choiceForGame[nameInGame] = choice;

        choice.count++;

        return choiceForGame;
    }
}
