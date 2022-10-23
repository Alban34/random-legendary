import { Game } from '../../game/model/game';

export class GameWebViewer {
    public buildView(playerCount, game: Game): string {

        return `
            <h1>Legendary Marvel Randomizer</h1>
            <div class="new-game">
                <div class="card">
                    <div class="card-header bg-info">
                        Game setup
                    </div>
                    <div class="card-body">
                        <p>Number of players: ${playerCount}</p>
                        <p>Game ID: ${game.gameId}</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-danger">
                        Scenario setup
                    </div>
                    <div class="card-body">
                        <p>Mastermind: ${this.displayCard(game.mastermind)}</p>
                        <p>Scheme: ${this.displayCard(game.scheme)}</p>
                        <p>Bystanders: ${game.bystanders}</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-warning">
                        Adversaries setup
                    </div>
                    <div class="card-body">
                        <p>Villains: ${this.getMultipleToDisplay(game.villains)}</p>
                        <p>Henchmen: ${this.getMultipleToDisplay(game.henchmen)}</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-success">
                        Heroes setup
                    </div>
                    <div class="card-body">
                        <p>Heroes: ${this.getMultipleToDisplay(game.heroes)}</p>
                    </div>
                </div>
            </div>
        `;
    }

    private getMultipleToDisplay(group) {
        let display = `<ul>`;
        group.forEach(card => {
            display += `<li>${this.displayCard(card)}</li>`;
        });
        display += `</ul>`;
        return display;
    }

    private displayCard(card) {
        return `${card.name} (${this.displayPlayedCount(card)})`;
    }

    private displayPlayedCount(card) {
        switch (card.count) {
            case 1:
                return 'never played yet';
            case 2:
                return 'played once';
            case 3:
                return 'played twice';
            default:
                return `played ${card.count} times`;
        }
    }
}
