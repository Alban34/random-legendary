import { Card } from './card';
import { Game } from '../../game/model/game';
import { CardDrawer } from '../card-drawer';
import { CardCatalog } from './card-catalog';

export interface CustomRuleCard extends Card {
    customRule?: (game: Game, cardDrawer: CardDrawer, allCards: CardCatalog, playerCount: number) => void;

    /** Option minimum of player for this card (to address Super Hero Civil War scheme) */
    minimumPlayerCount?:number;
}
