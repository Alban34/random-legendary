import { CardInterface } from './card.interface';

export interface MastermindCardInterface extends CardInterface {
    alwaysLead: string;
    alwaysLeadCategory: 'villains' | 'henchmen';
}
