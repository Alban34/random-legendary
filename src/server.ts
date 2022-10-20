import http from 'http';
import fs from 'fs-extra';
import { SetupWebViewer } from './viewer/web/setup-web-viewer';

http.createServer((request, response) => {
    const setupWebViewer = new SetupWebViewer();
    switch (request.url) {
        case '/':
            setHTMLResponse(setupWebViewer.showUI(), response);
            break;
        case '/showExtensions':
            setHTMLResponse(setupWebViewer.showExtensions(), response);
            break;
        case '/styles.css':
            setFileResponse('./assets/styles.css', response);
            break;
        default:
            response.writeHead(404);
            response.end();
    }
}).listen(9615);

const setHTMLResponse = (content: string, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`
        <html lang="">
        <head>
            <link rel="stylesheet" href="/styles.css">
            <title>Legendary Marvel randomizer</title>
        </head>
            <body>${content}</body>
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
