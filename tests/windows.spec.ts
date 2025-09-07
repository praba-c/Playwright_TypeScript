import {test, expect} from "@playwright/test"

test('windows', async({page, context}) => {
    await page.goto('https://letcode.in/window');
    const[newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('#home')
    ]);
    await page.waitForLoadState();
    await expect(newPage).toHaveURL('https://letcode.in/test');
    console.log(await newPage.title());
    await newPage.close();
    await page.waitForTimeout(3000);
    await page.close();
});

test ('multiple windoes', async({page, context}) => {
    await page.goto('https://letcode.in/window');
    await page.click('#multi');
    await page.waitForTimeout(3000);
    const pages = context.pages();
    console.log(pages.length);
    for (let i=1;i<pages.length;++i) {
        console.log(await pages[i].title());
    }
});