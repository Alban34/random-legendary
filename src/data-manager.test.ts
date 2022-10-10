import { describe, expect, test } from '@jest/globals';
import { DataManager } from './data-manager';

describe('data-manager', () => {
    test('should merge game count into the base data', () => {
        const dataManager = new DataManager();

        const baseCardList = {
            'masterminds': [
                { 'name': 'card1', 'count': 0 },
                { 'name': 'card2', 'count': 0 },
                { 'name': 'card3', 'count': 0 }
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

        expect(baseCardList.masterminds[1].count).toBe(2);
    });
});
