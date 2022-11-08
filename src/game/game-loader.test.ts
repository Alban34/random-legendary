import { beforeEach, describe, expect, test } from '@jest/globals';
import { GameLoader } from './game-loader';

describe('GameLoader', () => {
    let cardList;

    beforeEach(() => {
        cardList = {
            masterminds: [
                { name: 'm1', count: 0, gameId: ['not-to-be-found'] },
                { name: 'm2', count: 0, gameId: ['to-be-found'] }
            ],
            villains: [
                { name: 'v1', count: 10, gameId: ['to-be-found'] },
                { name: 'v2', count: 0, gameId: ['not-to-be-found'] }
            ],
            schemes: [
                { name: 's1', count: 0, gameId: ['to-be-found'] },
                { name: 's2', count: 0, gameId: ['not-to-be-found'] }
            ],
            henchmen: [
                { name: 'hm1', count: 10, gameId: ['not-to-be-found'] },
                { name: 'hm2', count: 0, gameId: ['to-be-found'] }
            ],
            heroes: [
                { name: 'h1', count: 0 },
                { name: 'h2', count: 0, gameId: ['to-be-found'] },
                { name: 'h3', count: 0, gameId: ['to-be-found'] },
                { name: 'h4', count: 0, gameId: ['not-to-be-found'] }
            ]
        };
    });

    test('should load the game corresponding to the given id', () => {
        const gameLoader = new GameLoader();
        const game = gameLoader.load(cardList, 'to-be-found');
        expect(game.mastermind.name).toBe('m2');
        expect(game.scheme.name).toBe('s1');
        expect(game.villains[0].name).toBe('v1');
        expect(game.henchmen[0].name).toBe('hm2');
        expect(game.heroes[0].name).toBe('h2');
        expect(game.heroes[1].name).toBe('h3');
    });
});
