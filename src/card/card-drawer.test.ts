import { describe, expect, test } from '@jest/globals';
import { CardDrawer } from './card-drawer';

describe('card-drawer', () => {

    test('should draw a random card', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'extension': 'ext1' },
            { 'name': 'card2', 'extension': 'ext1' },
            { 'name': 'card3', 'extension': 'ext1' }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList);

        expect(randomCard).toBeDefined();
        expect(randomCard.count).toBe(1);
        expect(cardList.indexOf(randomCard)).not.toBe(-1);
    });

    test('should draw a random card that has been used less than the others', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card2', 'extension': 'ext1' },
            { 'name': 'card3', 'count': 1, 'extension': 'ext1' }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList);

        expect(randomCard).toBeDefined();
        expect(randomCard.name).toBe('card2');
        expect(randomCard.count).toBe(1);
    });

    test('should draw 3 random cards at a time', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'extension': 'ext1' },
            { 'name': 'card2', 'extension': 'ext1' },
            { 'name': 'card3', 'extension': 'ext1' },
            { 'name': 'card4', 'extension': 'ext1' },
            { 'name': 'card5', 'extension': 'ext1' },
            { 'name': 'card6', 'extension': 'ext1' },
        ];

        const randomCards = cardDrawer.drawRandomMultiple(cardList, 3);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(3);
    });

    test('should draw 3 random cards at a time among the less used ones', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'extension': 'ext1' },
            { 'name': 'card2', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card3', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card4', 'extension': 'ext1' },
            { 'name': 'card5', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card6', 'extension': 'ext1' },
        ];

        const randomCards = cardDrawer.drawRandomMultiple(cardList, 3);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(3);

        const result = [];
        randomCards.forEach(card => result.push(card.name));
        result.sort();
        expect(JSON.stringify(result)).toBe(JSON.stringify(['card1', 'card4', 'card6']));
    });

    test('should draw 2 random cards at a time among the less used ones and automatically select another one', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'extension': 'ext1' },
            { 'name': 'card2', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card3', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card4', 'extension': 'ext1' },
            { 'name': 'card5', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card6', 'extension': 'ext1' },
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 3, [{ name: 'card3', extension: 'ext1' }]);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(3);

        const result = [];
        randomCards.forEach(card => result.push(card.name));
        expect(result.indexOf('card3')).not.toBe(-1);
    });

    test('should never pick twice the same card', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'extension': 'ext1' },
            { 'name': 'card2', 'count': 1, 'extension': 'ext1' },
            { 'name': 'card3', 'count': 1, 'extension': 'ext1' }
        ];

        for (let i = 0; i < 100; i++) {
            const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 3, [{ name: 'card1', extension: 'ext1' }]);

            expect(randomCards).toBeDefined();
            expect(randomCards.length).toBe(3);
            expect(randomCards[0].name).not.toBe(randomCards[1].name);
        }
    });

    test('should be able to pick a random card with name starting with requested value (e.g. Sentinels of Bastion', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'super card1', 'count': 1, 'extension': 'ext1' },
            { 'name': 'extra card2', 'count': 1, 'extension': 'ext1' },
            { 'name': 'extra card3', 'count': 10, 'extension': 'ext1' },
            { 'name': 'extra card4', 'count': 10, 'extension': 'ext1' },
            { 'name': 'super card5', 'count': 1, 'extension': 'ext1' }
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 1, [{
            name: 'tra',
            extension: 'ext1'
        }], false);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(1);
        expect(randomCards[0].name).toBe('extra card2');
    });

    test('should be able to find a random card based on its name and extension', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'super card1', 'count': 1, 'extension': 'ext1' },
            { 'name': 'super card1', 'count': 10, 'extension': 'ext2' },
            { 'name': 'super card1', 'count': 10, 'extension': 'ext3' },
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 1, [{
            name: 'super card1',
            extension: 'ext3'
        }]);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(1);
        expect(randomCards[0].name).toBe('super card1');
        expect(randomCards[0].extension).toBe('ext3');
        expect(randomCards[0].count).toBe(11);
    });

    test('should be able to find a random card based on its name and extension', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'super card1', 'count': 1, 'extension': 'ext1' },
            { 'name': 'super card2', 'count': 10, 'extension': 'ext2' },
            { 'name': 'super card3', 'count': 10, 'extension': 'ext3' },
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 1, ['super card1']);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(1);
        expect(randomCards[0].name).toBe('super card1');
    });

});
