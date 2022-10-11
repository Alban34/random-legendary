import { Scores } from './model/scores.interface';

const fs = require('fs-extra');
const CATEGORIES = ['masterminds', 'schemes', 'villains', 'henchmen', 'heroes'];

export class DataManager {

    public loadData() {
        let rawData = fs.readFileSync('./assets/legendary.json');
        const legendaryBase = JSON.parse(rawData);

        if (fs.existsSync('./games.json')) {
            rawData = fs.readFileSync('./games.json');
            this.mergeGameDataIntoBase(legendaryBase, JSON.parse(rawData));
        }

        return legendaryBase;
    }

    public saveData(legendaryBase): void {
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

    public saveScore(gameId: string, score: number): void {
        let scores: Scores = {};
        if (fs.existsSync('./scores.json')) {
            const rawData = fs.readFileSync('./scores.json');
            scores = JSON.parse(rawData);
        }
        scores[gameId] = { score };
        const data = JSON.stringify(scores);
        fs.writeFileSync('scores.json', data);
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
}
