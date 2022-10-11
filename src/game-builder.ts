import { CardDrawer } from './card-drawer';
import { Game } from './model/game.interface';
import { MastermindCard } from './model/mastermind.card';

export class GameBuilder {

    private cardDrawer = new CardDrawer();

    public buildGame(legendaryBase, playerConfig): Game {

        let alwaysLeadVillains = [];
        let alwaysLeadHenchmen = [];

        const mastermind = this.cardDrawer.drawRandomUnique(legendaryBase.masterminds) as MastermindCard;
        switch (mastermind.alwaysLeadCategory) {
            case 'villains':
                alwaysLeadVillains.push(mastermind.alwaysLead);
                break;
            case 'henchmen':
                alwaysLeadHenchmen.push(mastermind.alwaysLead);
                break;
            default:
                console.error(`Category ${mastermind.alwaysLeadCategory} is not supported`);
        }

        return {
            mastermind,
            scheme: this.cardDrawer.drawRandomUnique(legendaryBase.schemes),
            villains: this.cardDrawer.drawRandomMultipleForce(legendaryBase.villains, playerConfig.villainsCount, alwaysLeadVillains),
            henchmen: this.cardDrawer.drawRandomMultipleForce(legendaryBase.henchmen, playerConfig.henchmenCount, alwaysLeadHenchmen),
            heroes: this.cardDrawer.drawRandomMultiple(legendaryBase.heroes, playerConfig.heroesCount),
            bystanders: playerConfig.bystandersCount
        };
    }
}
