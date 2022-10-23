import { describe, test, expect } from '@jest/globals';
import { ScoreInputParser } from './score-input-parser';

describe('ScoreInputParser', () => {
    test('should be able to parse data', () => {
        const input = "dffe0acc-363f-4686-aa5f-4dcad0a80cbb%3Ascore=12&dffe0acc-363f-4686-aa5f-4dcad0a80cbb%3Awon=on&98d201b9-f525-44ee-bb1e-87742196048a%3Ascore=32&98d201b9-f525-44ee-bb1e-87742196048a%3Awon=on"

        const expected = {
            "dffe0acc-363f-4686-aa5f-4dcad0a80cbb": { score: 12 },
            "98d201b9-f525-44ee-bb1e-87742196048a": { score: 32 }
        }

        const parser = new ScoreInputParser();
        expect(parser.parseInput(input)).toEqual(expected);
    });

    test('should be able to find lost games', () => {
        const input = 'dffe0acc-363f-4686-aa5f-4dcad0a80cbb%3Ascore=10&98d201b9-f525-44ee-bb1e-87742196048a%3Ascore=20&98d201b9-f525-44ee-bb1e-87742196048a%3Awon=on';

        const expected = {
            "dffe0acc-363f-4686-aa5f-4dcad0a80cbb": { score: -1 },
            "98d201b9-f525-44ee-bb1e-87742196048a": { score: 20 }
        }

        const parser = new ScoreInputParser();
        expect(parser.parseInput(input)).toEqual(expected);
    });
});
