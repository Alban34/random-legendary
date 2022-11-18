import { beforeEach, describe, expect, test } from '@jest/globals';
import { container } from '../injectable-config';
import { CardLoader } from './card-loader';
import TYPES from '../types';
import { GameBuilder } from '../game/game-builder';
import { PredefinedGame } from '../game/model/predefined-game';
import { GAME_MODE, PlayerConfig } from '../game/player-config';

describe('custom rules tests on database', () => {

    let allCards;
    let gameBuilder: GameBuilder;
    beforeEach(() => {
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
