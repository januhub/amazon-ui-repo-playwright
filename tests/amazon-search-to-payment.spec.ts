import { test, expect, chromium } from "@playwright/test";

test("Amazon search to payment page with varieing quantities", async () => {
  // browser set headless false chromium
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const context = await browser.newContext();

  // Load "https://www.amazon.in/"
  await page.goto("https://www.amazon.in/");

  // Click on <input> #twotabsearchtextbox
  await page.click("#twotabsearchtextbox");

  // Fill "dress" on <input> #twotabsearchtextbox
  await page.fill("#twotabsearchtextbox", "dress");

  // Press Enter on input
  await Promise.all([
    await page.press("#twotabsearchtextbox", "Enter"),
    await page.waitForNavigation(),
  ]);

  const linkhref = await page.evaluate(async () => {
    let element = document.getElementsByClassName(
      "a-link-normal a-text-normal"
    )[0];
    let linkhref = element.getAttribute("href");
    return linkhref;
  });

  // combine amazon url with linkhref
  const amazonurl = "https://www.amazon.in" + linkhref;

  // goto amazonurl
  await page.goto(amazonurl);

  await page
    .locator("#native_dropdown_selected_size_name")
    .selectOption({ index: 2 });

  // get inner html of locator .priceToPay .a-price-whole
  const price = await page.locator(".priceToPay .a-price-whole").innerText();

  // choose a option from 1 to 5 randomly
  const randomFrom1To5 = Math.floor(Math.random() * 5) + 1;

  // Fill "2" on <select> #quantity
  await page.selectOption("#quantity", `${randomFrom1To5}`);

  // expected price
  const totalPriceExpected = parseInt(price) * randomFrom1To5;

  // Click on <input> #add-to-cart-button
  await Promise.all([
    page.click("#add-to-cart-button"),
    page.waitForNavigation(),
  ]);

  let totalPriceStr = await page.evaluate(async () => {
    let totalPriceStr =
      document.getElementsByClassName("a-price-whole")[0].innerHTML;
    return totalPriceStr;
  });

  totalPriceStr = totalPriceStr.slice(0, -2).trim();

  // remove comma from total price
  totalPriceStr = totalPriceStr.replace(/,/g, "");

  // convert string to number`
  let totalPriceActual = parseInt(totalPriceStr);

  // compare expected price and actual price
  expect(totalPriceExpected).toBe(totalPriceActual);

  await Promise.all([
    page.click('[name="proceedToRetailCheckout"]'),
    page.waitForNavigation(),
  ]);

  await context.close();
  await browser.close();
});
