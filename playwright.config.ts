import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const PORT = 3100;
const dataDir = path.resolve(__dirname, '.playwright-data');

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    workers: 1,
    timeout: 30_000,
    expect: {
        timeout: 10_000
    },
    use: {
        baseURL: `http://127.0.0.1:${PORT}`,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    webServer: {
        command: 'npm run start:web',
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: false,
        env: {
            ...process.env,
            PORT: String(PORT),
            RANDOM_LEGENDARY_HOME: dataDir
        }
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
});

