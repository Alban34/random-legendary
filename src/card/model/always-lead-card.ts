import { CustomRuleCard } from './custom-rule-card';

export interface AlwaysLeadCard extends CustomRuleCard {
    /** Specifies the exact name of the villains or henchmen to be lead by this Mastermind */
    alwaysLead?: string;
    /** Specifies if the group to always be lead is from villains or henchmen */
    alwaysLeadCategory?: 'villains' | 'henchmen';
    /** Specifies the category of villains that would be lead by this Mastermind (e.g. 'Sentinels') */
    specialLead?: string;
}
