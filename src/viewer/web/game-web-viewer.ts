import { Game } from '../../game/model/game';
import { Card } from '../../card/model/card';

export class GameWebViewer {
    public buildView(playerCount: number, game: Game): string {

        return `
            <section class="page-stack game-layout">
                <section class="hero-panel">
                    <span class="eyebrow">Scenario deployed</span>
                    <div class="page-section__header">
                        <div>
                            <h2 class="page-section__title">Game setup</h2>
                            <p class="page-section__subtitle">A premium overview of your next Legendary Marvel showdown.</p>
                        </div>
                    </div>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <span class="summary-item__label">Number of players</span>
                            <span class="summary-item__value">${playerCount}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item__label">Game ID</span>
                            <span class="summary-item__value">${game.gameId}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item__label">Bystanders</span>
                            <span class="summary-item__value">${game.bystanders}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item__label">Master strikes</span>
                            <span class="summary-item__value">${game.masterStrike}</span>
                        </div>
                    </div>
                </section>
                <div class="card">
                    <div class="card-header bg-danger text-white">
                        Scenario setup
                    </div>
                    <div class="card-body scenario-meta">
                        <div class="scenario-meta__item">
                            <strong>Mastermind</strong>
                            <div class="mt-2 row align-items-start">
                                ${this.displayCard(game.mastermind)}
                            </div>
                        </div>
                        <div class="scenario-meta__item">
                            <strong>Scheme</strong>
                            <div class="mt-2 row align-items-start">
                                ${this.displayCard(game.scheme)}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-warning text-dark">
                        Adversaries setup
                    </div>
                    <div class="card-body">
                        <div class="game-meta-list">
                            <div class="game-meta-item">
                                <strong>Villains</strong>
                                ${this.getMultipleToDisplay(game.villains)}
                            </div>
                            <div class="game-meta-item">
                                <strong>Henchmen</strong>
                                ${this.getMultipleToDisplay(game.henchmen, game.henchmenCardsCount)}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-success text-white">
                        Heroes setup
                    </div>
                    <div class="card-body">
                        <div class="game-meta-item">
                            <strong>Heroes</strong>
                            ${this.getMultipleToDisplay(game.heroes)}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    private getMultipleToDisplay(group: Card[], limit?: number): string {
        let limitSentence = '';
        if (limit && limit < 10) {
            limitSentence = `(only ${limit} cards of them)`;
        }
        let display = `<ul>`;
        group.forEach((card) => {
            display += `<li class="row">${this.displayCard(card)}${limitSentence}</li>`;
        });
        display += `</ul>`;
        return display;
    }

    private displayCard(card: Card): string {
        let teams = '';
        if (card.teams) {
            teams += card.teams.flatMap((t) => `${t}`);
        }
        let displayableCard = `<span class="col-5 card-name">${card.name}</span>`;
        if (teams) {
            displayableCard += `<span class="col-4 card-team">${teams}</span>`
        }
        displayableCard += `<span class="col-3 card-played-count">(${this.displayPlayedCount(card)})</span>`;
        return displayableCard;
    }

    private displayPlayedCount(card: Card): string {
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
