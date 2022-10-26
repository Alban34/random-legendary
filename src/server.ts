import fs from 'fs-extra';
import express from 'express';
import { SetupWebViewer } from './viewer/web/setup-web-viewer';
import { CardLoader } from './card/card-loader';
import { ScoreInputParser } from './viewer/web/score-input-parser';
import { GameDataManager } from './game/game-data-manager';
import { FileDataManager } from './data/file-data-manager';

const setupWebViewer = new SetupWebViewer();
const app = express();

app.disable("x-powered-by");

app.listen(process.env.PORT || 3000, () => {
    console.log('Starting Legendary Marvel randomizer on: http://localhost:3000');
});

app.get('/', (req, res) => writeHTMLResponse(setupWebViewer.showUI(), res));
app.get('/newGame', (req, res) => {
    const playerCount = parseInt(req.url.substring(req.url.lastIndexOf('=') + 1));
    writeHTMLResponse(setupWebViewer.startGame(playerCount), res);
});
app.get('/enterScore', (req, res) => writeHTMLResponse(setupWebViewer.showAvailableGameForScore(), res));
app.get('/showAllCards', (req, res) => writeHTMLResponse(setupWebViewer.showCards(), res));
app.get('/showMyCards', (req, res) => writeHTMLResponse(setupWebViewer.showCards(false), res));
app.get('/showExtensions', (req, res) => writeHTMLResponse(setupWebViewer.showExtensions(), res));

app.post('/saveExtensions', (req, res) => handlePost(req, res, saveExtensions));
app.post('/saveScores', (req, res) => handlePost(req, res, saveScores));

app.get('/styles.css', (req, res) => writeFileResponse('./assets/styles.css', res));
app.get('/bootstrap.css', (req, res) => writeFileResponse('./node_modules/bootstrap/dist/css/bootstrap.min.css', res));
app.get('/bootstrap.min.css.map', (req, res) => writeFileResponse('./node_modules/bootstrap/dist/css/bootstrap.min.css.map', res));
app.get('/bootstrap.js', (req, res) => writeFileResponse('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', res));
app.get('/bootstrap.bundle.min.js.map', (req, res) => writeFileResponse('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', res));

const handlePost = (req, res, callback) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => callback(chunks));
    res.redirect('/');
};

const dataManager = new FileDataManager();
const saveExtensions = (chunks) => {
    const data = Buffer.concat(chunks).toString()
        .replace(/&/g, '')
        .replace(/(%2C)/g, ',')
        .replace(/\+/g, ' ');
    const idsToSave = data.split('ext=')
        .filter(value => value !== '');
    const cardLoader = new CardLoader(dataManager);
    cardLoader.saveExtensions(idsToSave);
};

const saveScores = (chunks) => {
    const data = Buffer.concat(chunks).toString();
    const parser = new ScoreInputParser();
    const scores = parser.parseInput(data);
    const gameDataManager = new GameDataManager(dataManager);
    for (const gameId in scores) {
        gameDataManager.saveScore(gameId, scores[gameId].score);
    }
};

const writeHTMLResponse = (content: string, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`
        <html lang="">
        <head>
            <script src="/bootstrap.js"></script>
            <link rel="stylesheet" href="/bootstrap.css">
            <link rel="stylesheet" href="/styles.css">
            <title>Legendary Marvel randomizer</title>
        </head>
            <body>
                <h1>Legendary Marvel Randomizer<a href="/">(back)</a></h1>
                ${content}
            </body>
        </html>`);
    response.end();
};

const writeFileResponse = (path: string, response) => {
    fs.readFile(path, (err, data) => {
        if (!err) {
            response.setHeader('Content-type', 'text/css');
            response.end(data);
        } else {
            console.log(`file not found: ${path}`);
            response.writeHead(404, 'Not Found');
            response.end();
        }
    });
};
