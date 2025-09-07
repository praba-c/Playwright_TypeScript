import {test, expect} from "@playwright/test"

test('alert', async({page}) => {
    await page.goto('https://letcode.in/alert');
  
    page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });
    await page.locator('#accept').click();

    page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });
    await page.locator('#confirm').click();
    
    page.once('dialog', async dialog => {
        await dialog.accept('Prabu');
    });
    await page.locator('#prompt').click();

    await page.locator('#modern').click();
    await page.locator('[aria-label="close"]').click();
});