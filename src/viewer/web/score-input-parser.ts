import { Score, Scores } from '../../game/model/scores';

export class ScoreInputParser {

    public parseObject(input: Record<string, unknown>): Scores {
        const scores: Scores = {};
        for (const [key, value] of Object.entries(input)) {
            const fieldDetails = this.getFieldDetails(key);
            if (!fieldDetails) {
                continue;
            }

            const scoreToSet = this.getOrCreateScore(scores, fieldDetails.gameId, fieldDetails.index);
            this.applyFieldValue(scoreToSet, fieldDetails.fieldType, value);
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
            const validScores: Score[] = scores[key].filter((score) => !Number.isNaN(score.score));
            if (validScores.length === 0) {
                scoresToRemove.push(key);
            }
        }
        scoresToRemove.forEach((key) => delete scores[key]);
    }

    private getFieldDetails(key: string): { gameId: string; fieldType: 'score' | 'player'; index: number } | undefined {
        const underscoreIndex = key.indexOf('_');
        if (underscoreIndex === -1) {
            return undefined;
        }

        const gameId = key.substring(0, key.indexOf(':'));
        const fieldType = key.substring(key.indexOf(':') + 1).startsWith('score') ? 'score' : 'player';
        const index = Number(key.substring(underscoreIndex + 1));
        return { gameId, fieldType, index };
    }

    private getOrCreateScore(scores: Scores, gameId: string, index: number): Score {
        scores[gameId] ??= [];
        scores[gameId][index] ??= { player: '', score: Number.NaN };
        return scores[gameId][index];
    }

    private applyFieldValue(scoreToSet: Score, fieldType: 'score' | 'player', value: unknown): void {
        if (fieldType === 'score') {
            const parsedScore = this.toNumber(value);
            if (!Number.isNaN(parsedScore)) {
                scoreToSet.score = parsedScore;
            }
            return;
        }

        const playerName = this.toText(value);
        if (playerName !== undefined) {
            scoreToSet.player = playerName;
        }
    }

    private toNumber(value: unknown): number {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            return Number.parseInt(value, 10);
        }
        return Number.NaN;
    }

    private toText(value: unknown): string | undefined {
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return `${value}`;
        }
        return undefined;
    }

}
