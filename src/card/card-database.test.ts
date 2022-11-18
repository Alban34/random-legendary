import { beforeEach, describe, expect, test } from '@jest/globals';
import { container } from '../injectable-config';
import { CardLoader } from './card-loader';
import TYPES from '../types';
import { GameBuilder } from '../game/game-builder';
import { PredefinedGame } from '../game/model/predefined-game';
import { GAME_MODE, PlayerConfig } from '../game/player-config';

describe('custom rules tests on database', () => {

    let allCards;
    let gameBuilder: GameBuilder;
    beforeEach(() => {
        const cardLoader = container.get<CardLoader>(TYPES.CardLoader);
        allCards = cardLoader.loadData();
        gameBuilder = new GameBuilder();
    });

    describe('Age of Ultron', () => {
        const predefinedGame = {
            scheme: {
                name: 'Age of Ultron',
                extension: 'Ant-Man'
            }
        } as PredefinedGame;

        test('should add another hero in 4-5 players game', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.villains.length).toBe(4);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.villains.length).toBe(5);
        });

        test('should not add another hero in 1-3 players game', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.villains.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.villains.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.villains.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.villains.length).toBe(3);
        });
    });
});
