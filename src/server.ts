import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';

import './viewer/web/controller/home-controller';
import './viewer/web/controller/card-controller';
import './viewer/web/controller/game-controller';
import './viewer/web/controller/extension-controller';
import './viewer/web/controller/score-controller';
import './viewer/web/controller/static-controller';

import { container } from './injectable-config';
import { Migrator } from './migrator';
import TYPES from './types';

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
container.get<Migrator>(TYPES.Migrator).migrateGameIdTo4();

console.log(`Starting Legendary Marvel randomizer on: http://localhost:${port}`);
