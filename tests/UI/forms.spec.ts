import { test, expect } from "playwright/test";
import ExcelJS from "exceljs";

test('forms', async ({ page }) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("testData.xlsx");
    const sheet = workbook.getWorksheet("Sheet1")!;

    await page.goto('https://letcode.in/forms');

    //READ
    const firstname = sheet.getRow(2).getCell(1).value;
    const lastname = sheet.getRow(2).getCell(2).value;

    //WRITE
    sheet.getRow(2).getCell(3).value = "Passed";
    //sheet.getRow(3).getCell(1).value = "Passed";
    sheet.getRow(3).getCell(1).value = null;
    await workbook.xlsx.writeFile("testData.xlsx");


    await page.locator('#firstname').fill(String(firstname));
    await page.locator('#lasttname').fill(String(lastname));
    await page.locator('#email').click();
    await page.locator('#email').pressSequentially('gmail.com');
    const countryCode = page.locator("//label[@id='countrycode']/../div");
    await countryCode.click();
    const code = countryCode.locator("select");
    await code.selectOption({ value: "91" });
    await page.locator('#Phno').fill('1234567890');
    await page.locator('#Addl1').fill('123');
    await page.locator("#Addl2").fill('ABC');
    await page.locator('#state').fill('TN');
    await page.locator('#postalcode').fill('123456');
    const country = page.locator("//label[@id='country']/../div");
    await country.click();
    await country.locator('select').selectOption({ value: 'India' });
    await page.locator('#Date').fill('2025-09-10');
    await page.locator('#male').click();
    await page.locator("//input[@type='checkbox']").check();
    await page.locator("//input[@type='submit']").click();
})