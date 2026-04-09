import { DataManager } from './data-manager.interface';
import { Scores } from '../game/model/scores';
import { SavedCardCatalog } from '../card/card.module';
import fs from 'fs-extra';
import { injectable } from 'inversify';
import os from 'os';
import path from 'path';

@injectable()
export class FileDataManager implements DataManager {

    private readonly randomLegendaryHome: string;

    constructor() {
        this.randomLegendaryHome = process.env.RANDOM_LEGENDARY_HOME ?? path.join(os.homedir(), 'random-legendary');
        const dataFolderAlreadyExists = fs.existsSync(this.randomLegendaryHome);
        fs.ensureDirSync(this.randomLegendaryHome);
        if (dataFolderAlreadyExists) {
            console.log(`Using data folder found in ${this.randomLegendaryHome}`);
        } else {
            console.log(`Data folder created in ${this.randomLegendaryHome}`);
        }
        this.migrateDataFiles();
    }

    readExtensionsData(): string[] {
        return this.readData('extensions.json', []);
    }

    readGamesData(): SavedCardCatalog {
        return this.readData('games.json', {});
    }

    readScores(): Scores {
        return this.readData('scores.json', {});
    }

    writeGameData(gamesToSave: SavedCardCatalog): void {
        this.writeData(gamesToSave, 'games.json');
    }

    writeExtensionsData(extensions: string[]): void {
        this.writeData(extensions, 'extensions.json');
    }

    writeScores(scores: Scores): void {
        this.writeData(scores, 'scores.json');
    }

    getDataLocation(): string {
        return this.randomLegendaryHome;
    }

    private getFilePath(fileName: string): string {
        return path.join(this.randomLegendaryHome, fileName);
    }

    private readData<T>(fileName: string, defaultValue: T): T {
        if (fs.existsSync(this.getFilePath(fileName))) {
            const rawData = fs.readFileSync(this.getFilePath(fileName));
            return JSON.parse(rawData.toString()) as T;
        }
        return defaultValue;
    }

    private writeData<T>(data: T, fileName: string): void {
        const dataAsStr = JSON.stringify(data);
        fs.writeFileSync(this.getFilePath(fileName), dataAsStr);
    }

    private migrateDataFiles(): void {
        this.moveFile('games.json', 'Games');
        this.moveFile('extensions.json', 'Extensions');
        this.moveFile('scores.json', 'Scoring');
    }

    private moveFile(fileName: string, dataFileLabel: string): void {
        if (fs.existsSync(fileName)) {
            if (!fs.existsSync(this.getFilePath(fileName))) {
                void fs.move(fileName, this.getFilePath(fileName))
                    .then(() => {
                        console.log(`${dataFileLabel} data has been moved to ${this.randomLegendaryHome}`);
                    })
                    .catch((error: Error) => {
                        console.error(`Failed to move ${dataFileLabel} data to ${this.randomLegendaryHome}: ${error.message}`);
                    });
            } else {
                console.error(`${dataFileLabel} data has already been moved to ${this.randomLegendaryHome}. You might have some corrupted data.`);
            }
        }
    }
}
