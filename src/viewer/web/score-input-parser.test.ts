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

    test('should not extract empty data', () => {

        const input = {
            '73f36a8e-1a91-40ae-a4f7-acb815649040:score_0': '10',
            '73f36a8e-1a91-40ae-a4f7-acb815649040:player_0': 'Player 1',
            '73f36a8e-1a91-40ae-a4f7-acb815649040:won': 'on',
            'a94d4a4f-202b-45a2-b360-268833021d06:score_0': '',
            'a94d4a4f-202b-45a2-b360-268833021d06:player_0': 'Player 1',
            'a94d4a4f-202b-45a2-b360-268833021d06:won': 'on',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:score_0': '',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:player_0': 'Player 1',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:won': 'on'
        };

        const expected = {
            '73f36a8e-1a91-40ae-a4f7-acb815649040': [
                {
                    score: 10,
                    player: 'Player 1'
                }
            ]
        };

        const parser = new ScoreInputParser();
        const result = parser.parseObject(input);
        expect(result).toEqual(expected);
    });

    test('should extract game lost from empty data', () => {

        const input = {
            '73f36a8e-1a91-40ae-a4f7-acb815649040:score_0': '',
            '73f36a8e-1a91-40ae-a4f7-acb815649040:player_0': 'Player 1',
            'a94d4a4f-202b-45a2-b360-268833021d06:score_0': '',
            'a94d4a4f-202b-45a2-b360-268833021d06:player_0': 'Player 1',
            'a94d4a4f-202b-45a2-b360-268833021d06:won': 'on',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:score_0': '',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:player_0': 'Player 1',
            'a8f550db-e7ab-437d-845e-cf436ed53ccc:won': 'on'
        };

        const expected = {
            '73f36a8e-1a91-40ae-a4f7-acb815649040': [
                {
                    score: -1,
                    player: 'Player 1'
                }
            ]
        };

        const parser = new ScoreInputParser();
        const result = parser.parseObject(input);
        expect(result).toEqual(expected);
    });


});
