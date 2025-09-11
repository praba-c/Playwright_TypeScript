import {test, expect} from '@playwright/test'

test('buttons', async({page}) => {
    await page.goto('https://letcode.in/button')
    await page.locator('#home').click();

    await page.goto('https://letcode.in/button')
    const position = await page.locator('#position').boundingBox().then(box => {
        if (box) console.log(box.x, box.y)});
    //console.log(position);

    const button = page.locator('#color');
    const backgroundColor = await button.evaluate((el) => {return window.getComputedStyle(el).backgroundColor;});
    console.log(backgroundColor);

    await page.locator('#property').boundingBox().then(box => {
        if (box) console.log(box.height, box.width)});

    const disabled = page.locator('#isDisabled').nth(0);
    await expect(disabled).toHaveAttribute('disabled');

    await page.locator("//h2[text()=' Button Hold!']").dispatchEvent('mousedown');
    await page.waitForTimeout(5000);
    await page.mouse.up();
})