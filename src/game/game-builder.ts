import { randomUUID } from 'node:crypto';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { Card, CardCatalog, CardDrawer, AlwaysLeadCard } from '../card/card.module';
import { CustomRuleCard } from '../card/model/custom-rule-card';
import { CardIdentifier, PredefinedGame } from './model/predefined-game';

type SingleCardType = 'mastermind' | 'scheme';
type SingleCardGroup = 'masterminds' | 'schemes';
type AlwaysLeadType = 'villains' | 'henchmen';

export class GameBuilder {

    private cardDrawer = new CardDrawer();

    public buildGame(allCards: CardCatalog, playerConfig: PlayerConfig, predefinedGame?: PredefinedGame): Game {

        const gameId = `${randomUUID()}|${playerConfig.getGameMode()}`;
        const alwaysLeadVillains: string[] = [];
        const alwaysLeadHenchmen: string[] = [];
        let alwaysUseHeroes: CardIdentifier[] = [];

        const mastermind = this.getCard(predefinedGame, allCards, 'mastermind', 'masterminds', playerConfig) as AlwaysLeadCard;
        if (playerConfig.playerCount > 1) {
            this.setupAlwaysLead(mastermind, alwaysLeadVillains, alwaysLeadHenchmen);
        }

        let strictHenchmen = true;
        if (mastermind.specialLead) {
            alwaysLeadHenchmen.push(mastermind.specialLead);
            strictHenchmen = false;
        }

        const scheme = this.getCard(predefinedGame, allCards, 'scheme', 'schemes', playerConfig) as AlwaysLeadCard;
        this.setupAlwaysLead(scheme, alwaysLeadVillains, alwaysLeadHenchmen);

        this.fillAlwaysArray(predefinedGame, 'villains', alwaysLeadVillains);
        this.fillAlwaysArray(predefinedGame, 'henchmen', alwaysLeadHenchmen);
        this.fillAlwaysHeroesArray(predefinedGame, alwaysUseHeroes);

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

    private getCard(predefinedGame: PredefinedGame | undefined, allCards: CardCatalog, cardType: SingleCardType, cardGroup: SingleCardGroup, playerConfig: PlayerConfig): Card {
        let card: Card;
        if (predefinedGame?.[cardType]) {
            card = allCards[cardGroup].filter((c) => c.name === predefinedGame[cardType]?.name && c.extension === predefinedGame[cardType]?.extension)[0];
            if (!card.count) {
                card.count = 0;
            }
            card.count++;
        }
        if (!card) {
            const cardsToChoseFrom = allCards[cardGroup].filter((card) => !card.minimumPlayerCount || playerConfig.playerCount >= card.minimumPlayerCount);
            card = this.cardDrawer.drawRandomUnique(cardsToChoseFrom);
        }
        return card;
    }

    private addGameIdToCard(card: Card, gameId: string) {
        if (!card.gameId) {
            card.gameId = [];
        }
        card.gameId.push(gameId);
    }

    private customizeGame(card: CustomRuleCard, game: Game, allCards: CardCatalog, playerCount: number): void {
        if (card.customRule) {
            card.customRule(game, this.cardDrawer, allCards, playerCount);
        }
    }

    private fillAlwaysArray(predefinedGame: PredefinedGame | undefined, cardType: AlwaysLeadType, arrayToFill: string[]): void {
        if (predefinedGame?.[cardType]) {
            predefinedGame[cardType].forEach((c) => {
                if (!arrayToFill.includes(c.name)) {
                    arrayToFill.push(c.name);
                }
            });
        }
    }

    private fillAlwaysHeroesArray(predefinedGame: PredefinedGame | undefined, arrayToFill: CardIdentifier[]): void {
        if (predefinedGame?.heroes) {
            predefinedGame.heroes.forEach((c) => {
                if (!arrayToFill.some((hero) => hero.name === c.name && hero.extension === c.extension)) {
                    arrayToFill.push(c);
                }
            });
        }
    }

    private setupAlwaysLead(card: AlwaysLeadCard, alwaysLeadVillains: string[], alwaysLeadHenchmen: string[]): void {
        if (card.alwaysLead) {
            switch (card.alwaysLeadCategory) {
                case 'villains':
                    alwaysLeadVillains.push(card.alwaysLead);
                    break;
                case 'henchmen':
                    alwaysLeadHenchmen.push(card.alwaysLead);
                    break;
                default:
                    console.error(`Category ${card.alwaysLeadCategory} is not supported`);
            }
        }
    }
}
