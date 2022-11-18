import { Card } from './card';
import { Game } from '../../game/model/game';
import { CardDrawer } from '../card-drawer';

export interface CustomRuleCard extends Card {
    customRule?: (game: Game, cardDrawer: CardDrawer, allCards) => {};
}
