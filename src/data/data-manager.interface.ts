import { Scores } from '../game/model/scores';

export interface DataManager {
    readGamesData();
    readExtensionsData(): string[];
    readScores(): Scores;
    writeGameData(gamesToSave): void;
    writeExtensionsData(extensions: string[]): void;
    writeScores(scores: Scores): void;
    getDataLocation(): string;
}
