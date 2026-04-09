import { Scores } from '../game/model/scores';
import { SavedCardCatalog } from '../card/card.module';

export interface DataManager {
    readGamesData(): SavedCardCatalog | undefined;
    readExtensionsData(): string[];
    readScores(): Scores;
    writeGameData(gamesToSave: SavedCardCatalog): void;
    writeExtensionsData(extensions: string[]): void;
    writeScores(scores: Scores): void;
    getDataLocation(): string;
}
