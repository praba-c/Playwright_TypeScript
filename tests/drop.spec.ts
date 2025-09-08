import {test, expect} from "@playwright/test";

test ('drop', async({page}) => {
    await page.goto('https://letcode.in/droppable');

    const source = await page.locator('#draggable').boundingBox();
    const target = await page.locator('#droppable').boundingBox();

    if (source && target) {
        await page.mouse.move(source.x + source.width/2, source.y + source.height/2);
        await page.mouse.down();
        await page.mouse.move(target.x + target.width/2, target.y + target.height/10, {steps: 20});
        await page.mouse.up();
    }
});