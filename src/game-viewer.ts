export class GameViewer {
    public buildView(playerCount, game): string {
        return `*** Legendary Marvel Randomizer ***
Number of players: ${playerCount}
--
Mastermind: ${this.displayCard(game.mastermind)}
Scheme: ${this.displayCard(game.scheme)}
--
Villains: ${this.getMultipleToDisplay(game.villain)}
Henchmen: ${this.getMultipleToDisplay(game.henchman)}
--
Heroes: ${this.getMultipleToDisplay(game.hero)}
Bystanders: ${game.bystanders}
`;
    }

    private getMultipleToDisplay(group) {
        let display = ``;
        group.forEach(card => {
            display += `\n  -> ${this.displayCard(card)}`;
        });
        return display;
    }

    private displayCard(card) {
        return `${card.name} (${this.displayPlayedCount(card)})`;
    }

    private displayPlayedCount(card) {
        switch (card.count) {
            case 1: return "never played yet";
            case 2: return "played once";
            case 3: return "played twice";
            default: return `played ${card.count} times`
        }
    }
}
