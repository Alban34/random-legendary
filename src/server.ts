import fs from 'fs-extra';
import { SetupWebViewer } from './viewer/web/setup-web-viewer';
import { CardLoader } from './card/card-loader';
import { ScoreInputParser } from './viewer/web/score-input-parser';
import { GameDataManager } from './game/game-data-manager';
import express from 'express';

const setupWebViewer = new SetupWebViewer();
const app = express();

app.listen(3000, () => {
    console.log('Starting Legendary Marvel randomizer on: http://localhost:3000');
});

app.get('/', (req, res) => {
    setHTMLResponse(setupWebViewer.showUI(), res);
});

app.get('/styles.css', (req, res) => {
    setFileResponse('./assets/styles.css', res);
});

app.get('/bootstrap.css', (req, res) => {
    setFileResponse('./node_modules/bootstrap/dist/css/bootstrap.min.css', res);
});

app.get('/bootstrap.min.css.map', (req, res) => {
    setFileResponse('./node_modules/bootstrap/dist/css/bootstrap.min.css.map', res);
});

app.get('/bootstrap.js', (req, res) => {
    setFileResponse('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', res);
});

app.get('/bootstrap.bundle.min.js.map', (req, res) => {
    setFileResponse('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', res);
});

app.get('/newGame', (req, res) => {
    const playerCount = parseInt(req.url.substring(req.url.lastIndexOf('=') + 1));
    setHTMLResponse(setupWebViewer.startGame(playerCount), res);
});

app.get('/enterScore', (req, res) => {
    setHTMLResponse(setupWebViewer.showAvailableGameForScore(), res);
});

app.get('/showAllCards', (req, res) => {
    setHTMLResponse(setupWebViewer.showCards(), res);
});

app.get('/showMyCards', (req, res) => {
    setHTMLResponse(setupWebViewer.showCards(false), res);
});

app.get('/showExtensions', (req, res) => {
    setHTMLResponse(setupWebViewer.showExtensions(), res);
});

let chunks = [];
app.post('/saveExtensions', (req, res) => {
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const data = Buffer.concat(chunks).toString()
            .replace(/&/g, '')
            .replace(/(%2C)/g, ',')
            .replace(/\+/g, ' ');
        const idsToSave = data.split('ext=')
            .filter(value => value !== '');
        const cardLoader = new CardLoader();
        cardLoader.saveExtensions(idsToSave);
    });
    res.redirect('/');
});

app.post('/saveScores', (req, res) => {
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const data = Buffer.concat(chunks).toString();
        const parser = new ScoreInputParser();
        const scores = parser.parseInput(data);
        const gameDataManager = new GameDataManager();
        for (const gameId in scores) {
            gameDataManager.saveScore(gameId, scores[gameId].score);
        }
    });
    res.redirect('/');
});


const setHTMLResponse = (content: string, response) => {
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

const setFileResponse = (path: string, response) => {
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
