import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';

import './viewer/web/controller/home-controller';
import './viewer/web/controller/card-controller';
import './viewer/web/controller/game-controller';
import './viewer/web/controller/extension-controller';
import './viewer/web/controller/score-controller';
import './viewer/web/controller/static-controller';
import { DataManager } from './data/data-manager.interface';
import { FileDataManager } from './data/file-data-manager';
import TYPES from './types';
import { CardLoader } from './card/card.module';
import { GameDataManager } from './game/game-data-manager';
import { GameManager } from './game/game-manager';

// load everything needed to the Container
const container = new Container();
container.bind<DataManager>(TYPES.DataManager).to(FileDataManager);
container.bind<CardLoader>(TYPES.CardLoader).to(CardLoader);
container.bind<GameDataManager>(TYPES.GameDataManager).to(GameDataManager);
container.bind<GameManager>(TYPES.GameManager).to(GameManager);

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

const serverInstance = server.build();
const port = process.env.PORT || 3000;
serverInstance.listen(port);

console.log(`Starting Legendary Marvel randomizer on: http://localhost:${port}`);
