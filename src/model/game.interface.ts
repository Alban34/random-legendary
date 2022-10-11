import { MastermindCard } from './mastermind.card';
import { Card } from './card.interface';

export interface Game {
    mastermind: MastermindCard;
    scheme: Card;
    villains: Card[];
    henchmen: Card[];
    heroes: Card[];
    bystanders: number;
}
