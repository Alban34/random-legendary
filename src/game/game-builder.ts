import { v4 as uuidv4 } from 'uuid';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { Card, CardDrawer, MastermindCard } from '../card/card.module';
import { CustomRuleCard } from '../card/model/custom-rule-card';

export class GameBuilder {

    private cardDrawer = new CardDrawer();

    public buildGame(allCards, playerConfig: PlayerConfig): Game {

        const gameId = uuidv4();
        let alwaysLeadVillains = [];
        let alwaysLeadHenchmen = [];

        const mastermind = this.cardDrawer.drawRandomUnique(allCards.masterminds) as MastermindCard;
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

        let strictHenchmen = true;
        if (mastermind.specialLead) {
            alwaysLeadHenchmen.push(mastermind.specialLead);
            strictHenchmen = false;
        }

        const scheme = this.cardDrawer.drawRandomUnique(allCards.schemes) as CustomRuleCard;
        const villains = this.cardDrawer.drawRandomMultipleForce(allCards.villains, playerConfig.villainsCount, alwaysLeadVillains);
        const henchmen = this.cardDrawer.drawRandomMultipleForce(allCards.henchmen, playerConfig.henchmenCount, alwaysLeadHenchmen, strictHenchmen);
        const heroes = this.cardDrawer.drawRandomMultiple(allCards.heroes, playerConfig.heroesCount);

        const game = {
            gameId: gameId,
            mastermind,
            scheme,
            villains,
            henchmen,
            henchmenCardsCount: playerConfig.henchmenCardsCount,
            heroes,
            bystanders: playerConfig.bystandersCount,
            masterStrike: playerConfig.masterStrikeCount
        };

        this.customizeGame(mastermind, game, allCards);
        this.customizeGame(scheme, game, allCards);

        this.addGameIdToCard(game.mastermind, gameId);
        this.addGameIdToCard(game.scheme, gameId);
        game.villains.forEach(villain => this.addGameIdToCard(villain, gameId));
        game.henchmen.forEach(henchman => this.addGameIdToCard(henchman, gameId));
        game.heroes.forEach(hero => this.addGameIdToCard(hero, gameId));

        return game;
    }

    private addGameIdToCard(card: Card, gameId: string) {
        if (!card.gameId) {
            card.gameId = [];
        }
        card.gameId.push(gameId);
    }

    private customizeGame(card: CustomRuleCard, game: Game, allCards) {
        if (card.customRule) {
            card.customRule(game, this.cardDrawer, allCards);
        }
    }
}
