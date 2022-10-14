import { describe, expect, test } from '@jest/globals';
import { DataManager } from './data-manager';

describe('data-manager', () => {
    test('should merge game count into the base data', () => {
        const dataManager = new DataManager();

        const baseCardList = {
            'masterminds': [
                { 'name': 'card1'},
                { 'name': 'card2'},
                { 'name': 'card3'}
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

        dataManager['mergeGameDataIntoBase'](baseCardList, gameCardList);

        expect(baseCardList.masterminds[1]['count']).toBe(2);
    });

    test('should merge game ids into the base data', () => {
        const dataManager = new DataManager();

        const baseCardList = {
            'masterminds': [
                { 'name': 'card1'},
                { 'name': 'card2'},
                { 'name': 'card3'}
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

        dataManager['mergeGameDataIntoBase'](baseCardList, gameCardList);

        const mergedGameIds = baseCardList.masterminds[1]['gameId'];
        expect(mergedGameIds.length).toBe(2);
        expect(mergedGameIds[0]).toBe('game1');
        expect(mergedGameIds[1]).toBe('game2');
    });
});
