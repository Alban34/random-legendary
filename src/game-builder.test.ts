import { describe, expect, test } from '@jest/globals';
import { GameBuilder } from './game-builder';
import { PlayerConfig } from './player-config';

describe('GameBuilder', () => {
    test('should build a game with a villain always lead mastermind', () => {
        const cardList = {
            masterminds: [{
                name: 'm1',
                count: 0,
                alwaysLead: 'v1',
                alwaysLeadCategory: 'villains'
            }],
            villains: [
                { name: 'v1', count: 10 },
                { name: 'v2', count: 0 }
            ],
            schemes: [
                { name: 's1', count: 0 }
            ],
            henchmen: [
                { name: 'hm1', count: 10 },
                { name: 'hm2', count: 0 }
            ],
            heroes: [
                { name: 'h1', count: 10 },
                { name: 'h2', count: 0 },
                { name: 'h3', count: 0 }
            ]
        };

        const gameBuilder = new GameBuilder();
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(1));

        expect(game.mastermind.name).toBe('m1');
        expect(game.villains[0].name).toBe('v1');
        expect(game.henchmen[0].name).toBe('hm2');
    });

    test('should build a game with an henchmen always lead mastermind', () => {
        const cardList = {
            masterminds: [{
                name: 'm1',
                count: 0,
                alwaysLead: 'hm1',
                alwaysLeadCategory: 'henchmen'
            }],
            villains: [
                { name: 'v1', count: 10 },
                { name: 'v2', count: 0 }
            ],
            schemes: [
                { name: 's1', count: 0 }
            ],
            henchmen: [
                { name: 'hm1', count: 10 },
                { name: 'hm2', count: 0 }
            ],
            heroes: [
                { name: 'h1', count: 10 },
                { name: 'h2', count: 0 },
                { name: 'h3', count: 0 }
            ]
        };

        const gameBuilder = new GameBuilder();
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(1));

        expect(game.mastermind.name).toBe('m1');
        expect(game.villains[0].name).toBe('v2');
        expect(game.henchmen[0].name).toBe('hm1');
    });
});
