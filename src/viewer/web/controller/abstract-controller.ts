import { injectable } from 'inversify';
import { version } from '../../../../package.json';
import { GAME_MODE } from '../../../game/player-config';

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
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Legendary Marvel Randomizer</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Start new game
                                        </a>
                                        <ul class="dropdown-menu" style="">
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.SOLO}">Solo</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.ADVANCED_SOLO}">Advanced Solo</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.TWO_PLAYERS}">2 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.THREE_PLAYERS}">3 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FOUR_PLAYERS}">4 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FIVE_PLAYERS}">5 players</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Games
                                        </a>
                                        <ul class="dropdown-menu" style="">
                                            <li><a class="dropdown-item" href="/scores">Enter a score</a></li>
                                            <li><a class="dropdown-item" href="/game/history">Show my history</a></li>
                                            <li><a class="dropdown-item" href="/extensions">Select my extensions</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Cards
                                        </a>
                                        <ul class="dropdown-menu" style="">
                                            <li><a class="dropdown-item" href="/cards/all">Show all available</a></li>
                                            <li><a class="dropdown-item" href="/cards/all/group">Show all available by extensions</a></li>
                                            <li><a class="dropdown-item" href="/cards/mine">Show my cards</a></li>
                                            <li><a class="dropdown-item" href="/cards/mine/group">Show my cards by extensions</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex">
                        <small class="version">Version: ${version}</small>
                    </div>
                </nav>
                <div class="content">
                    ${content}
                </div>
                </body>
            </html>`;
    }
}
