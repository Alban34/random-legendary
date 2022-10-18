import { MastermindCard, Card } from '../../card/card.module';

export interface Game {
    gameId: string;
    mastermind: MastermindCard;
    scheme: Card;
    villains: Card[];
    henchmen: Card[];
    heroes: Card[];
    bystanders: number;
}
