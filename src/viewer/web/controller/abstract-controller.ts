import { injectable } from 'inversify';
import { version } from '../../../../package.json';

@injectable()
export abstract class AbstractController {

    protected writeHTMLResponse(content: string) {
        return `
            <html lang="">
            <head>
                <script src="/static/bootstrap.js"></script>
                <link rel="stylesheet" href="/static/bootstrap.css">
                <link rel="stylesheet" href="/static/styles.css">
                <title>Legendary Marvel randomizer ${version}</title>
            </head>
                <body>
                    <h1>Legendary Marvel Randomizer<a href="/">(back)</a></h1>
                    <small>Version ${version}</small><br><br>
                    ${content}
                </body>
            </html>`;
    }
}
