import { describe, expect, test } from '@jest/globals';
import { CardManager } from './card-manager';

describe('CardManager', () => {
    test('should load all available extensions', () => {
        const cardList = {
            masterminds: [
                { name: 'm1', extension: 'ext2' },
                { name: 'm2', extension: 'ext1' },
                { name: 'm3', extension: 'ext1' },
                { name: 'm4', extension: 'ext3' }
            ]
        };

        const cardManager = new CardManager();
        const availableExtensions = cardManager.getAvailableExtensions(cardList);
        expect(availableExtensions).toStrictEqual(['ext1', 'ext2', 'ext3']);
    });

    test('should be able to filter a card list returning only selected extensions', () => {
        const cardList = {
            masterminds: [
                { name: 'm1', extension: 'ext2' },
                { name: 'm2', extension: 'ext2' },
                { name: 'm3', extension: 'ext1' }
            ],
            schemes: [
                { name: 's1', extension: 'ext2' },
                { name: 's2', extension: 'ext1' },
                { name: 's3', extension: 'ext2' }
            ],
            villains: [
                { name: 'v1', extension: 'ext2' },
                { name: 'v2', extension: 'ext1' }
            ],
            henchmen: [
                { name: 'hm1', extension: 'ext2' },
                { name: 'hm2', extension: 'ext1' }
            ],
            heroes: [
                { name: 'h1', extension: 'ext2' },
                { name: 'h2', extension: 'ext1' },
                { name: 'h3', extension: 'ext2' },
                { name: 'h4', extension: 'ext2' }
            ]
        };

        const cardManager = new CardManager();
        const filteredCards = cardManager.filterAllCards(cardList, ['ext2']);
        let cardsFound = filteredCards.masterminds.flatMap(m => m.extension);
        expect(cardsFound.indexOf('ext2')).toBeGreaterThan(-1);
        expect(cardsFound.indexOf('ext1')).toBe(-1);
        expect(cardsFound.length).toBe(2);

        cardsFound = filteredCards.schemes.flatMap(m => m.extension);
        expect(cardsFound.indexOf('ext2')).toBeGreaterThan(-1);
        expect(cardsFound.indexOf('ext1')).toBe(-1);
        expect(cardsFound.length).toBe(2);

        cardsFound = filteredCards.villains.flatMap(m => m.extension);
        expect(cardsFound.indexOf('ext2')).toBeGreaterThan(-1);
        expect(cardsFound.indexOf('ext1')).toBe(-1);
        expect(cardsFound.length).toBe(1);

        cardsFound = filteredCards.henchmen.flatMap(m => m.extension);
        expect(cardsFound.indexOf('ext2')).toBeGreaterThan(-1);
        expect(cardsFound.indexOf('ext1')).toBe(-1);
        expect(cardsFound.length).toBe(1);

        cardsFound = filteredCards.heroes.flatMap(m => m.extension);
        expect(cardsFound.indexOf('ext2')).toBeGreaterThan(-1);
        expect(cardsFound.indexOf('ext1')).toBe(-1);
        expect(cardsFound.length).toBe(3);
    });
});
