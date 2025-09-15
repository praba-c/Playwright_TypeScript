import {test} from "@playwright/test";

test('shadow DOM', async({page}) => {
    await page.goto('https://letcode.in/shadow');
    const fname = page.locator("div[id='open-shadow'] >> .control >> #fname");
    await fname.fill('Roronoa');
})