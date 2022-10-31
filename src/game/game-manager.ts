import { Game, GameDataManager } from './game.module';
import { Card } from '../card/model/card';
import { inject, injectable } from 'inversify';
import TYPES from '../types';

@injectable()
export class GameManager {

    constructor(@inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager) {
    }

    public loadRegisteredGame(cardList): string[] {
        const gameIds = cardList.masterminds.flatMap(mastermind => mastermind.gameId);
        return gameIds.filter(gameId => gameId);
    }

    public loadRegisteredGameWithNoScore(cardList): string[] {
        const allGames = this.loadRegisteredGame(cardList);
        const scores = this.gameDataManager.loadScores();
        return allGames.filter(game => !scores[game] || !scores[game].score);
    }

    public getCardsOfGame(cardList, gameId: string): Game {

        const mastermind = this.getCardsOfGivenCategory(cardList.masterminds, gameId)[0];
        const scheme = this.getCardsOfGivenCategory(cardList.schemes, gameId)[0];
        const villains = this.getCardsOfGivenCategory(cardList.villains, gameId);
        const henchmen = this.getCardsOfGivenCategory(cardList.henchmen, gameId);
        const heroes = this.getCardsOfGivenCategory(cardList.heroes, gameId);

        return {
            gameId,
            mastermind,
            scheme,
            villains,
            henchmen,
            heroes,
            bystanders: -1
        };
    }

    private getCardsOfGivenCategory(catGardList: Card[], gameId: string): Card[] {
        return catGardList.filter(card => {
            if (card.gameId) {
                return card.gameId.indexOf(gameId) > -1;
            }
            return false;
        });
    }
}
