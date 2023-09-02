import { PlayerConfig } from './game/player-config';
import { Card } from './card/model/card';
import { inject, injectable } from 'inversify';
import { CardLoader } from './card/card-loader';
import { GameManager } from './game/game-manager';
import { GameDataManager } from './game/game-data-manager';
import { DataManager } from './data/data-manager.interface';
import TYPES from './types';
import { Scores } from './game/model/scores';

@injectable()
export class Migrator {

    constructor(@inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
                @inject(TYPES.GameManager) private readonly gameManager: GameManager,
                @inject(TYPES.GameDataManager) private readonly gameDataManager: GameDataManager,
                @inject(TYPES.DataManager) private readonly dataManager: DataManager) {
    }

    /**
     * Perform the migration of the game ids to the new way introduced in 4.0.0
     */
    public migrateGameIdTo4() {
        const allCardList = this.cardLoader.loadData();
        const gameIds = this.gameManager.loadRegisteredGame(allCardList);
        const gameToMigrate = gameIds.filter(gameId => gameId.indexOf('|') === -1);

        if (gameToMigrate.length > 0) {
            const allScores = this.gameDataManager.loadScores();
            const scoresWithNewId: Scores = {};
            gameToMigrate.forEach(gameId => {
                const game = this.gameManager.getCardsOfGame(allCardList, gameId);
                const guessedPlayerCount = PlayerConfig.guessPlayerCount(game.villains.length, game.henchmen.length, game.heroes.length);
                const newId = `${gameId}|${guessedPlayerCount}`;

                this.migrateGameIdInCard(game.mastermind, gameId, newId);
                this.migrateGameIdInCard(game.scheme, gameId, newId);
                game.villains.forEach(c => this.migrateGameIdInCard(c, gameId, newId));
                game.henchmen.forEach(c => this.migrateGameIdInCard(c, gameId, newId));
                game.heroes.forEach(c => this.migrateGameIdInCard(c, gameId, newId));

                scoresWithNewId[newId] = allScores[gameId];
            });
            this.gameDataManager.saveData(allCardList);
            this.dataManager.writeScores(scoresWithNewId);
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
