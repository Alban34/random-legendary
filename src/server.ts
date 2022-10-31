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

// load everything needed to the Container
let container = new Container();
//TODO servicify the components

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let serverInstance = server.build();
const port = process.env.PORT || 3000;
serverInstance.listen(port);

console.log(`Starting Legendary Marvel randomizer on: http://localhost:${port}`);
