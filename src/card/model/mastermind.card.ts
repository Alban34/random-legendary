import { Card } from './card';

export interface MastermindCard extends Card {
    alwaysLead?: string;
    alwaysLeadCategory?: 'villains' | 'henchmen';
}
