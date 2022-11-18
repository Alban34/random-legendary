import { CustomRuleCard } from './custom-rule-card';

export interface MastermindCard extends CustomRuleCard {
    alwaysLead?: string;
    alwaysLeadCategory?: 'villains' | 'henchmen';
    specialLead?: string;
}
