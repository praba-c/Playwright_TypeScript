import { test } from "playwright/test";
import ExcelJS from "exceljs";

test('forms', async ({ page }) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("testData.xlsx");
    const sheet = workbook.getWorksheet("Sheet1")!;

    await page.goto('https://letcode.in/forms');

    //READ
    const firstname = sheet.getRow(2).getCell(1).value;
    const lastname = sheet.getRow(2).getCell(2).value;
    const email = sheet.getRow(2).getCell(3).value;
    const phoneNo = sheet.getRow(2).getCell(4).value;
    const add1 = sheet.getRow(2).getCell(5).value;
    const add2 = sheet.getRow(2).getCell(6).value;
    const state = sheet.getRow(2).getCell(7).value;
    const postalCode = sheet.getRow(2).getCell(8).value;

    //WRITE
    //sheet.getRow(2).getCell(3).value = "Passed";
    //await workbook.xlsx.writeFile("testData.xlsx");


    await page.locator('#firstname').fill(String(firstname));
    await page.locator('#lasttname').fill(String(lastname));

    await page.locator('#email').click();
    await page.locator('#email').pressSequentially(String(email));
    const countryCode = page.locator("//label[@id='countrycode']/../div");

    await countryCode.click();
    const code = countryCode.locator("select");
    await code.selectOption({ value: "91" });

    await page.locator('#Phno').fill(String(phoneNo));
    await page.locator('#Addl1').fill(String(add1));
    await page.locator("#Addl2").fill(String(add2));
    await page.locator('#state').fill(String(state));
    await page.locator('#postalcode').fill(String(postalCode));
    const country = page.locator("//label[@id='country']/../div");
    await country.click();
    await country.locator('select').selectOption({ value: 'India' });
    await page.locator('#Date').fill('2025-09-10');
    await page.locator('#male').click();
    await page.locator("//input[@type='checkbox']").check();
    await page.locator("//input[@type='submit']").click();
})