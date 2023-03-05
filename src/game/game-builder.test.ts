import { describe, expect, test, beforeEach } from '@jest/globals';
import { GameBuilder } from './game-builder';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { CardDrawer } from '../card/card-drawer';
import { PredefinedGame } from './model/predefined-game';
import { ALL_CARDS } from '../card/card-database';

describe('GameBuilder', () => {

    const gameBuilder = new GameBuilder();

    let cardList;

    beforeEach(() => {
        cardList = {
            masterminds: [{
                name: 'm1',
                count: 0,
                alwaysLead: 'v1',
                alwaysLeadCategory: 'villains'
            }],
            villains: [
                { name: 'v1', count: 10, extension: 'ext1' },
                { name: 'v2', count: 0, extension: 'ext1' },
                { name: 'v3', count: 20, extension: 'ext1' }
            ],
            schemes: [
                { name: 's1', count: 0, extension: 'ext1' }
            ],
            henchmen: [
                { name: 'hm1', count: 10, extension: 'ext1' },
                { name: 'hm2', count: 0, extension: 'ext1' }
            ],
            heroes: [
                { name: 'h1', count: 0, extension: 'ext1' },
                { name: 'h2', count: 0, extension: 'ext1' },
                { name: 'h3', count: 0, extension: 'ext1' },
                { name: 'h4', count: 0, extension: 'ext1' }
            ]
        };
    });

    test('should build a game with a villain always lead mastermind', () => {
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.mastermind.name).toBe('m1');
        expect(game.villains[0].name).toBe('v1');
        expect(game.henchmen[0].name).toBe('hm2');
    });

    test('should build a game with an henchmen always lead mastermind', () => {
        cardList.masterminds[0]['alwaysLead'] = 'hm1';
        cardList.masterminds[0]['alwaysLeadCategory'] = 'henchmen';

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.mastermind.name).toBe('m1');
        expect(game.villains[0].name).toBe('v2');
        expect(game.henchmen[0].name).toBe('hm1');
    });

    test('should not take always lead into account for solo games', () => {
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(1));

        expect(game.mastermind.name).toBe('m1');
        expect(game.villains[0].name).toBe('v2');
        expect(game.henchmen[0].name).toBe('hm2');
    });

    test('should have a game uuid associated to each part of the game', () => {
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        const expectedUuid = game.gameId;
        expect(game.mastermind.gameId[0]).toBe(expectedUuid);
        expect(game.scheme.gameId[0]).toBe(expectedUuid);
        expect(game.villains[0].gameId[0]).toBe(expectedUuid);
        expect(game.henchmen[0].gameId[0]).toBe(expectedUuid);
        expect(game.heroes[0].gameId[0]).toBe(expectedUuid);
        expect(game.heroes[1].gameId[0]).toBe(expectedUuid);
        expect(game.heroes[2].gameId[0]).toBe(expectedUuid);
        expect(game.heroes[3].gameId[0]).toBe(expectedUuid);
    });

    test('should append a new game uuid to an already played card', () => {
        gameBuilder.buildGame(cardList, new PlayerConfig(2));
        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.mastermind.gameId.length).toBe(2);
        expect(game.mastermind.gameId[0]).not.toBe(game.mastermind.gameId[1]);
    });

    test('should force special cards for specialLead attribute', () => {
        cardList.masterminds[0]['specialLead'] = 'sl';

        cardList.henchmen.push({ name: 'hsl1', count: 20 });
        cardList.henchmen.push({ name: 'hsl2', count: 15 });
        cardList.henchmen.push({ name: 'hsl3', count: 20 });

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.villains[0].name).toBe('v1');
        expect(game.henchmen[0].name).toBe('hsl2');
    });

    test('should manage custom rules depending on additional callback on mastermind cards', () => {
        cardList.masterminds[0]['customRule'] = (game: Game, cardDrawer: CardDrawer, allCards) => {
            game.bystanders = 20;
            game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
        };

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.bystanders).toBe(20);
        expect(game.villains.length).toBe(3);
        game.villains.forEach(v => expect(v.gameId).toContain(game.gameId));
    });

    test('should manage custom rules depending on additional callback on scheme cards too', () => {
        cardList.schemes[0]['customRule'] = (game: Game, cardDrawer: CardDrawer, allCards) => {
            game.bystanders = 20;
            game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
        };

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.bystanders).toBe(20);
        expect(game.villains.length).toBe(3);
        game.villains.forEach(v => expect(v.gameId).toContain(game.gameId));
    });

    test('should create a game with predefined mastermind', () => {
        cardList.masterminds.push({
            name: 'm2',
            count: 10,
            alwaysLead: 'v1',
            alwaysLeadCategory: 'villains',
            extension: 'ext1'
        });
        const predefinedGame = {
            mastermind: { name: 'm2', extension: 'ext1' }
        } as PredefinedGame;

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2), predefinedGame);
        expect(game.mastermind.name).toBe('m2');
    });

    test('should create a game with predefined scheme', () => {
        cardList.schemes.push({
            name: 's2',
            count: 10,
            extension: 'ext1'
        });
        const predefinedGame = {
            scheme: { name: 's2', extension: 'ext1' }
        } as PredefinedGame;

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2), predefinedGame);
        expect(game.scheme.name).toBe('s2');
    });

    test('should create a game with everything predefined', () => {
        cardList.masterminds.push({
            name: 'm2',
            count: 10,
            extension: 'ext1'
        });
        cardList.schemes.push({
            name: 's2',
            extension: 'ext1'
        });
        const predefinedGame = {
            mastermind: { name: 'm2', extension: 'ext1' },
            scheme: { name: 's2', extension: 'ext1' },
            villains: [
                { name: 'v3', extension: 'ext1' }
            ],
            henchmen: [
                { name: 'hm1', extension: 'ext1' }
            ],
            heroes: [
                { name: 'h1', extension: 'ext1' },
                { name: 'h2', extension: 'ext1' },
                { name: 'h3', extension: 'ext1' }
            ]
        };

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(1), predefinedGame);
        expect(game.mastermind.name).toBe('m2');
        expect(game.mastermind.count).toBe(11);
        expect(game.scheme.name).toBe('s2');
        expect(game.scheme.count).toBe(1);
        expect(game.villains[0].name).toBe('v3');
        expect(game.villains[0].count).toBe(21);
        expect(game.henchmen[0].name).toBe('hm1');
        expect(game.henchmen[0].count).toBe(11);
        expect(game.heroes.map(h => h.name)).toEqual(['h1', 'h2', 'h3']);
        game.heroes.forEach(h => expect(h.count).toBe(1));
    });

    test('should work properly on duplicate heroes names', () => {
        const predefinedGame = {
            mastermind: { name: 'Red Skull', extension: 'Core Set' },
            scheme: { name: 'Detonate the Helicarrier', extension: 'Dark City' },
            villains: [{ name: 'Enemies of Asgard', extension: 'Core Set' }],
            heroes: [
                { name: 'Black Widow', extension: 'Core Set' },
                { name: 'Cyclops', extension: 'Core Set' },
                { name: 'Hawkeye', extension: 'Core Set' },
                { name: 'Daredevil', extension: 'Dark City' },
                { name: 'Iceman', extension: 'Dark City' },
                { name: 'Wolverine', extension: 'Dark City' }
            ],
            henchmen: [{ name: 'Maggia Goons', extension: 'Dark City' }]
        };

        const game = gameBuilder.buildGame(ALL_CARDS, new PlayerConfig(1), predefinedGame);
        expect(game.heroes.length).toBe(6);
    });

    test('should gameId ends by the game mode which is used', () => {
        for (let i = 0; i <= 5; i++) {
            const game = gameBuilder.buildGame(cardList, new PlayerConfig(i));
            expect(game.gameId.endsWith(`|${i}`)).toBeTruthy();
        }
    });
});
