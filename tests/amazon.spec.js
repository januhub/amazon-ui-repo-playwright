const {chromium} = require('playwright');

(async () => {
const browser = await chromium.launch({headless: false});
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://www.amazon.com/");

try{
await page.click("[data-action-type='DISMISS']", {timeout: 5000});
await page.click("#aee-xop-dismiss", {timeout: 5000});
} catch (e){}

await page.click("text= Today's Deals");
await page.click("[data-testid='carousel-deals-collection-FASH']");
await page.click("[aria-label='Coats & Jackets Under $50']>> nth=1");
await page.click("[data-asin ='B06XK97JQP']");
await page.click("span.a-dropdown-prompt");
await page.click("a:has-text('Large')");
await page.click("[alt='Khaki K']");
await page.click("#buy-now-button");

await page.waitForTimeout(5000);
await browser.close();
})()
