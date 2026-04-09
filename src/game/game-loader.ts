import { Game } from './model/game';
import { injectable } from 'inversify';
import { Card, CardCatalog, CatalogCard } from '../card/card.module';

@injectable()
export class GameLoader {

    public load(cardList: CardCatalog, gameId: string): Game {
        const mastermind = this.getRequiredCard(cardList.masterminds, gameId) as Game['mastermind'];
        const scheme = this.getRequiredCard(cardList.schemes, gameId);
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

    private getRequiredCard(cards: CatalogCard[], gameId: string): CatalogCard {
        const card = cards.find(this.cardFilter(gameId));
        if (!card) {
            throw new Error(`Unable to find a saved card for game '${gameId}'`);
        }
        return card;
    }
}
