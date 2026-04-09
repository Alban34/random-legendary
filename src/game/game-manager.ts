import { Game, GameDataManager } from './game.module';
import { Card, CardCatalog } from '../card/card.module';
import { inject, injectable } from 'inversify';
import TYPES from '../types';

type StoredCard = Pick<Card, 'name'> & Partial<Pick<Card, 'count' | 'gameId' | 'extension'>>;
type StoredCardCatalog = {
    masterminds: StoredCard[];
    schemes: StoredCard[];
    villains: StoredCard[];
    henchmen: StoredCard[];
    heroes: StoredCard[];
};

@injectable()
export class GameManager {

    constructor(@inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager) {
    }

    public loadRegisteredGame(cardList: StoredCardCatalog | CardCatalog): string[] {
        const gameIds = cardList.masterminds.flatMap((mastermind) => mastermind.gameId ?? []);
        return gameIds.filter(Boolean);
    }

    public loadRegisteredGameWithNoScore(cardList: StoredCardCatalog | CardCatalog): string[] {
        const allGames = this.loadRegisteredGame(cardList);
        const scores = this.gameDataManager.loadScores();
        return allGames.filter(game => !scores[game] || scores[game].length === 0);
    }

    public getCardsOfGame(cardList: StoredCardCatalog | CardCatalog, gameId: string): Game {
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
            heroes
        } as Game;
    }

    private getCardsOfGivenCategory(catGardList: StoredCard[], gameId: string): StoredCard[] {
        return catGardList.filter(card => {
            if (card.gameId) {
                return card.gameId.indexOf(gameId) > -1;
            }
            return false;
        });
    }
}
