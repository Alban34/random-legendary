import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { PlayerConfig } from '../../../game/player-config';
import { GameBuilder } from '../../../game/game-builder';
import { GameWebViewer } from '../game-web-viewer';
import { CardLoader } from '../../../card/card-loader';
import { CardManager } from '../../../card/card-manager';
import { GameDataManager } from '../../../game/game-data-manager';
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
        const gameMode = parseInt(request['params'].playerCount);
        return this.writeHTMLResponse(this.startGame(gameMode));
    }

    private startGame(gameMode: number): string {
        const cardManager = new CardManager();

        const playerConfig = new PlayerConfig(gameMode);
        const gameBuilder = new GameBuilder();

        const allCardList = this.cardLoader.loadData();
        const cardList = cardManager.filterAllCards(allCardList, this.cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

        this.dataGameManager.saveData(allCardList);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerConfig.playerCount, game);
    }

}
