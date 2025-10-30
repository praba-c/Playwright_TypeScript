import { test, expect } from '@playwright/test'

test('buttons', async ({ page }) => {
    await page.goto('https://letcode.in/button')
    await page.locator('#home').click();

    await page.goto('https://letcode.in/button')
    const position = await page.locator('#position').boundingBox();
    if (position) console.log(position.x, position.y);

    const button = page.locator('#color');
    const backgroundColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log(backgroundColor);

    const propertyBox = await page.locator('#property').boundingBox();
    if (propertyBox) console.log(propertyBox.height, propertyBox.width);

    const disabled = page.locator('#isDisabled').nth(0);
    await expect(disabled).toBeDisabled();

    await page.locator("//h2[text()=' Button Hold!']").dispatchEvent('mousedown');
    await page.waitForTimeout(5000);
    await page.mouse.up();
})