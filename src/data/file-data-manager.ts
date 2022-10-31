import 'reflect-metadata';
import { DataManager } from './data-manager.interface';
import { Scores } from '../game/model/scores';
import fs from 'fs-extra';
import { injectable } from 'inversify';

@injectable()
export class FileDataManager implements DataManager {
    readExtensionsData(): string[] {
        if (fs.existsSync('./extensions.json')) {
            const rawData = fs.readFileSync('./extensions.json');
            return JSON.parse(rawData.toString());
        }
        return [];
    }

    readGamesData() {
        if (fs.existsSync('./games.json')) {
            const rawData = fs.readFileSync('./games.json');
            return JSON.parse(rawData.toString());
        }
        return {};
    }

    readScores(): Scores {
        let scores = {};
        if (fs.existsSync('./scores.json')) {
            const rawData = fs.readFileSync('./scores.json');
            scores = JSON.parse(rawData.toString());
        }
        return scores;
    }

    writeGameData(gamesToSave) {
        const data = JSON.stringify(gamesToSave);
        fs.writeFileSync('games.json', data);
    }

    writeExtensionsData(extensions: string[]) {
        const data = JSON.stringify(extensions);
        fs.writeFileSync('extensions.json', data);
    }

    writeScores(scores: Scores): void {
        const data = JSON.stringify(scores);
        fs.writeFileSync('scores.json', data);
    }

}
