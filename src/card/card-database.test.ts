import { beforeEach, describe, expect, test } from '@jest/globals';
import { container } from '../injectable-config';
import { CardLoader } from './card-loader';
import TYPES from '../types';
import { GameBuilder } from '../game/game-builder';
import { PredefinedGame } from '../game/model/predefined-game';
import { GAME_MODE, PlayerConfig } from '../game/player-config';
import { DataManager } from '../data/data-manager.interface';
import { Scores } from '../game/model/scores';

describe('custom rules tests on database', () => {

    let allCards;
    let gameBuilder: GameBuilder;
    beforeEach(() => {
        const dataManagerMock: DataManager = {
            getDataLocation(): string {
                return '';
            }, readExtensionsData(): string[] {
                return [];
            }, readGamesData() {
                return {};
            }, readScores(): Scores {
                return undefined;
            }, writeExtensionsData(extensions: string[]): void {
            }, writeGameData(gamesToSave): void {
            }, writeScores(scores: Scores): void {
            }
        };
        container.rebind<DataManager>(TYPES.DataManager).toConstantValue(dataManagerMock);
        const cardLoader = container.get<CardLoader>(TYPES.CardLoader);
        allCards = cardLoader.loadData();
        gameBuilder = new GameBuilder();
    });

    describe('Age of Ultron', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Age of Ultron',
                extension: 'Ant-Man'
            }
        } as PredefinedGame;

        test('should add another hero in 4-5 players game', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(4);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(5);
        });

        test('should not add another hero in 1-3 players game', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Age of Ultron');
            expect(game.villains.length).toBe(3);
        });
    });

    describe('Break the Planet Asunder', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Illuminati, Secret Society',
                extension: 'World War Hulk'
            },
            scheme: {
                name: 'Break the Planet Asunder',
                extension: 'World War Hulk'
            }
        } as PredefinedGame;

        test('should have 7 heroes always', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.scheme.name).toBe('Break the Planet Asunder');
            expect(game.heroes.length).toBe(7);
        });
    });

    describe('Cursed Pages of the Darkhold Tome', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Cursed Pages of the Darkhold Tome',
                extension: 'Doctor Strange and the Shadows of Nightmare'
            }
        } as PredefinedGame;

        test('should add one more villain group', () => {
            testAddOneVillainGroup(predefinedGame);
        });
    });

    describe('Deadlands Hordes Charge the Wall', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Deadlands Hordes Charge the Wall',
                extension: 'Secret Wars, Volume 2'
            }
        } as PredefinedGame;

        test('should add one more villain group', () => {
            testAddOneVillainGroup(predefinedGame);
        });
    });

    describe('Detonate the Helicarrier', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Detonate the Helicarrier',
                extension: 'Dark City'
            }
        } as PredefinedGame;

        test('should always have 6 heroes in the hero deck', () => {
            testHeroesCount(predefinedGame, 6);
        });
    });

    describe('Divide and Conquer', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Divide and Conquer',
                extension: 'Champions',
            }
        } as PredefinedGame;

        test('should always have 7 heroes in the hero deck', () => {
            testHeroesCount(predefinedGame, 7);
        });
    });

    describe('Divide and Conquer', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Epic Super Hero Civil War',
                extension: 'Civil War'
            }
        } as PredefinedGame;

        test('should have 4 heroes in the hero deck for 1 player', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.heroes.length).toBe(4);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.heroes.length).toBe(4);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.heroes.length).toBe(5);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.heroes.length).toBe(5);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.heroes.length).toBe(5);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.heroes.length).toBe(6);
        });
    });

    describe('Fall of the Hulks', () => {

        const perfomeTest = (predefinedGame, mode) => {
            const playerConfig = new PlayerConfig(mode);
            const game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            const hulkCards = game.heroes.filter(card => card.name.indexOf('Hulk') > -1);
            expect(hulkCards.length).toBe(2);
            expect(game.heroes.length).toBe(playerConfig.heroesCount);
        }

        describe('none Hulk selected yet', () => {
            const predefinedGame = {
                mastermind: {
                    name: 'Illuminati, Secret Society',
                    extension: 'World War Hulk'
                },
                scheme: {
                    name: 'Fall of the Hulks',
                    extension: 'World War Hulk'
                },
                heroes: [
                    {
                        'name': 'Goliath',
                        'extension': 'Civil War'
                    },
                    {
                        'name': 'Gorgon',
                        'extension': 'Realm of Kings'
                    }
                ]
            } as PredefinedGame;
            
            test('should always add the 2 Hulk heroes solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.SOLO);
            });

            test('should always add the 2 Hulk heroes advanced solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.ADVANCED_SOLO);
            });

            test('should always add the 2 Hulk heroes 2 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.TWO_PLAYERS);
            });

            test('should always add the 2 Hulk heroes 3 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.THREE_PLAYERS);
            });

            test('should always add the 2 Hulk heroes 4 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FOUR_PLAYERS);
            });

            test('should always add the 2 Hulk heroes 5 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FIVE_PLAYERS);
            });
        });

        describe('already 2 Hulk selected yet', () => {
            const predefinedGame = {
                mastermind: {
                    name: 'Illuminati, Secret Society',
                    extension: 'World War Hulk'
                },
                scheme: {
                    name: 'Fall of the Hulks',
                    extension: 'World War Hulk'
                },
                heroes: [
                    {
                        'name': 'Gladiator Hulk',
                        'extension': 'World War Hulk',
                    },
                    {
                        'name': 'Hulk',
                        'extension': 'Core Set',
                    }
                ]
            } as PredefinedGame;

            test('should remove as many Hulk as need to have only 2 solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.SOLO);
            });

            test('should remove as many Hulk as need to have only 2 advanced solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.ADVANCED_SOLO);
            });

            test('should remove as many Hulk as need to have only 2 2 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.TWO_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 3 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.THREE_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 4 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FOUR_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 5 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FIVE_PLAYERS);
            });
        });

        describe('already more than 2 Hulk selected yet', () => {
            const predefinedGame = {
                mastermind: {
                    name: 'Illuminati, Secret Society',
                    extension: 'World War Hulk'
                },
                scheme: {
                    name: 'Fall of the Hulks',
                    extension: 'World War Hulk'
                },
                heroes: [
                    {
                        'name': 'Gladiator Hulk',
                        'extension': 'World War Hulk',
                    },
                    {
                        'name': 'Hulk',
                        'extension': 'Core Set',
                    },
                    {
                        'name': 'Hulkling',
                        'extension': 'Civil War'
                    }
                ]
            } as PredefinedGame;
            
            test('should remove as many Hulk as need to have only 2 solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.SOLO);
            });

            test('should remove as many Hulk as need to have only 2 advanced solo', () => {
                perfomeTest(predefinedGame, GAME_MODE.ADVANCED_SOLO);
            });

            test('should remove as many Hulk as need to have only 2 2 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.TWO_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 3 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.THREE_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 4 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FOUR_PLAYERS);
            });

            test('should remove as many Hulk as need to have only 2 5 players', () => {
                perfomeTest(predefinedGame, GAME_MODE.FIVE_PLAYERS);
            });
        });
    });

    describe('Forge the Infinity Gauntlet', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Forge the Infinity Gauntlet',
                extension: 'Guardians of the Galaxy'
            }
        } as PredefinedGame;

        test('should always have the Infinity Gems as a villain group', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.villains[0].name).toBe('Infinity Gems');
        });
    });

    describe('HYDRA Helicarriers Hunt Heroes', () => {
        const predefinedGame = {
            mastermind: {
                name: 'HYDRA High Council',
                extension: 'S.H.I.E.L.D.'
            },
            scheme: {
                name: 'HYDRA Helicarriers Hunt Heroes',
                extension: 'S.H.I.E.L.D.',
            }
        } as PredefinedGame;

        test('should add an additional hero', () => {
            let playerConfig = new PlayerConfig(GAME_MODE.SOLO);
            let game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);

            playerConfig = new PlayerConfig(GAME_MODE.ADVANCED_SOLO);
            game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);

            playerConfig = new PlayerConfig(GAME_MODE.TWO_PLAYERS);
            game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);

            playerConfig = new PlayerConfig(GAME_MODE.THREE_PLAYERS);
            game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);

            playerConfig = new PlayerConfig(GAME_MODE.FOUR_PLAYERS);
            game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);

            playerConfig = new PlayerConfig(GAME_MODE.FIVE_PLAYERS);
            game = gameBuilder.buildGame(allCards, playerConfig, predefinedGame);
            expect(game.heroes.length).toBe(playerConfig.heroesCount + 1);
        });
    });

    describe('Hypnotize Every Human', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Hypnotize Every Human',
                extension: 'Champions',
            }
        } as PredefinedGame;

        test('should add a new henchman and remove all bystanders', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(2);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(3);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            expect(game.bystanders).toBe(0);
            expect(game.henchmen.length).toBe(3);
        });
    });

    describe('Secret Invasion of the Skrull Shapeshifters', () => {
        const predefinedGame = {
            mastermind: {
                name: 'Apocalypse',
                extension: 'Dark City'
            },
            scheme: {
                name: 'Secret Invasion of the Skrull Shapeshifters',
                extension: 'Core Set',
            }
        } as PredefinedGame;

        test('should always have 6 heroes', () => {
            testHeroesCount(predefinedGame, 6);
        });

        test('should always have the Skrulls villain group', () => {
            let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
            let hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
            hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
            hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
            hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
            hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);

            game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
            hasSkrulls = game.villains.filter(v => v.name === 'Skrulls');
            expect(hasSkrulls.length).toBe(1);
        });
    });

    function testAddOneVillainGroup(predefinedGame) {
        let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
        expect(game.villains.length).toBe(2);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
        expect(game.villains.length).toBe(2);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
        expect(game.villains.length).toBe(3);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
        expect(game.villains.length).toBe(4);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
        expect(game.villains.length).toBe(4);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
        expect(game.villains.length).toBe(5);
    }

    function testHeroesCount(predefinedGame, expectedHeroesCount) {
        let game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.SOLO), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.ADVANCED_SOLO), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.TWO_PLAYERS), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.THREE_PLAYERS), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FOUR_PLAYERS), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);

        game = gameBuilder.buildGame(allCards, new PlayerConfig(GAME_MODE.FIVE_PLAYERS), predefinedGame);
        expect(game.heroes.length).toBe(expectedHeroesCount);
    }
});
