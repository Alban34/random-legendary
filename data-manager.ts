const fs = require('fs-extra');
const CATEGORIES = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

export class DataManager {

    public loadData() {
        let rawData = fs.readFileSync('legendary.json');
        const legendaryBase = JSON.parse(rawData);

        let games = '';
        if (fs.existsSync('games.json')) {
            rawData = fs.readFileSync('games.json');
            games = JSON.parse(rawData);

            CATEGORIES.forEach(category => {
                if (legendaryBase[category]) {
                    legendaryBase[category].forEach(baseValue => {
                        if (games[category]) {
                            const saveCatValue = games[category].filter(m => m.name === baseValue.name);
                            if (saveCatValue && saveCatValue.length === 1) {
                                baseValue.count = saveCatValue[0].count;
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

        return legendaryBase;
    }

    public saveData(legendaryBase) {
        const gamesToSave = {
            "masterminds": legendaryBase.masterminds,
            "schemes": legendaryBase.schemes,
            "villains": legendaryBase.villains,
            "henchmen": legendaryBase.henchmen,
            "heroes": legendaryBase.heroes
        };
        const data = JSON.stringify(gamesToSave);
        fs.writeFileSync('games.json', data);

    }
}
