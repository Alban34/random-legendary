export class CardManager {

    public getAvailableExtensions(cardList): string[] {
        return cardList.masterminds
            .flatMap(m => m.extension)
            .sort()
            .reduce((a, b) => {
                if (a.slice(-1)[0] !== b) {
                    a.push(b);
                }
                return a;
            }, []);
    }

    public filterAllCards(cardList, extensions: string[]) {
        const filteredList = { ...cardList };
        filteredList.masterminds = this.filterCategory(filteredList.masterminds, extensions);
        filteredList.schemes = this.filterCategory(filteredList.schemes, extensions);
        filteredList.villains = this.filterCategory(filteredList.villains, extensions);
        filteredList.henchmen = this.filterCategory(filteredList.henchmen, extensions);
        filteredList.heroes = this.filterCategory(filteredList.heroes, extensions);
        return filteredList;
    }

    private filterCategory(cardList, extensions) {
        if (extensions && extensions.length > 0) {
            return cardList.filter(c => extensions.indexOf(c.extension) > -1);
        }
        return cardList;
    }
}
