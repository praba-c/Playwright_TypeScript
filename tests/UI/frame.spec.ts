import { test } from "@playwright/test"

test('iFrames', async ({ page }) => {
    await page.goto('https://letcode.in/frame');
    const frame = page.frame({ name: 'firstFr' });
    if (frame) {
        await frame.getByPlaceholder('Enter name').fill('Prabu');
        await frame.getByPlaceholder('Enter email').fill('Prabu');
        const iFrame = frame.frameLocator("[src='innerframe']");
        await iFrame.locator("[name='email']").fill('Prabu');
    }
});