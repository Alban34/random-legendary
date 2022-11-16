import { Game } from './model/game';
import { injectable } from 'inversify';

@injectable()
export class GameLoader {

    public load(cardList, gameId: string): Game {
        const mastermind = cardList.masterminds.filter(this.cardFilter(gameId))[0];
        const scheme = cardList.schemes.filter(this.cardFilter(gameId))[0];
        const villains = cardList.villains.filter(this.cardFilter(gameId));
        const henchmen = cardList.henchmen.filter(this.cardFilter(gameId));
        const heroes = cardList.heroes.filter(this.cardFilter(gameId));

        return {
            gameId,
            mastermind,
            scheme,
            villains,
            henchmen,
            heroes
        };
    }

    private cardFilter(gameId) {
        return (card) => {
            if (card.gameId) {
                return card.gameId.indexOf(gameId) > -1;
            }
            return false;
        }
    }
}
