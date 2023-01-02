import { describe, expect, test } from '@jest/globals';
import { PlayerConfig } from './player-config';

describe('player-config', () => {
    test('should create config for core solo', () => {
        const config = new PlayerConfig(0);

        expect(config.villainsCount).toBe(1);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(1);
        expect(config.masterStrikeCount).toBe(1);
        expect(config.heroesCount).toBe(3);
    });

    test('should create config for advanced solo', () => {
        const config = new PlayerConfig(1);

        expect(config.villainsCount).toBe(1);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(1);
        expect(config.masterStrikeCount).toBe(5);
        expect(config.heroesCount).toBe(3);
    });

    test('should create config for 2 players', () => {
        const config = new PlayerConfig(2);

        expect(config.villainsCount).toBe(2);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(2);
        expect(config.masterStrikeCount).toBe(5);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 3 players', () => {
        const config = new PlayerConfig(3);

        expect(config.villainsCount).toBe(3);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(8);
        expect(config.masterStrikeCount).toBe(5);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 4 players', () => {
        const config = new PlayerConfig(4);

        expect(config.villainsCount).toBe(3);
        expect(config.henchmenCount).toBe(2);
        expect(config.bystandersCount).toBe(8);
        expect(config.masterStrikeCount).toBe(5);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 5 players', () => {
        const config = new PlayerConfig(5);

        expect(config.villainsCount).toBe(4);
        expect(config.henchmenCount).toBe(2);
        expect(config.bystandersCount).toBe(12);
        expect(config.masterStrikeCount).toBe(5);
        expect(config.heroesCount).toBe(6);
    });

    describe('should be able to guess the amount of players according to the villains and henchmen count', () => {

        test('should 1 villains and 1 henchman lead to 1 player configs', () => {
            expect(PlayerConfig.guessPlayerCount(1, 1, 1)).toBe(1);
        });

        test('should 3 heroes and any villains and 1 henchman lead to 1 player configs', () => {
            expect(PlayerConfig.guessPlayerCount(2, 1, 3)).toBe(1);
        });

        test('should 2 villains and 1 henchman lead to 2 players configs', () => {
            expect(PlayerConfig.guessPlayerCount(2, 1, 5)).toBe(2);
        });

        test('should 3 villains and 1 henchman lead to 3 players configs', () => {
            expect(PlayerConfig.guessPlayerCount(3, 1, 5)).toBe(3);
        });

        test('should 3 villains and 2 henchman lead to 4 players configs', () => {
            expect(PlayerConfig.guessPlayerCount(3, 2, 5)).toBe(4);
        });

        test('should 4 villains and 2 henchman lead to 5 players configs', () => {
            expect(PlayerConfig.guessPlayerCount(4, 2, 6)).toBe(5);
        });

    });
});
