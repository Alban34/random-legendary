export interface Score {
    player: string;
    score: number;
}

export interface Scores {
    [key: string]: Score[];
}
