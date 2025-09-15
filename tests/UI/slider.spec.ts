import {test, expect} from "@playwright/test";

test('slider', async({page}) => {
    await page.goto('https://letcode.in/slider');
    const slider = page.locator("input[type='range']");
    await slider.fill('19');
    await slider.press('ArrowRight');
    const sliderVal =  await page.locator("h1").nth(1).textContent();
    await page.locator("//button[text()='Get Countries']").click();
    const countries = await page.locator("p[class='has-text-primary-light']").textContent();
    const arr = countries?.split(" - ") || [];
    const countryCount = arr.length.toString();
    expect(sliderVal?.trim()).toMatch(countryCount);
    await page.waitForTimeout(3000);
})