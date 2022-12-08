import { v4 as uuidv4 } from 'uuid';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { Card, CardDrawer, MastermindCard } from '../card/card.module';
import { CustomRuleCard } from '../card/model/custom-rule-card';
import { PredefinedGame } from './model/predefined-game';

export class GameBuilder {

    private cardDrawer = new CardDrawer();

    public buildGame(allCards, playerConfig: PlayerConfig, predefinedGame?: PredefinedGame): Game {

        const gameId = uuidv4();
        let alwaysLeadVillains = [];
        let alwaysLeadHenchmen = [];
        let alwaysUseHeroes = [];

        const mastermind = this.getCard(predefinedGame, allCards, 'mastermind', 'masterminds') as MastermindCard;
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

        this.fillAlwaysArray(predefinedGame, 'villains', alwaysLeadVillains);
        this.fillAlwaysArray(predefinedGame, 'henchmen', alwaysLeadHenchmen);
        this.fillAlwaysArray(predefinedGame, 'heroes', alwaysUseHeroes);

        const scheme = this.getCard(predefinedGame, allCards, 'scheme', 'schemes') as CustomRuleCard;
        const villains = this.cardDrawer.drawRandomMultipleForce(allCards.villains, playerConfig.villainsCount, alwaysLeadVillains);
        const henchmen = this.cardDrawer.drawRandomMultipleForce(allCards.henchmen, playerConfig.henchmenCount, alwaysLeadHenchmen, strictHenchmen);
        const heroes = this.cardDrawer.drawRandomMultipleForce(allCards.heroes, playerConfig.heroesCount, alwaysUseHeroes);

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

        this.customizeGame(mastermind, game, allCards, playerConfig.playerCount);
        this.customizeGame(scheme, game, allCards, playerConfig.playerCount);

        this.addGameIdToCard(game.mastermind, gameId);
        this.addGameIdToCard(game.scheme, gameId);
        game.villains.forEach(villain => this.addGameIdToCard(villain, gameId));
        game.henchmen.forEach(henchman => this.addGameIdToCard(henchman, gameId));
        game.heroes.forEach(hero => this.addGameIdToCard(hero, gameId));

        return game;
    }

    private getCard(predefinedGame, allCards, cardType, cardGroup) {
        let card;
        if (predefinedGame && predefinedGame[cardType]) {
            card = allCards[cardGroup].filter(c => c.name === predefinedGame[cardType].name && c.extension === predefinedGame[cardType].extension)[0];
            if (!card.count) {
                card.count = 0;
            }
            card.count++;
        }
        if (!card) {
            card = this.cardDrawer.drawRandomUnique(allCards[cardGroup]);
        }
        return card;
    }

    private addGameIdToCard(card: Card, gameId: string) {
        if (!card.gameId) {
            card.gameId = [];
        }
        card.gameId.push(gameId);
    }

    private customizeGame(card: CustomRuleCard, game: Game, allCards, playerCount) {
        if (card.customRule) {
            card.customRule(game, this.cardDrawer, allCards, playerCount);
        }
    }

    private fillAlwaysArray(predefinedGame: PredefinedGame, cardType: string, arrayToFill: string[]) {
        if (predefinedGame && predefinedGame[cardType]) {
            predefinedGame[cardType].forEach(c => {
                if (!arrayToFill.includes(c)) {
                    arrayToFill.push(c.name);
                }
            });
        }
    }
}
