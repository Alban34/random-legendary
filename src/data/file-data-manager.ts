import { DataManager } from './data-manager.interface';
import { Scores } from '../game/model/scores';
import fs from 'fs-extra';
import { injectable } from 'inversify';
import os from 'os';
import path from 'path';

@injectable()
export class FileDataManager implements DataManager {

    private readonly randomLegendaryHome: string;

    constructor() {
        this.randomLegendaryHome = os.homedir() + path.sep + 'random-legendary';
        if (!fs.existsSync(this.randomLegendaryHome)) {
            fs.mkdirs(this.randomLegendaryHome).then(() => console.log(`Data folder created in ${this.randomLegendaryHome}`));
        } else {
            console.log(`Using data folder found in ${this.randomLegendaryHome}`);
        }
        this.migrateDataFiles();
    }

    readExtensionsData(): string[] {
        return this.readData('extensions.json', []);
    }

    readGamesData() {
        return this.readData('games.json', {});
    }

    readScores(): Scores {
        return this.readData('scores.json', {});
    }

    writeGameData(gamesToSave) {
        this.writeData(gamesToSave, 'games.json');
    }

    writeExtensionsData(extensions: string[]) {
        this.writeData(extensions, 'extensions.json');
    }

    writeScores(scores: Scores): void {
        this.writeData(scores, 'scores.json');
    }

    getDataLocation(): string {
        return this.randomLegendaryHome;
    }

    private getFilePath(fileName) {
        return this.randomLegendaryHome + path.sep + fileName;
    }

    private readData(fileName, defaultValue) {
        if (fs.existsSync(this.getFilePath(fileName))) {
            const rawData = fs.readFileSync(this.getFilePath(fileName));
            return JSON.parse(rawData.toString());
        }
        return defaultValue;
    }

    private writeData(data, fileName) {
        const dataAsStr = JSON.stringify(data);
        fs.writeFileSync(this.getFilePath(fileName), dataAsStr);
    }

    private migrateDataFiles() {
        this.moveFile('games.json', 'Games');
        this.moveFile('extensions.json', 'Extensions');
        this.moveFile('scores.json', 'Scoring');
    }

    private moveFile(fileName, dataFileLabel) {
        if (fs.existsSync(fileName)) {
            if (!fs.existsSync(fileName)) {
                fs.move(fileName, this.getFilePath(fileName)).then(() => {
                    console.log(`${dataFileLabel} data has been moved to ${this.randomLegendaryHome}`);
                });
            } else {
                console.error(`${dataFileLabel} data has already been moved to ${this.randomLegendaryHome}. You might have some corrupted data.`);
            }
        }
    }
}
