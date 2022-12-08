export interface PredefinedGame {
    mastermind?: CardIdentifier;
    scheme?: CardIdentifier;
    villains?: CardIdentifier[];
    henchmen?: CardIdentifier[];
    heroes?: CardIdentifier[];
}

export interface CardIdentifier {
    name: string,
    extension: string
}
