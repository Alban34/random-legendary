import { beforeEach, describe, expect, test } from '@jest/globals';
import { GameManager } from './game-manager';
import { container } from '../injectable-config';
import TYPES from '../types';

describe('GameManager', () => {

    let gameManager: GameManager;

    beforeEach(() => {
        gameManager = container.get<GameManager>(TYPES.GameManager);
    });

    const cardList = {
        masterminds: [
            { name: 'm1', count: 2, gameId: ['game3', 'game2'] },
            { name: 'm2', count: 0 },
            { name: 'm3', count: 1, gameId: ['game1'] },
            { name: 'm4', count: 0 }
        ],
        schemes: [
            { name: 's1', count: 1, gameId: ['game1'] },
            { name: 's2', count: 1, gameId: ['game2'] },
            { name: 's3', count: 1, gameId: ['game3'] }
        ],
        villains: [
            { name: 'v1', count: 0 },
            { name: 'v2', count: 2, gameId: ['game1', 'game3'] },
            { name: 'v3', count: 0 },
            { name: 'v4', count: 1, gameId: ['game2'] },
        ],
        henchmen: [
            { name: 'hm1', count: 3, gameId: ['game1', 'game2', 'game3'] },
            { name: 'hm2', count: 0 },
            { name: 'hm3', count: 0 }
        ],
        heroes: [
            { name: 'h1', count: 1, gameId: ['game1'] },
            { name: 'h2', count: 3, gameId: ['game1', 'game2', 'game3'] },
            { name: 'h3', count: 1, gameId: ['game2'] },
            { name: 'h4', count: 1, gameId: ['game3'] }
        ]
    };

    test('should load all available registered games', () => {
        const gameIds = gameManager.loadRegisteredGame(cardList);
        expect(gameIds).toContain('game1');
        expect(gameIds).toContain('game2');
        expect(gameIds).toContain('game3');
    });

    test('should extract the cards of a given game', () => {
        const game = gameManager.getCardsOfGame(cardList, 'game1');
        expect(game.mastermind.name).toBe('m3');
        expect(game.scheme.name).toBe('s1');
        expect(game.villains.length).toBe(1);
        expect(game.villains[0].name).toBe('v2');
        expect(game.henchmen.length).toBe(1);
        expect(game.henchmen[0].name).toBe('hm1');
        expect(game.heroes.length).toBe(2);
        expect(game.heroes[0].name).toBe('h1');
        expect(game.heroes[1].name).toBe('h2');
    });

    test('should load only the games without a scoring already registered', () => {
        const games = gameManager.loadRegisteredGameWithNoScore(cardList);
        expect(games).toContain('game1');
        expect(games).toContain('game3');
    });
});
