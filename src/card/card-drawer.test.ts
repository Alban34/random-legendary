import { describe, expect, test } from '@jest/globals';
import { CardDrawer } from './card-drawer';

describe('car-drawer', () => {

    test('should draw a random card', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1' },
            { 'name': 'card2' },
            { 'name': 'card3' }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList);

        expect(randomCard).toBeDefined();
        expect(randomCard.count).toBe(1);
        expect(cardList.indexOf(randomCard)).not.toBe(-1);
    });

    test('should draw a random card that has been used less than the others', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 1 },
            { 'name': 'card2' },
            { 'name': 'card3', 'count': 1 }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList);

        expect(randomCard).toBeDefined();
        expect(randomCard.name).toBe('card2');
        expect(randomCard.count).toBe(1);
    });

    test('should draw 3 random cards at a time', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1' },
            { 'name': 'card2' },
            { 'name': 'card3' },
            { 'name': 'card4' },
            { 'name': 'card5' },
            { 'name': 'card6' },
        ];

        const randomCards = cardDrawer.drawRandomMultiple(cardList, 3);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(3);
    });

    test('should draw 3 random cards at a time among the less used ones', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1' },
            { 'name': 'card2', 'count': 1 },
            { 'name': 'card3', 'count': 1 },
            { 'name': 'card4' },
            { 'name': 'card5', 'count': 1 },
            { 'name': 'card6' },
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
            { 'name': 'card1' },
            { 'name': 'card2', 'count': 1 },
            { 'name': 'card3', 'count': 1 },
            { 'name': 'card4' },
            { 'name': 'card5', 'count': 1 },
            { 'name': 'card6' },
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 3, ['card3']);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(3);

        const result = [];
        randomCards.forEach(card => result.push(card.name));
        expect(result.indexOf('card3')).not.toBe(-1);
    });

    test('should never pick twice the same card', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1' },
            { 'name': 'card2', 'count': 1 },
            { 'name': 'card3', 'count': 1 }
        ];

        for (let i = 0; i < 100; i++) {
            const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 3, ['card1']);

            expect(randomCards).toBeDefined();
            expect(randomCards.length).toBe(3);
            expect(randomCards[0].name).not.toBe(randomCards[1].name);
        }
    });

    test('should be able to pick a random card with name starting with requested value (e.g. Sentinels of Bastion', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'super card1', 'count': 1 },
            { 'name': 'extra card2', 'count': 1 },
            { 'name': 'extra card3', 'count': 10 },
            { 'name': 'extra card4', 'count': 10 },
            { 'name': 'super card5', 'count': 1 }
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 1, ['tra'], false);

        expect(randomCards).toBeDefined();
        expect(randomCards.length).toBe(1);
        expect(randomCards[0].name).toBe('extra card2');
    });
});
