import { Game, GameDataManager, PlayerConfig, Scores } from './game.module';
import { Card } from '../card/model/card';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { CardLoader } from '../card/card-loader';
import { DataManager } from '../data/data-manager.interface';
import { Score } from './model/scores';
import { all } from 'inversify-express-utils';

@injectable()
export class GameManager {

    constructor(@inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager,
                @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
                @inject(TYPES.DataManager) private readonly dataManager: DataManager) {
        // Migrate previous gameIds to the new 4.0 version way
        this.migrateGameIdTo4();
    }

    public loadRegisteredGame(cardList): string[] {
        const gameIds = cardList.masterminds.flatMap(mastermind => mastermind.gameId);
        return gameIds.filter(gameId => gameId);
    }

    public loadRegisteredGameWithNoScore(cardList): string[] {
        const allGames = this.loadRegisteredGame(cardList);
        const scores = this.gameDataManager.loadScores();
        return allGames.filter(game => !scores[game] || scores[game].length === 0);
    }

    public getCardsOfGame(cardList, gameId: string): Game {
        const mastermind = this.getCardsOfGivenCategory(cardList.masterminds, gameId)[0];
        const scheme = this.getCardsOfGivenCategory(cardList.schemes, gameId)[0];
        const villains = this.getCardsOfGivenCategory(cardList.villains, gameId);
        const henchmen = this.getCardsOfGivenCategory(cardList.henchmen, gameId);
        const heroes = this.getCardsOfGivenCategory(cardList.heroes, gameId);

        return {
            gameId,
            mastermind,
            scheme,
            villains,
            henchmen,
            heroes
        };
    }

    private getCardsOfGivenCategory(catGardList: Card[], gameId: string): Card[] {
        return catGardList.filter(card => {
            if (card.gameId) {
                return card.gameId.indexOf(gameId) > -1;
            }
            return false;
        });
    }

    private migrateGameIdTo4() {
        const allCardList = this.cardLoader.loadData();
        const gameIds = this.loadRegisteredGame(allCardList);
        const gameToMigrate = gameIds.filter(gameId => gameId.indexOf('|') === -1);

        if (gameToMigrate.length > 0) {
            const allScores = this.gameDataManager.loadScores();
            const gamesToSave = [];
            gameToMigrate.forEach(gameId => {
                const game = this.getCardsOfGame(allCardList, gameId);
                const guessedPlayerCount = PlayerConfig.guessPlayerCount(game.villains.length, game.henchmen.length, game.heroes.length);
                const newId = `${gameId}|${guessedPlayerCount}`;

                this.migrateGameIdInCard(game.mastermind, gameId, newId);
                this.migrateGameIdInCard(game.scheme, gameId, newId);
                game.villains.forEach(c => this.migrateGameIdInCard(c, gameId, newId));
                game.henchmen.forEach(c => this.migrateGameIdInCard(c, gameId, newId));
                game.heroes.forEach(c => this.migrateGameIdInCard(c, gameId, newId));

                gamesToSave.push(game);
                allScores[newId] = allScores[gameId];
                delete allScores[gameId];
            });
            this.dataManager.writeGameData(gamesToSave);
            this.dataManager.writeScores(allScores);
            console.log(`${gameToMigrate.length} games migrated to the new 4.0 version way.`);
        }
    }

    private migrateGameIdInCard(card: Card, gameId: string, newId: string) {
        const index = card.gameId.indexOf(gameId);
        if (index !== -1) {
            card.gameId[index] = newId;
        }
    }
}
