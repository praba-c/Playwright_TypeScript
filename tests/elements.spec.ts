import {test, expect} from "@playwright/test";
import { StringDecoder } from "string_decoder";

test('elements', async ({page}) => {
    await page.goto('https://letcode.in/elements');
    await page.locator("//input[@name='username']").fill('praba-c');
    await page.locator('#search').click();
    const gitInfo = page.locator("//div[@class='content ng-star-inserted']");
    await expect(gitInfo).toBeVisible();
    
    const userImage = page.locator("//figure[@class='image is-128x128']/img");
    await expect(userImage).toHaveAttribute('src');

    const userName = await page.locator("//div[@class='media-content']/p").nth(0).textContent();
    const userLocation = await page.locator("//div[@class='media-content']/p").nth(1).textContent();
    console.log('UserName:', userName);
    console.log('Location:', userLocation);

    const publicRepoCount = await page.locator("//p[text()='Public Repos']/..//span/..").textContent();
    console.log('repoCount:',publicRepoCount);
    let repoListCount : any[] = [];
    while(true) {
        const page1 = await page.locator("//app-repos/div/div//a").allTextContents();
        repoListCount.push(...page1)
        const nextBtn = page.locator("//button[@class='pagination-next']");
        if (!(await nextBtn.isDisabled())) {
            break;
        }
        await nextBtn.click();
        await page.waitForLoadState("domcontentloaded");
    }
    console.log('repoListCount:', repoListCount.length);
    console.log(repoListCount);
});