import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { PlayerConfig } from '../../../game/player-config';
import { GameBuilder } from '../../../game/game-builder';
import { GameWebViewer } from '../game-web-viewer';
import { FileDataManager } from '../../../data/file-data-manager';
import { CardLoader } from '../../../card/card-loader';
import { CardManager } from '../../../card/card-manager';
import { GameDataManager } from '../../../game/game-data-manager';
import { inject } from 'inversify';
import TYPES from '../../../types';

@controller('/game')
export class GameController extends AbstractController {

    constructor(
        @inject(TYPES.CardLoader) private readonly cardLoader: CardLoader,
        @inject(TYPES.GameDataManager) private readonly dataGameManager: GameDataManager
    ) {
        super();
    }

    @httpGet('/new/:playerCount')
    public get(request: Request): string {
        const playerCount = parseInt(request['params'].playerCount);
        return this.writeHTMLResponse(this.startGame(playerCount));
    }

    private startGame(playerCount: number): string {
        const cardManager = new CardManager();

        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();

        const allCardList = this.cardLoader.loadData();
        const cardList = cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

        this.dataGameManager.saveData(allCardList);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerCount, game);
    }

}
