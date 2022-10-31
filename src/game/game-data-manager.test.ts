import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { GameDataManager } from './game-data-manager';
import { DataManager } from '../data/data-manager.interface';
import { Scores } from './model/scores';
import { container } from '../injectable-config';
import TYPES from '../types';

describe('GameDataManager', () => {

    let dataManagerMock: DataManager;
    let gameManager;

    const cardList = {
        masterminds: [
            { name: 'm1', count: 2, gameId: ['game3', 'game2'] },
            { name: 'm2', count: 0 },
            { name: 'm3', count: 1, gameId: ['game1'] },
            { name: 'm4', count: 0 }
        ],
        schemes: [
            { name: 's1', count: 0 },
            { name: 's2', count: 0 },
            { name: 's3', count: 1, gameId: ['game3'] }
        ],
        villains: [
            { name: 'v1', count: 0 },
            { name: 'v2', count: 2, gameId: ['game1', 'game3'] },
            { name: 'v3', count: 0 },
            { name: 'v4', count: 1, gameId: ['game2'] },
        ],
        henchmen: [
            { name: 'hm1', count: 3, gameId: ['game1', 'game2', 'game3'] },
            { name: 'hm2', count: 0 },
            { name: 'hm3', count: 0 }
        ],
        heroes: [
            { name: 'h1', count: 1, gameId: ['game1'] },
            { name: 'h2', count: 3, gameId: ['game1', 'game2', 'game3'] },
            { name: 'h3', count: 0 },
            { name: 'h4', count: 1, gameId: ['game3'] }
        ]
    };

    beforeEach(() => {
        dataManagerMock = {
            readExtensionsData(): string[] {
                return [];
            },
            readGamesData() {
            },
            readScores(): Scores {
                return { 'game2': { score: 10 } };
            },
            writeGameData(gamesToSave) {
            },
            writeExtensionsData(extensions: string[]) {
            },
            writeScores(scores): void {
            }
        };

        container.rebind<DataManager>(TYPES.DataManager).toConstantValue(dataManagerMock);
        gameManager = container.get<GameDataManager>(TYPES.GameDataManager);
    });

    test('should save only the cards that have a games without a scoring already registered', () => {
        dataManagerMock.writeGameData = (gamesToSave) => {
            expect(gamesToSave.masterminds.filter(card => (card.name === 'm2' || card.name === 'm4')).length).toBe(0);
            expect(gamesToSave.schemes.filter(card => (card.name === 's1' || card.name === 's2')).length).toBe(0);
            expect(gamesToSave.villains.filter(card => (card.name === 'v1' || card.name === 'v3')).length).toBe(0);
            expect(gamesToSave.henchmen.filter(card => (card.name === 'hm2' || card.name === 'hm3')).length).toBe(0);
            expect(gamesToSave.heroes.filter(card => card.name === 'h3').length).toBe(0);
        };

        const spyDataManager = jest.spyOn(dataManagerMock, 'writeGameData');

        gameManager.saveData(cardList);
        expect(spyDataManager).toHaveBeenCalled();
    });

});
