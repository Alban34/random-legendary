import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { PlayerConfig } from '../../../game/player-config';
import { GameBuilder } from '../../../game/game-builder';
import { GameWebViewer } from '../game-web-viewer';
import { FileDataManager } from '../../../data/file-data-manager';
import { CardLoader } from '../../../card/card-loader';
import { CardManager } from '../../../card/card-manager';
import { GameDataManager } from '../../../game/game-data-manager';

@controller('/game')
export class GameController extends AbstractController {

    @httpGet('/new/:playerCount')
    public get(request: Request): string {
        const playerCount = parseInt(request['params'].playerCount);
        return this.writeHTMLResponse(this.startGame(playerCount));
    }

    private startGame(playerCount: number): string {
        const dataManager = new FileDataManager();
        const cardLoader = new CardLoader(dataManager);
        const cardManager = new CardManager();
        const dataGameManager = new GameDataManager(dataManager);

        const playerConfig = new PlayerConfig(playerCount);
        const gameBuilder = new GameBuilder();

        const allCardList = cardLoader.loadData();
        const cardList = cardManager.filterAllCards(allCardList, cardLoader.loadExtensions());
        const game = gameBuilder.buildGame(cardList, playerConfig);

        dataGameManager.saveData(allCardList);

        const gameViewer = new GameWebViewer();
        return gameViewer.buildView(playerCount, game);
    }

}
