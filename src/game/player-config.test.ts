import { describe, expect, test } from '@jest/globals';
import { PlayerConfig } from './player-config';

describe('player-config', () => {
    test('should create config for 2 players', () => {
        const config = new PlayerConfig(2);

        expect(config.villainsCount).toBe(2);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(2);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 3 players', () => {
        const config = new PlayerConfig(3);

        expect(config.villainsCount).toBe(3);
        expect(config.henchmenCount).toBe(1);
        expect(config.bystandersCount).toBe(8);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 4 players', () => {
        const config = new PlayerConfig(4);

        expect(config.villainsCount).toBe(3);
        expect(config.henchmenCount).toBe(2);
        expect(config.bystandersCount).toBe(8);
        expect(config.heroesCount).toBe(5);
    });

    test('should create config for 5 players', () => {
        const config = new PlayerConfig(5);

        expect(config.villainsCount).toBe(4);
        expect(config.henchmenCount).toBe(2);
        expect(config.bystandersCount).toBe(12);
        expect(config.heroesCount).toBe(6);
    });
});
