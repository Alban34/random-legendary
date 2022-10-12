import { Game } from './model/game.interface';
import { Card } from './model/card.interface';

export class GameManager {

    public loadRegisteredGame(cardList): string[] {
        const gameIds = cardList.masterminds.flatMap(mastermind => mastermind.gameId);
        return gameIds.filter(gameId => gameId);
    }

    public getCards(cardList, gameId: string): Game {

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
        return catGardList.filter(s => {
            if (s.gameId) {
                return s.gameId.indexOf(gameId) > -1;
            }
            return false;
        });
    }
}
