import { CardIdentifier, PredefinedGame } from './model/predefined-game';

interface ParsedCard {
    type: string;
    cardData: CardIdentifier;
}

export class GameCustomParser {

    public parse(toParse): PredefinedGame {
        const game = {};
        Object.keys(toParse).forEach(key => {
            const cardData = this.parseString(key);
            const card = cardData.cardData;
            switch (cardData.type) {
                case 'Masterminds':
                    game['mastermind'] = card;
                    break;
                case 'Schemes':
                    game['scheme'] = card;
                    break;
                case 'Villains':
                    this.getArray(game, 'villains').push(card);
                    break;
                case 'Henchmen':
                    this.getArray(game, 'henchmen').push(card);
                    break;
                case 'Heroes':
                    this.getArray(game, 'heroes').push(card);
                    break;
            }
        });

        return game;
    }

    private parseString(str: string): ParsedCard {
        const split = str.split('|');
        return {
            type: split[0],
            cardData: {
                name: split[1],
                extension: split[2]
            }
        };
    }

    private getArray(game, category) {
        if (!game[category]) {
            game[category] = [];
        }
        return game[category];
    }
}
