import { v4 as uuidv4 } from 'uuid';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { Card, CardDrawer, MastermindCard } from '../card/card.module';

export class GameBuilder {

    private cardDrawer = new CardDrawer();

    public buildGame(legendaryBase, playerConfig: PlayerConfig): Game {

        const gameId = uuidv4();
        let alwaysLeadVillains = [];
        let alwaysLeadHenchmen = [];

        const mastermind = this.cardDrawer.drawRandomUnique(legendaryBase.masterminds) as MastermindCard;
        if (playerConfig.playerCount > 1) {
            switch (mastermind.alwaysLeadCategory) {
                case 'villains':
                    alwaysLeadVillains.push(mastermind.alwaysLead);
                    break;
                case 'henchmen':
                    alwaysLeadHenchmen.push(mastermind.alwaysLead);
                    break;
                default:
                    console.error(`Category ${mastermind.alwaysLeadCategory} is not supported`);
            }
        }

        const scheme = this.cardDrawer.drawRandomUnique(legendaryBase.schemes);
        const villains = this.cardDrawer.drawRandomMultipleForce(legendaryBase.villains, playerConfig.villainsCount, alwaysLeadVillains);
        const henchmen = this.cardDrawer.drawRandomMultipleForce(legendaryBase.henchmen, playerConfig.henchmenCount, alwaysLeadHenchmen);
        const heroes = this.cardDrawer.drawRandomMultiple(legendaryBase.heroes, playerConfig.heroesCount);

        this.addGameIdToCard(mastermind, gameId);
        this.addGameIdToCard(scheme, gameId);
        villains.forEach(villain => this.addGameIdToCard(villain, gameId));
        henchmen.forEach(henchman => this.addGameIdToCard(henchman, gameId));
        heroes.forEach(hero => this.addGameIdToCard(hero, gameId));

        return {
            gameId: gameId,
            mastermind,
            scheme,
            villains,
            henchmen,
            heroes,
            bystanders: playerConfig.bystandersCount,
            masterStrike: playerConfig.masterStrikeCount
        };
    }

    private addGameIdToCard(card: Card, gameId: string) {
        if (!card.gameId) {
            card.gameId = [];
        }
        card.gameId.push(gameId);
    }

}
