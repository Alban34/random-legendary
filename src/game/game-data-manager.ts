import { Scores } from './game.module';
import fs from 'fs-extra';
import { DataManager } from '../data/data-manager.interface';

export class GameDataManager {

    constructor(private readonly dataManager: DataManager) {}

    public saveData(legendaryBase): void {
        const gamesToSave = {
            "masterminds": legendaryBase.masterminds,
            "schemes": legendaryBase.schemes,
            "villains": legendaryBase.villains,
            "henchmen": legendaryBase.henchmen,
            "heroes": legendaryBase.heroes
        };
        this.dataManager.writeGameData(gamesToSave);
    }

    public loadScores(): Scores {
        return this.dataManager.readScores();
    }

    public saveScore(gameId: string, score: number): void {
        const scores = this.loadScores();
        scores[gameId] = { score };
        this.dataManager.writeScores(scores);
    }

}
