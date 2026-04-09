import { CustomRuleCard } from './custom-rule-card';

export interface CatalogCard extends CustomRuleCard {
    alwaysLead?: string;
    alwaysLeadCategory?: string;
    specialLead?: string;
}

export interface CardCatalog {
    masterminds: CatalogCard[];
    schemes: CatalogCard[];
    villains: CatalogCard[];
    henchmen: CatalogCard[];
    heroes: CatalogCard[];
}

export type SavedCardCatalog = Partial<CardCatalog>;
export type CardCategory = keyof CardCatalog;

