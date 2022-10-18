import fs from 'fs-extra';

const CATEGORIES = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

export class CardLoader {

    public loadData() {
        let rawData = fs.readFileSync('./assets/legendary.json');
        const legendaryBase = JSON.parse(rawData.toString());

        if (fs.existsSync('./games.json')) {
            rawData = fs.readFileSync('./games.json');
            this.mergeGameDataIntoBase(legendaryBase, JSON.parse(rawData.toString()));
        }

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
                    } else {
                        console.warn(`Unsaved category "${category}"`);
                    }
                });
            } else {
                console.error(`Unknown category "${category}"`);
            }
        });
    }

    public loadExtensions(): string[] {
        if (fs.existsSync('./extensions.json')) {
            const rawData = fs.readFileSync('./extensions.json');
            return JSON.parse(rawData.toString());
        }
        return [];
    }

    public saveExtensions(extensions: string[]): void {
        const data = JSON.stringify(extensions);
        fs.writeFileSync('extensions.json', data);
    }

}
