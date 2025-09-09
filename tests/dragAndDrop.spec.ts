import {test, expect} from "@playwright/test";

test('drag and drop', async({page}) => {
    await page.goto('https://letcode.in/sortable');
    const toDo = await page.locator("//div[@id='cdk-drop-list-0']/div").count();
    //await page.waitForTimeout(3000);

    for (let i=0;i<toDo;++i) {
        const source = await page.locator("//div[@id='cdk-drop-list-0']/div").nth(0).boundingBox();
        const count = await page.locator("//div[@id='cdk-drop-list-1']/div").count();
        //console.log('count', count);
        await page.waitForTimeout(1000);
        const target = await page.locator("//div[@id='cdk-drop-list-1']/div").nth(count - 1).boundingBox();

        if (source && target) {
            await page.mouse.move(source.x + source.width/2, source.y + source.height/2);
            await page.mouse.down();
            await page.mouse.move(target.x + target.width/2, target.y + target.height, {steps: 20});
            await page.mouse.up();
        }
    }
    await page.waitForTimeout(3000);
})