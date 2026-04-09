import { Card, CardCatalog } from './card.module';

export class CardManager {

    public getAvailableExtensions(cardList: { masterminds: Array<Pick<Card, 'extension'>> }): string[] {
        return cardList.masterminds
            .flatMap((m) => m.extension)
            .sort((a, b) => a.localeCompare(b))
            .reduce<string[]>((a, b) => {
                if (a[a.length - 1] !== b) {
                    a.push(b);
                }
                return a;
            }, []);
    }

    public filterAllCards(cardList: CardCatalog, extensions: string[]): CardCatalog {
        const filteredList: CardCatalog = { ...cardList };
        filteredList.masterminds = this.filterCategory(filteredList.masterminds, extensions);
        filteredList.schemes = this.filterCategory(filteredList.schemes, extensions);
        filteredList.villains = this.filterCategory(filteredList.villains, extensions);
        filteredList.henchmen = this.filterCategory(filteredList.henchmen, extensions);
        filteredList.heroes = this.filterCategory(filteredList.heroes, extensions);
        return filteredList;
    }

    private filterCategory(cardList: Card[], extensions: string[]): Card[] {
        if (extensions && extensions.length > 0) {
            return cardList.filter((c) => extensions.includes(c.extension));
        }
        return cardList;
    }
}
