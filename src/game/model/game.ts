import { AlwaysLeadCard, Card } from '../../card/card.module';

export interface Game {
    gameId: string;
    mastermind: AlwaysLeadCard;
    scheme: Card;
    villains: Card[];
    henchmen: Card[];
    henchmenCardsCount?: number;
    heroes: Card[];
    bystanders?: number;
    masterStrike?: number;
}
