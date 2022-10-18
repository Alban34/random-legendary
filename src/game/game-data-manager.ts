import { Scores } from './game.module';
import fs from 'fs-extra';

export class GameDataManager {

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

    public loadScores(): Scores {
        let scores: Scores = {};
        if (fs.existsSync('./scores.json')) {
            const rawData = fs.readFileSync('./scores.json');
            scores = JSON.parse(rawData.toString());
        }
        return scores;
    }

    public saveScore(gameId: string, score: number): void {
        const scores = this.loadScores();
        scores[gameId] = { score };
        const data = JSON.stringify(scores);
        fs.writeFileSync('scores.json', data);
    }

}
