import fs from 'fs-extra';
import path from 'node:path';
import { Browser, chromium, expect, Locator, Page } from '@playwright/test';

export const e2eDataDir = path.resolve(__dirname, '..', '.playwright-data');
export const gamesFilePath = path.join(e2eDataDir, 'games.json');
export const baseUrl = 'http://127.0.0.1:3100';
const chromeExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export interface StartedGame {
	gameId: string;
	mastermind: string;
	scheme: string;
	heroes: string[];
}

export async function resetE2EData(): Promise<void> {
	await fs.emptyDir(e2eDataDir);
}

export async function launchBrowser(): Promise<Browser> {
	return chromium.launch({
		executablePath: chromeExecutablePath,
		headless: true
	});
}

export async function readSavedGames(): Promise<Record<string, unknown>> {
	if (!await fs.pathExists(gamesFilePath)) {
		return {};
	}
	return fs.readJson(gamesFilePath) as Promise<Record<string, unknown>>;
}

export async function goToHome(page: Page): Promise<void> {
	await page.goto(`${baseUrl}/`);
	await expect(page.getByText('Legendary Marvel Randomizer')).toBeVisible();
	await expect(page.getByText('Welcome to this Legendary: Marvel randomizer.')).toBeVisible();
}

export async function startSoloGame(page: Page): Promise<StartedGame> {
	await page.goto(`${baseUrl}/game/new/0`);

	const scenarioCard = page.locator('.card').filter({ hasText: 'Scenario setup' }).first();
	const heroesCard = page.locator('.card').filter({ hasText: 'Heroes setup' }).first();

	await expect(page.getByText('Game setup')).toBeVisible();
	await expect(scenarioCard).toBeVisible();
	await expect(heroesCard).toBeVisible();

	const gameIdLine = await page.locator('p', { hasText: 'Game ID:' }).textContent();
	const gameId = gameIdLine?.replace('Game ID:', '').trim();
	if (!gameId) {
		throw new Error('Expected a generated game id on the game setup page.');
	}

	const scenarioNames = await scenarioCard.locator('.card-name').allTextContents();
	const heroes = await heroesCard.locator('.card-name').allTextContents();

	return {
		gameId,
		mastermind: scenarioNames[0]?.trim() ?? '',
		scheme: scenarioNames[1]?.trim() ?? '',
		heroes: heroes.map((hero) => hero.trim())
	};
}

export async function checkExtension(page: Page, extension: string, checked: boolean): Promise<void> {
	const checkbox = page.locator(`input[type="checkbox"][value="${extension}"]`);
	await expect(checkbox).toBeVisible();
	if (checked) {
		await checkbox.check();
	} else {
		await checkbox.uncheck();
	}
}

export async function saveExtensions(page: Page): Promise<void> {
	await page.locator('button.btn.btn-primary', { hasText: 'Save' }).click();
	await page.waitForURL('**/');
}

export async function getHistoryRows(page: Page): Promise<Locator> {
	await page.goto(`${baseUrl}/game/history`);
	const rows = page.locator('tbody tr');
	await expect(rows.first()).toBeVisible();
	return rows;
}

