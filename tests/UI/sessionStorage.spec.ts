import { BrowserContext, chromium, test } from "@playwright/test";
let web: BrowserContext;

test.only('session storage', async ({ }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await context.storageState({ path: 'storageState.json' });
    web = await browser.newContext({ storageState: 'storageState.json' });
    await page.waitForTimeout(2000);
});

test.only('use session storage', async () => {
    const page = await web.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForTimeout(2000);
});