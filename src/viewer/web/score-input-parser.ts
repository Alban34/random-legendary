import { Score, Scores } from '../../game/model/scores';

export class ScoreInputParser {

    public parseObject(input: Record<string, unknown>): Scores {
        const scores: Scores = {};
        for (const [key, value] of Object.entries(input)) {
            const gameId = key.substring(0, key.indexOf(':'));
            if (!scores[gameId]) {
                scores[gameId] = [];
            }

            const underscoreIndex = key.indexOf('_');
            if (underscoreIndex > -1) {
                const index = Number(key.substring(underscoreIndex + 1));
                let scoreToSet = scores[gameId][index];
                if (!scoreToSet) {
                    scoreToSet = { player: '', score: Number.NaN };
                    scores[gameId][index] = scoreToSet;
                }

                if (key.substring(key.indexOf(':') + 1).startsWith('score')) {
                    scoreToSet.score = parseInt(String(value), 10);
                }
                if (key.substring(key.indexOf(':') + 1).startsWith('player')) {
                    scoreToSet.player = String(value);
                }
            }
        }

        this.setLostGames(scores, input);
        this.removeEmptyScores(scores);

        return scores;
    }

    private setLostGames(scores: Scores, input: Record<string, unknown>): void {
        for (const key of Object.keys(scores)) {
            if (!input[`${key}:won`]) {
                scores[key].forEach((score) => score.score = -1);
            }
        }
    }

    private removeEmptyScores(scores: Scores): void {
        const scoresToRemove: string[] = [];
        for (const key of Object.keys(scores)) {
            const validScores: Score[] = scores[key].filter((score) => !isNaN(score.score));
            if (validScores.length === 0) {
                scoresToRemove.push(key);
            }
        }
        scoresToRemove.forEach((key) => delete scores[key]);
    }

}
