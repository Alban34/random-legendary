import { describe, expect, test } from '@jest/globals';
import { CardDrawer } from './card-drawer';

describe('car-drawer', () => {

    test('should draw a random card', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 0 },
            { 'name': 'card2', 'count': 0 },
            { 'name': 'card3', 'count': 0 }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList, 'test');

        expect(randomCard).toBeDefined();
        expect(randomCard['test']).toBeDefined();
        expect(randomCard['test'].count).toBe(1);
        expect(cardList.indexOf(randomCard['test'])).not.toBe(-1);
    });

    test('should draw a random card that has been used less than the others', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 1 },
            { 'name': 'card2', 'count': 0 },
            { 'name': 'card3', 'count': 1 }
        ];

        const randomCard = cardDrawer.drawRandomUnique(cardList, 'test');

        expect(randomCard).toBeDefined();
        expect(randomCard['test']).toBeDefined();
        expect(randomCard['test'].name).toBe('card2');
        expect(randomCard['test'].count).toBe(1);
    });

    test('should draw 3 random cards at a time', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 0 },
            { 'name': 'card2', 'count': 0 },
            { 'name': 'card3', 'count': 0 },
            { 'name': 'card4', 'count': 0 },
            { 'name': 'card5', 'count': 0 },
            { 'name': 'card6', 'count': 0 },
        ];

        const randomCards = cardDrawer.drawRandomMultiple(cardList, 'test', 3);

        expect(randomCards).toBeDefined();
        expect(randomCards['test']).toBeDefined();
        expect(randomCards['test'].length).toBe(3);
    });

    test('should draw 3 random cards at a time among the less used ones', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 0 },
            { 'name': 'card2', 'count': 1 },
            { 'name': 'card3', 'count': 1 },
            { 'name': 'card4', 'count': 0 },
            { 'name': 'card5', 'count': 1 },
            { 'name': 'card6', 'count': 0 },
        ];

        const randomCards = cardDrawer.drawRandomMultiple(cardList, 'test', 3);

        expect(randomCards).toBeDefined();
        expect(randomCards['test']).toBeDefined();
        expect(randomCards['test'].length).toBe(3);

        const result = [];
        randomCards['test'].forEach(card => result.push(card.name));
        result.sort();
        expect(JSON.stringify(result)).toBe(JSON.stringify(['card1', 'card4', 'card6']));
    });

    test('should draw 2 random cards at a time among the less used ones and automatically select another one', () => {
        const cardDrawer = new CardDrawer();

        const cardList = [
            { 'name': 'card1', 'count': 0 },
            { 'name': 'card2', 'count': 1 },
            { 'name': 'card3', 'count': 1 },
            { 'name': 'card4', 'count': 0 },
            { 'name': 'card5', 'count': 1 },
            { 'name': 'card6', 'count': 0 },
        ];

        const randomCards = cardDrawer.drawRandomMultipleForce(cardList, 'test', 3, ['card3']);

        expect(randomCards).toBeDefined();
        expect(randomCards['test']).toBeDefined();
        expect(randomCards['test'].length).toBe(3);

        const result = [];
        randomCards['test'].forEach(card => result.push(card.name));
        expect(result.indexOf('card3')).not.toBe(-1);
    });

});
