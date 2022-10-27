import { Game } from '../../game/model/game';

export class GameWebViewer {
    public buildView(playerCount, game: Game): string {

        return `
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
                        <div class="row">
                            <span class="col-4">Mastermind:</span>
                            ${this.displayCard(game.mastermind)}
                        </div>
                        <div class="row">
                            <span class="col-4">Scheme:</span>
                            ${this.displayCard(game.scheme)}
                        </div>
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
            display += `<li class="row">${this.displayCard(card)}</li>`;
        });
        display += `</ul>`;
        return display;
    }

    private displayCard(card) {
        let teams = '';
        if (card.teams) {
            teams += card.teams.flatMap(t => `${t}`);
        }
        let displayableCard = `<span class="col-5 card-name">${card.name}</span>`;
        if (teams) {
            displayableCard += `<span class="col-4 card-team">${teams}</span>`
        }
        displayableCard += `<span class="col-3 card-played-count">(${this.displayPlayedCount(card)})</span>`;
        return displayableCard;
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
