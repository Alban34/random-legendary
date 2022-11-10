import { Scores } from './game.module';
import { DataManager } from '../data/data-manager.interface';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { Score } from './model/scores';

const gameFilter = (card) => card.gameId && card.gameId.length > 0;

@injectable()
export class GameDataManager {

    constructor(@inject(TYPES.DataManager) private readonly dataManager: DataManager) {
    }


    public saveData(legendaryBase): void {
        const gamesToSave = {
            'masterminds': legendaryBase.masterminds.filter(gameFilter),
            'schemes': legendaryBase.schemes.filter(gameFilter),
            'villains': legendaryBase.villains.filter(gameFilter),
            'henchmen': legendaryBase.henchmen.filter(gameFilter),
            'heroes': legendaryBase.heroes.filter(gameFilter)
        };
        this.dataManager.writeGameData(gamesToSave);
    }

    public loadScores(): Scores {
        return this.dataManager.readScores();
    }

    public saveScore(gameId: string, playersScores: Score[]): void {
        const scores = this.loadScores();
        scores[gameId] = playersScores;
        this.dataManager.writeScores(scores);
    }

}
