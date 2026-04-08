import { DataManager } from '../data/data-manager.interface';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { ALL_CARDS } from './card-database';
import { Card, CardCatalog, CardCategory, SavedCardCatalog } from './card.module';

const CATEGORIES: CardCategory[] = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

@injectable()
export class CardLoader {

    constructor(@inject(TYPES.DataManager) private readonly dataManager: DataManager) {}

    public loadData(): CardCatalog {
        const legendaryBase = { ...ALL_CARDS } as CardCatalog;
        this.mergeGameDataIntoBase(legendaryBase, this.dataManager.readGamesData() ?? {});
        return legendaryBase;
    }

    private mergeGameDataIntoBase(legendaryBase: CardCatalog, games: SavedCardCatalog): void {
        CATEGORIES.forEach(category => {
            if (legendaryBase[category]) {
                legendaryBase[category].forEach(baseValue => {
                    if (games[category]) {
                        const saveCatValue = games[category].filter((m) => {
                            return m.name === baseValue.name && m.extension === baseValue.extension;
                        });
                        if (saveCatValue && saveCatValue.length === 1) {
                            this.mergeIfDefined(saveCatValue, baseValue, 'count');
                            this.mergeIfDefined(saveCatValue, baseValue, 'gameId');
                        }
                    }
                });
            } else {
                console.error(`Unknown category "${category}"`);
            }
        });
    }

    public loadExtensions(): string[] {
        return this.dataManager.readExtensionsData();
    }

    public saveExtensions(extensions: string[]): void {
        this.dataManager.writeExtensionsData(extensions);
    }

    private mergeIfDefined(saveCatValue: Card[], baseValue: Card, attributeName: 'count' | 'gameId'): void {
        const value = saveCatValue[0][attributeName];
        if (value) {
            if (attributeName === 'count') {
                baseValue.count = value as number;
            } else {
                baseValue.gameId = value as string[];
            }
        }

    }
}
