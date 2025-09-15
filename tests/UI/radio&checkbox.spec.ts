import {test, expect} from "@playwright/test"

test ('radio', async ({page}) => {
    await page.goto('https://letcode.in/radio');
    await page.locator('#yes').click();

    await page.locator('#one').click();
    await expect(page.locator('#two')).not.toBeChecked();
    await page.locator('#two').click();
    await expect(page.locator('#one')).not.toBeChecked();

    await page.locator('#nobug').check();
    await page.locator('#bug').check();
    try {
        await expect(page.locator('#nobug')).not.toBeChecked();
    } catch (error) {
        console.log('bug');
    }
    
    const count = await page.locator("//input[@name='foobar']").count();
    for (let i=0;i<count;++i) {
        if (await page.locator("//input[@name='foobar']").nth(i).isChecked()) {
            console.log(await page.locator("//input[@name='foobar']").nth(i).locator('..').textContent());
            break;
        }
    }

    const planCount = await page.locator("//input[@name='plan']").count();
    expect(page.locator("//input[@name='plan']").nth(planCount - 1)).toBeDisabled();
});

test ('checkbox', async ({page}) => {
    expect(page.locator("//input[@type='checkbox']").nth(0)).toBeChecked();

    await page.locator("//input[@type='checkbox']").nth(1).check();
})