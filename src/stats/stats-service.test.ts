import { describe, test, expect } from '@jest/globals';
import { StatsService } from './stats-service';
import { Card } from '../card/model/card';

describe('stats service', () => {
    test('should load general stats disregarding any extension', () => {
        const cardList = {
            masterminds: [
                { name: 'm1', count: 0 },
                { name: 'm2', count: 1 },
                { name: 'm3', count: 0 },
                { name: 'm4', count: 0 }
            ],
            villains: [
                { name: 'v1', count: 10 },
                { name: 'v2', count: 0 }
            ],
            schemes: [
                { name: 's1', count: 0 },
                { name: 's2', count: 0 },
                { name: 's3', count: 1 },
                { name: 's4', count: 0 },
                { name: 's5', count: 0 }
            ],
            henchmen: [
                { name: 'hm1', count: 10 },
                { name: 'hm2', count: 0 }
            ],
            heroes: [
                { name: 'h1', count: 1 },
                { name: 'h2', count: 1 },
                { name: 'h3', count: 0 }
            ]
        };

        const statsService = new StatsService();

        expect(statsService.computeStats(cardList.masterminds as Card[])).toBe(25);
        expect(statsService.computeStats(cardList.schemes as Card[])).toBe(20);
        expect(statsService.computeStats(cardList.villains as Card[])).toBe(50);
        expect(statsService.computeStats(cardList.henchmen as Card[])).toBe(50);
        expect(statsService.computeStats(cardList.heroes as Card[])).toBe(66.67);

    });
});
