import { injectable } from 'inversify';
import { BaseHttpController } from 'inversify-express-utils';

@injectable()
export abstract class AbstractController {

    protected writeHTMLResponse(content: string) {
        return `
            <html lang="">
            <head>
                <script src="/static/bootstrap.js"></script>
                <link rel="stylesheet" href="/static/bootstrap.css">
                <link rel="stylesheet" href="/static/styles.css">
                <title>Legendary Marvel randomizer</title>
            </head>
                <body>
                    <h1>Legendary Marvel Randomizer<a href="/">(back)</a></h1>
                    ${content}
                </body>
            </html>`;
    }
}
