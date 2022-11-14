import { describe, expect, test, beforeEach } from '@jest/globals';
import { GameBuilder } from './game-builder';
import { PlayerConfig } from './player-config';
import { Game } from './model/game';
import { CardDrawer } from '../card/card-drawer';

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
                { name: 'v1', count: 10 },
                { name: 'v2', count: 0 },
                { name: 'v3', count: 20 }
            ],
            schemes: [
                { name: 's1', count: 0 }
            ],
            henchmen: [
                { name: 'hm1', count: 10 },
                { name: 'hm2', count: 0 }
            ],
            heroes: [
                { name: 'h1', count: 0 },
                { name: 'h2', count: 0 },
                { name: 'h3', count: 0 },
                { name: 'h4', count: 0 }
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

    test('should manage very custom rules depending on additional callback on cards', () => {
        cardList.masterminds[0]['customRule'] = (game: Game, cardDrawer: CardDrawer, allCards) => {
            game.bystanders = 20;
            game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
        };

        const game = gameBuilder.buildGame(cardList, new PlayerConfig(2));

        expect(game.bystanders).toBe(20);
        expect(game.villains.length).toBe(3);
        game.villains.forEach(v => expect(v.gameId).toContain(game.gameId));
    });
});
