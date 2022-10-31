import { beforeEach, describe, expect, test } from '@jest/globals';
import { CardLoader } from './card-loader';
import { container } from '../injectable-config';
import TYPES from '../types';

describe('card-loader', () => {
    let cardLoader;

    beforeEach(() => {
        cardLoader = container.get<CardLoader>(TYPES.CardLoader);
    });

    test('should merge game count into the base data', () => {
        const baseCardList = {
            'masterminds': [
                { 'name': 'card1' },
                { 'name': 'card2' },
                { 'name': 'card3' }
            ],
            'schemes': [],
            'villains': [],
            'henchmen': [],
            'heroes': []
        };

        const gameCardList = {
            'masterminds': [
                { 'name': 'card1', 'count': 0 },
                { 'name': 'card2', 'count': 2 }
            ]
        };

        cardLoader['mergeGameDataIntoBase'](baseCardList, gameCardList);

        expect(baseCardList.masterminds[1]['count']).toBe(2);
    });

    test('should not break if the game data is empty', () => {
        const baseCardList = {
            'masterminds': [
                { 'name': 'card1' },
                { 'name': 'card2' },
                { 'name': 'card3' }
            ],
            'schemes': [],
            'villains': [],
            'henchmen': [],
            'heroes': []
        };

        const gameCardList = {};

        cardLoader['mergeGameDataIntoBase'](baseCardList, gameCardList);

        expect(baseCardList.masterminds.length).toBe(3);
    });

    test('should merge game ids into the base data', () => {
        const baseCardList = {
            'masterminds': [
                { 'name': 'card1' },
                { 'name': 'card2' },
                { 'name': 'card3' }
            ],
            'schemes': [],
            'villains': [],
            'henchmen': [],
            'heroes': []
        };

        const gameCardList = {
            'masterminds': [
                { 'name': 'card1', 'count': 0 },
                { 'name': 'card2', 'count': 2, 'gameId': ['game1', 'game2'] }
            ]
        };

        cardLoader['mergeGameDataIntoBase'](baseCardList, gameCardList);

        const mergedGameIds = baseCardList.masterminds[1]['gameId'];
        expect(mergedGameIds.length).toBe(2);
        expect(mergedGameIds[0]).toBe('game1');
        expect(mergedGameIds[1]).toBe('game2');
    });
});
