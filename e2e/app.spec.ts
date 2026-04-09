import { expect, test } from '@playwright/test';
import { baseUrl, checkExtension, getHistoryRows, goToHome, readSavedGames, resetE2EData, saveExtensions, startSoloGame, withPage } from './test-helpers';

test.beforeEach(async () => {
    await resetE2EData();
});

test('loads the application successfully', async () => {
    await withPage(async (page) => {
        await goToHome(page);
        await expect(page.getByRole('button', { name: 'Start new game' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Games' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Cards' })).toBeVisible();
    });
});

test('lets the user select the cards they own', async () => {
    await withPage(async (page) => {
        await page.goto(`${baseUrl}/extensions`);

        await page.getByRole('button', { name: 'Uncheck all' }).click();
        await checkExtension(page, 'Core Set', true);
        await checkExtension(page, 'Dark City', true);
        await saveExtensions(page);

        await page.goto(`${baseUrl}/extensions`);
        await expect(page.locator('input[value="Core Set"]')).toBeChecked();
        await expect(page.locator('input[value="Dark City"]')).toBeChecked();
        await expect(page.locator('input[value="Annihilation"]')).not.toBeChecked();

        await page.goto(`${baseUrl}/cards/mine/group`);
        await expect(page.getByRole('heading', { name: 'Core Set' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Dark City' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Annihilation' })).toHaveCount(0);
    });
});

test('lets the user start a new game', async () => {
    await withPage(async (page) => {
        const startedGame = await startSoloGame(page);

        await expect(page.getByText(startedGame.gameId, { exact: true })).toBeVisible();
        await expect(page.getByText('Mastermind', { exact: true })).toBeVisible();
        await expect(page.getByText('Scheme', { exact: true })).toBeVisible();
        await expect(page.getByText(startedGame.mastermind, { exact: true }).first()).toBeVisible();
        await expect(page.getByText(startedGame.scheme, { exact: true }).first()).toBeVisible();
    });
});

test('saves a generated game', async () => {
    await withPage(async (page) => {
        const startedGame = await startSoloGame(page);

        await expect.poll(async () => {
            const savedGames = await readSavedGames();
            return JSON.stringify(savedGames);
        }).toContain(startedGame.gameId);

        const historyRows = await getHistoryRows(page);
        await expect(historyRows.filter({ hasText: startedGame.mastermind }).filter({ hasText: startedGame.scheme })).toHaveCount(1);
        await expect(historyRows.filter({ hasText: startedGame.mastermind }).filter({ hasText: startedGame.scheme }).first()).toContainText('No score yet');
    });
});

test('does not immediately reselect saved cards in the next game', async () => {
    await withPage(async (page) => {
        const firstGame = await startSoloGame(page);
        const secondGame = await startSoloGame(page);

        expect(secondGame.gameId).not.toBe(firstGame.gameId);
        expect(secondGame.mastermind).not.toBe(firstGame.mastermind);
        expect(secondGame.scheme).not.toBe(firstGame.scheme);

        const repeatedHeroes = secondGame.heroes.filter((hero) => firstGame.heroes.includes(hero));
        expect(repeatedHeroes).toEqual([]);
    });
});

