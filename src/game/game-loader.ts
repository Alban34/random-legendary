import { Game } from './model/game';
import { injectable } from 'inversify';
import { Card, CardCatalog } from '../card/card.module';

@injectable()
export class GameLoader {

    public load(cardList: CardCatalog, gameId: string): Game {
        const mastermind = cardList.masterminds.filter(this.cardFilter(gameId))[0] as Game['mastermind'];
        const scheme = cardList.schemes.filter(this.cardFilter(gameId))[0] as Game['scheme'];
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

    private cardFilter(gameId: string): (card: Card) => boolean {
        return (card: Card) => {
            if (card.gameId) {
                return card.gameId.includes(gameId);
            }
            return false;
        }
    }
}
