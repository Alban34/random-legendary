import { Card } from '../card/model/card';

export class StatsService {

    public computeStats(cards: Card[]): number {
        const totalCards = cards.length;
        const playedCards = cards.filter(c => c.count && c.count > 0).length;
        const result = (playedCards * 100) / totalCards;
        return Math.round((result + Number.EPSILON) * 100) / 100
    }
}
