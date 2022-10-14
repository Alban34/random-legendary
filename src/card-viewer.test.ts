import { describe, expect, test } from '@jest/globals';
import { CardViewer } from './card-viewer';

describe('CardViewer', () => {

    const cardList = {
        masterminds: [
            { name: 'm1' },
            { name: 'm2' },
            { name: 'm3' }
        ],
        schemes: [
            { name: 's1' },
            { name: 's2' },
            { name: 's3' }
        ],
        villains: [
            { name: 'v1' },
            { name: 'v2' }
        ],
        henchmen: [
            { name: 'hm1' },
            { name: 'hm2' }
        ],
        heroes: [
            { name: 'h1' },
            { name: 'h2' },
            { name: 'h3' },
            { name: 'h4' }
        ]
    };

    test('should show all available cards', () => {
        const cardViewer = new CardViewer();
        const toDisplay: string = cardViewer.getDisplayableCards(cardList);

        expect(toDisplay).toBe(`Masterminds:\n|- m1\n|- m2\n|- m3\n\nSchemes:\n|- s1\n|- s2\n|- s3\n\nVillains:\n|- v1\n|- v2\n\nHenchmen:\n|- hm1\n|- hm2\n\nHeroes:\n|- h1\n|- h2\n|- h3\n|- h4`);
    });

});
