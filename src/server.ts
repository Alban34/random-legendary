import http from 'http';
import { SetupWebViewer } from './viewer/web/setup-web-viewer';

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const setupWebViewer = new SetupWebViewer();
    response.write(setupWebViewer.showUI());
    response.end();
}).listen(9615);
