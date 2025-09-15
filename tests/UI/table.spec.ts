import { test, expect } from "@playwright/test";

test('correct total', async ({ page }) => {
    await page.goto('https://letcode.in/table');
    const rows = page.locator('table#shopping tbody tr td:nth-child(2)');
    let total = 0;
    for (let i = 0; i < await rows.count(); i++) {
        const rowText = await rows.nth(i).textContent() || "";
        const value = parseInt(rowText.trim() || "0", 10);
        total += value
    }
    const tot = await page.locator('table#shopping tfoot td b').textContent();
    expect(total.toString()).toEqual(tot);
})

test('mark', async({page}) => {
    await page.goto('https://letcode.in/table');
    const rows = page.locator('table#simpletable tbody tr:nth-child(2) td:nth-child(2)');
    for (let i=0;i< await rows.count();++i) {
        const rowText = await rows.nth(i).textContent();
        if (rowText?.match("Raj")) {
            await rows.nth(i).locator('..').locator('td:nth-child(4) input').check();
            break;
        }
    }
})

test('sort', async({page}) => {
    await page.goto('https://letcode.in/table');
    await page.locator('table.mat-sort thead th:nth-child(6) svg').dblclick({force:true});
    const colestralValues = page.locator('table.mat-sort tr :nth-child(6)');
    for (let i=2;i<await colestralValues.count();++i) {
        const prev = await colestralValues.nth(i-1).textContent();
        const curr = await colestralValues.nth(i).textContent();
        const prevVal = parseInt(prev?.trim() || "0", 10);
        const currVal = parseInt(curr?.trim() || "0", 10);
        expect(prevVal).toBeLessThanOrEqual(currVal);
    }
})

test('calendar', async({page}) => {
    await page.goto('https://letcode.in/calendar');
    await page.locator('#birthday').fill('2025-09-10');
    await page.waitForTimeout(2000);
})