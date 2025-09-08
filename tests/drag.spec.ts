import {test, expect} from "@playwright/test";

test('drag', async({page}) => {
    await page.goto('https://letcode.in/draggable');
    const box = await page.locator('#sample-box').boundingBox();

    if (box) {
        await page.mouse.move(box.x + box.width/2, box.y + box.height/2)
        await page.mouse.down();
        await page.mouse.move(box.x + box.width/2 + 100, box.y + box.height/2 + 100, {steps: 50});
        await page.mouse.up();
    }
});