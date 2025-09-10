import { test, expect } from "playwright/test";

test('forms', async({page}) => {
    await page.goto('https://letcode.in/forms');
    await page.locator('#firstname').fill('Roronoa');
    await page.locator('#lasttname').fill('Zoro');
    await page.locator('#email').click();
    await page.locator('#email').pressSequentially('gmail.com');
    const countryCode = page.locator("//label[@id='countrycode']/../div");
    await countryCode.click();
    const code = countryCode.locator("select");
    await code.selectOption({value: "91"});
    await page.locator('#Phno').fill('1234567890');
    await page.locator('#Addl1').fill('123');
    await page.locator("#Addl2").fill('ABC');
    await page.locator('#state').fill('TN');
    await page.locator('#postalcode').fill('123456');
    const country = page.locator("//label[@id='country']/../div");
    await country.click();
    await country.locator('select').selectOption({value: 'India'});
    await page.locator('#Date').fill('2025-09-10');
    await page.locator('#male').click();
    await page.locator("//input[@type='checkbox']").check();
    await page.locator("//input[@type='submit']").click();
})