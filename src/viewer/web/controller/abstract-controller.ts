import { injectable } from 'inversify';
import { version } from '../../../../package.json';
import { GAME_MODE } from '../../../game/player-config';

@injectable()
export abstract class AbstractController {

    protected writeHTMLResponse(content: string) {
        return `
            <html lang="" data-bs-theme="dark">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="/static/bootstrap.js"></script>
                <link rel="stylesheet" href="/static/bootstrap.css">
                <link rel="stylesheet" href="/static/styles.css">
                <title>Legendary Marvel randomizer ${version}</title>
            </head>

            <body class="app-body">
                <nav class="navbar navbar-expand-lg sticky-top app-navbar">
                    <div class="container-fluid app-navbar__inner">
                        <a class="navbar-brand app-brand" href="/">
                            <span class="app-brand__mark">L</span>
                            <span>
                                <span class="app-brand__title">Legendary Marvel Randomizer</span>
                                <span class="app-brand__subtitle">Version ${version} · cinematic deckbuilder companion</span>
                            </span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav app-nav-list">
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Start new game
                                        </a>
                                        <ul class="dropdown-menu app-dropdown-menu" style="">
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.SOLO}">Solo</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.ADVANCED_SOLO}">Advanced Solo</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.TWO_HANDED_SOLO}">2 Handed Solo</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.THREE_HANDED_SOLO}">3 Handed Solo</a></li>
                                            <hr>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.TWO_PLAYERS}">2 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.THREE_PLAYERS}">3 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FOUR_PLAYERS}">4 players</a></li>
                                            <li><a class="dropdown-item" href="/game/new/${GAME_MODE.FIVE_PLAYERS}">5 players</a></li>
                                            <hr>
                                            <li><a class="dropdown-item" href="/game/custom/new">Custom (make your own choices)</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Games
                                        </a>
                                        <ul class="dropdown-menu app-dropdown-menu" style="">
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
                                        <ul class="dropdown-menu app-dropdown-menu" style="">
                                            <li><a class="dropdown-item" href="/cards/all">Show all available</a></li>
                                            <li><a class="dropdown-item" href="/cards/all/group">Show all available by extensions</a></li>
                                            <li><a class="dropdown-item" href="/cards/mine">Show my cards</a></li>
                                            <li><a class="dropdown-item" href="/cards/mine/group">Show my cards by extensions</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="app-navbar__badge">
                            <small class="version">v${version}</small>
                        </div>
                    </div>
                </nav>
                <main class="app-shell">
                    <section class="app-hero">
                        <div class="app-hero__glow"></div>
                        <div class="container app-hero__content">
                            <div class="app-hero__copy">
                                <span class="eyebrow">Legendary Marvel · Version ${version}</span>
                                <h1 class="app-hero__title">Build stylish showdowns, track your history, and randomize every encounter.</h1>
                                <p class="app-hero__text">Choose your collection, spin up a scenario in seconds, and keep every game session beautifully organized.</p>
                            </div>
                            <div class="app-hero__actions">
                                <a class="btn btn-light btn-lg" href="/game/new/${GAME_MODE.SOLO}">Start a solo game</a>
                                <a class="btn btn-outline-light btn-lg" href="/extensions">Tune my collection</a>
                            </div>
                        </div>
                    </section>
                    <div class="container content-shell">
                        <div class="content-panel">
                            ${content}
                        </div>
                    </div>
                </main>
                </body>
            </html>`;
    }
}
