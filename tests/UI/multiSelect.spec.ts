import {test, expect} from "@playwright/test";

test('multi select', async({page}) => {
    await page.goto('https://letcode.in/selectable');
    const container = await page.locator("//div[@class='list-container']/div").all();
    for (const cnt of container) {
        console.log(await cnt.textContent());
        await cnt.click();
    }
})