import { Card } from './card';
import { Game } from '../../game/model/game';
import { CardDrawer } from '../card-drawer';

export interface CustomRuleCard extends Card {
    customRule?: (game: Game, cardDrawer: CardDrawer, allCards, playerCount: number) => {};

    /** Option minimum of player for this card (to address Super Hero Civil War scheme) */
    minimumPlayerCount?:number;
}
