import { Card } from './card.interface';

export interface MastermindCard extends Card {
    alwaysLead?: string;
    alwaysLeadCategory?: 'villains' | 'henchmen';
}
