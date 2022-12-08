import { describe, expect, test } from '@jest/globals';
import { Game } from './model/game';
import { GameCustomParser } from './game-custom.parser';

describe('GameCustomParser', function () {
    test('should be able to identify the cards', () => {
        const toParse = {
            'Henchmen|Hand Ninjas|Core Set': 'on',
            'Masterminds|HYDRA High Council|S.H.I.E.L.D.': 'on',
            'Schemes|S.H.I.E.L.D. Vs. HYDRA War|S.H.I.E.L.D.': 'on',
            'Villains|A.I.M., HYDRA Offshoot|S.H.I.E.L.D.': 'on',
            'Villains|HYDRA Elite|S.H.I.E.L.D.': 'on',
            'Heroes|Deathlok|S.H.I.E.L.D.': 'on'
        };

        const result = {
            mastermind: { name: 'HYDRA High Council', extension: 'S.H.I.E.L.D.' },
            scheme: { name: 'S.H.I.E.L.D. Vs. HYDRA War', extension: 'S.H.I.E.L.D.' },
            villains: [
                { name: 'A.I.M., HYDRA Offshoot', extension: 'S.H.I.E.L.D.' },
                { name: 'HYDRA Elite', extension: 'S.H.I.E.L.D.' },
            ],
            henchmen: [
                { name: 'Hand Ninjas', extension: 'Core Set' }
            ],
            heroes: [
                { name: 'Deathlok', extension: 'S.H.I.E.L.D.' },
            ]
        };

        const gameCustomParser = new GameCustomParser();
        expect(gameCustomParser.parse(toParse)).toEqual(result);
    });
});
