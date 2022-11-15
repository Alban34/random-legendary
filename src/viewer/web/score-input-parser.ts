import { Scores } from '../../game/model/scores';

export class ScoreInputParser {

    public parseObject(input: any): Scores {
        const scores: Scores = {};
        for (const [key, value] of Object.entries(input)) {
            const gameId = key.substring(0, key.indexOf(':'));
            if (!scores[gameId]) {
                scores[gameId] = [];
            }

            const underscoreIndex = key.indexOf('_');
            if (underscoreIndex > -1) {
                const index = key.substring(underscoreIndex + 1);
                let scoreToSet = scores[gameId][index];
                if (!scoreToSet) {
                    scoreToSet = {};
                    scores[gameId][index] = scoreToSet;
                }

                if (key.substring(key.indexOf(':') + 1).startsWith('score')) {
                    scoreToSet['score'] = parseInt(value as string);
                }
                if (key.substring(key.indexOf(':') + 1).startsWith('player')) {
                    scoreToSet['player'] = value;
                }
            }
        }

        this.setLostGames(scores, input);
        this.removeEmptyScores(scores);

        return scores;
    }

    private setLostGames(scores, input) {
        for (const key of Object.keys(scores)) {
            if (!input[`${key}:won`]) {
                scores[key].forEach(score => score.score = -1);
            }
        }
    }

    private removeEmptyScores(scores) {
        const scoresToRemove = [];
        for (const key of Object.keys(scores)) {
            const validScores = scores[key].filter(score => !isNaN(score.score));
            if (validScores.length === 0) {
                scoresToRemove.push(key);
            }
        }
        scoresToRemove.forEach(key => delete scores[key]);
    }

}
