export enum GAME_MODE {
    SOLO = 0,
    ADVANCED_SOLO = 1,
    TWO_PLAYERS = 2,
    TWO_HANDED_SOLO = 21,
    THREE_PLAYERS = 3,
    THREE_HANDED_SOLO = 31,
    FOUR_PLAYERS = 4,
    FIVE_PLAYERS = 5
}

export class PlayerConfig {

    private readonly _villainsCount: number;
    private readonly _henchmenCount: number;
    private readonly _henchmenCardsCount: number = 10;
    private readonly _heroesCount: number;
    private readonly _bystandersCount: number;
    private readonly _masterStrikeCount: number = 5;

    public get villainsCount(): number {
        return this._villainsCount;
    }

    public get henchmenCount(): number {
        return this._henchmenCount;
    }

    public get henchmenCardsCount(): number {
        return this._henchmenCardsCount;
    }

    public get heroesCount(): number {
        return this._heroesCount;
    }

    public get bystandersCount(): number {
        return this._bystandersCount;
    }

    public get masterStrikeCount(): number {
        return this._masterStrikeCount;
    }

    public playerCount: number;

    public getGameMode() {
        return this.gameMode;
    }

    constructor(private gameMode: GAME_MODE) {

        switch (gameMode) {
            case GAME_MODE.TWO_PLAYERS:
            case GAME_MODE.TWO_HANDED_SOLO:
                this.playerCount = 2;
                break;
            case GAME_MODE.THREE_PLAYERS:
            case GAME_MODE.THREE_HANDED_SOLO:
                this.playerCount = 3;
                break;
            case GAME_MODE.FOUR_PLAYERS:
                this.playerCount = 4;
                break;
            case GAME_MODE.FIVE_PLAYERS:
                this.playerCount = 5;
                break;
            default:
                this.playerCount = 1;
                break;
        }

        switch (this.playerCount) {
            case 2: {
                this._villainsCount = 2;
                this._henchmenCount = 1;
                this._heroesCount = 5;
                this._bystandersCount = 2;
                break;
            }
            case 3: {
                this._villainsCount = 3;
                this._henchmenCount = 1;
                this._heroesCount = 5;
                this._bystandersCount = 8;
                break;
            }
            case 4: {
                this._villainsCount = 3;
                this._henchmenCount = 2;
                this._heroesCount = 5;
                this._bystandersCount = 8;
                break;
            }
            case 5: {
                this._villainsCount = 4;
                this._henchmenCount = 2;
                this._heroesCount = 6;
                this._bystandersCount = 12;
                break;
            }
            default: {
                this._villainsCount = 1;
                this._henchmenCount = 1;
                this._henchmenCardsCount = 3;
                this._heroesCount = 3;
                this._bystandersCount = 1;
                break;
            }
        }

        if (gameMode === GAME_MODE.SOLO) {
            this._masterStrikeCount = 1;
        }
    }

    /**
     * Try to guess the amount of human players based on game stats
     * @param villains 
     * @param henchmen 
     * @param heroes 
     * @returns 
     */
    static guessPlayerCount(villains: number, henchmen: number, heroes: number): number {
        if (heroes === 3) {
            return 1;
        }
        if (henchmen === 1) {
            return villains;
        }

        return villains + 1;
    }

    /**
     * Returns the number of human players corresponding to the game mode (i.e.: only 1 human on a 2 handed solo mode)
     * @param gameMode 
     * @returns 
     */
    static getHumanPlayerCount(gameMode: number) {
        switch (gameMode) {
            case GAME_MODE.SOLO:
            case GAME_MODE.ADVANCED_SOLO:
            case GAME_MODE.TWO_HANDED_SOLO:
            case GAME_MODE.THREE_HANDED_SOLO:
                return 1;
            default:
                return gameMode;
        }
    }

    /**
     * Extract the PlayerConfig object from the id of a given game
     * @param gameId 
     * @returns 
     */
    static extractPlayerConfigFromGameId(gameId: string): PlayerConfig {
        const gameMode = parseInt(gameId.substring(gameId.indexOf('|') + 1));
        return new PlayerConfig(gameMode);
    }
}
