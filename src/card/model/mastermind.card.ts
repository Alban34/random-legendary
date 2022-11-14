import { Card } from './card';
import { Game } from '../../game/model/game';
import { CardDrawer } from '../card-drawer';

export interface MastermindCard extends Card {
    alwaysLead?: string;
    alwaysLeadCategory?: 'villains' | 'henchmen';
    specialLead?: string;
    customRule?: (game: Game, cardDrawer: CardDrawer, allCards) => {};
}
