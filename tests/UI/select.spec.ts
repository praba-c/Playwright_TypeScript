import { test } from "@playwright/test"

test('select', async ({ page }) => {
    await page.goto('https://letcode.in/dropdowns');
    await page.locator('#fruits').selectOption('Apple');

    await page.locator('#superheros').selectOption({ index: 10 });
    await page.waitForTimeout(5000);

    const count = await page.locator("//select[@id='lang']/option").count();
    await page.locator('#lang').selectOption({ index: count - 1 });

    for (let i = 0; i < count; ++i) {
        console.log(await page.locator("//select[@id='lang']/option").nth(i).textContent());
    }

    const country = await page.locator('#country').selectOption('India');
    console.log(country.toString());
})