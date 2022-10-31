import { Score, Scores } from '../../game/model/scores';

interface ParsedScore extends Score {
    won: boolean;
}

export interface ParsedScores {
    [key: string]: ParsedScore;
}

export class ScoreInputParser {

    public parseObject(input: any): Scores {
        const scores: Scores = {};

        for (const [key, value] of Object.entries(input)) {
            const gameId = key.substring(0, key.indexOf(':'));
            if (!scores[gameId]) {
                scores[gameId] = {} as Score;
            }
            if (key.substring(key.indexOf(':') + 1) === 'score') {
                scores[gameId].score = parseInt(value.toString());
            }
        }

        for (const key of Object.keys(scores)) {
            if (!input[`${key}:won`]) {
                scores[key].score = -1;
            }
        }

        return scores;
    }

    public parseInput(input: string): Scores {
        let games: ParsedScores = {};
        input
            .replace(/(%3Ascore)/g, '')
            .replace(/(%3Awon)/g, '')
            .split('&')
            .forEach(value => {
                const indexToSymbol = value.indexOf('=');
                const id = value.substring(0, indexToSymbol);
                const valueFromId = value.substring(indexToSymbol + 1);

                let game = games[id];
                if (!game) {
                    game = { score: 0, won: false };
                    games[id] = game;
                }
                if (!isNaN(parseInt(valueFromId))) {
                    game.score = parseInt(valueFromId);
                } else if (valueFromId === 'on') {
                    game.won = true;
                }
            });

        for (const gameId in games) {
            if (!games[gameId].won) {
                games[gameId].score = -1;
            }
            delete games[gameId].won;
        }

        return games;
    }
}
