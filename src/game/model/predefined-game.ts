export interface PredefinedGame {
    mastermind?: CardIdentifier;
    scheme?: CardIdentifier;
}

export interface CardIdentifier {
    name: string,
    extension: string
}
