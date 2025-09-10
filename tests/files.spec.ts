import {test} from "@playwright/test";

test('files', async({page}) => {
    await page.goto('https://letcode.in/file');
    await page.locator("//label[@class='file-label']").nth(0).setInputFiles("C:/Users/291502/Desktop/System Design.txt");
    
    const [ download ] = await Promise.all ([
        page.waitForEvent('download'),
        page.locator('#xls').click()
    ])

    await download.saveAs('downloads/myfile.txt');
})