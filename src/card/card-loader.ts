import fs from 'fs-extra';
import { DataManager } from '../data/data-manager.interface';

const CATEGORIES = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

export class CardLoader {

    constructor(private readonly dataManager: DataManager) {}

    public loadData() {
        let rawData = fs.readFileSync('./assets/legendary.json');
        const legendaryBase = JSON.parse(rawData.toString());

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
