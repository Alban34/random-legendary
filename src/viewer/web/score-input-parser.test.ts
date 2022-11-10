import { describe, test, expect } from '@jest/globals';
import { ScoreInputParser } from './score-input-parser';

describe('ScoreInputParser', () => {

    test('should parse from inversify', () => {
        const input = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:score_0': '10',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:player_0': 'player',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:won': 'on'
        };

        const expected = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c': [{ score: 10, player: 'player' }]
        };

        const parser = new ScoreInputParser();
        expect(parser.parseObject(input)).toEqual(expected);
    });

    test('should parse from inversify when game is lost', () => {
        const input = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:score_0': '10',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:player_0': 'player',
        };

        const expected = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c': [{ score: -1, player: 'player' }]
        };

        const parser = new ScoreInputParser();
        const result = parser.parseObject(input);
        expect(result).toEqual(expected);
    });

    test('should parse also the player name from a multiplayer game', () => {
        const input = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:score_0': '20',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:player_0': 'Player 1',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:score_1': '30',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:player_1': 'Player 2',
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c:won': 'on'
        };

        const expected = {
            '98e37f66-4ad9-45f4-9b4c-6d8d6237d09c': [
                {
                    score: 20,
                    player: 'Player 1'
                }, {
                    score: 30,
                    player: 'Player 2'
                }
            ]
        };

        const parser = new ScoreInputParser();
        const result = parser.parseObject(input);
        expect(result).toEqual(expected);
    });

});
