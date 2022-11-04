import { DataManager } from '../data/data-manager.interface';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { ALL_CARDS } from './card-database';

const CATEGORIES = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

@injectable()
export class CardLoader {

    constructor(@inject(TYPES.DataManager) private readonly dataManager: DataManager) {}

    public loadData() {
        const legendaryBase = { ...ALL_CARDS };
        this.mergeGameDataIntoBase(legendaryBase, this.dataManager.readGamesData());
        return legendaryBase;
    }

    private mergeGameDataIntoBase(legendaryBase, games) {
        CATEGORIES.forEach(category => {
            if (legendaryBase[category]) {
                legendaryBase[category].forEach(baseValue => {
                    if (games[category]) {
                        const saveCatValue = games[category].filter(m => m.name === baseValue.name);
                        if (saveCatValue && saveCatValue.length === 1) {
                            baseValue.count = saveCatValue[0].count;
                            baseValue.gameId = saveCatValue[0].gameId;
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

}
