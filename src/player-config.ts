export class PlayerConfig {

    private readonly _villainsCount: number;
    private readonly _henchmenCount: number;
    private readonly _heroesCount: number;
    private readonly _bystandersCount: number;

    public get villainsCount() {
        return this._villainsCount;
    }

    public get henchmenCount() {
        return this._henchmenCount;
    }

    public get heroesCount() {
        return this._heroesCount;
    }

    public get bystandersCount() {
        return this._bystandersCount;
    }

    constructor(playerCount: number) {
        switch (playerCount) {
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
                this._heroesCount = 3;
                this._bystandersCount = 1;
                break;
            }
        }
    }
}
