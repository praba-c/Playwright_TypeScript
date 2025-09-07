import { test, expect } from '@playwright/test';

test('input', async({page}) => {
    await page.goto("https://letcode.in/edit");
    await page.getByPlaceholder('Enter first & last name').fill('Prabu');

    await page.getByPlaceholder('Enter ').nth(1).click();
    await page.getByPlaceholder('Enter ').nth(1).pressSequentially(' tester');

    const stringValue = page.locator("(//input[@placeholder='Enter '])[2]");
    console.log(await stringValue.getAttribute('value'));

    await page.getByPlaceholder('Enter ').nth(3).clear();

    const disabled = page.locator("//input[@placeholder='Enter']");
    await expect(disabled).toBeDisabled();

    const readOnlyAttribute = page.locator("(//input[@value='This text is readonly'])");
    expect(readOnlyAttribute).toHaveAttribute('readonly');
})