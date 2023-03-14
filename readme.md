# Amazon search page to payment page

## Prerequisite
1. Ensure `node` and `npm` is installed in the system

## Steps to run the test 

1. Clone the repo
2. Run `npm install` in root directory of the repo
3. Run `npx install playwright` if playwright is not there in system
4. Run `npx playwright test` in root directory of the repo
5. Currently headless has been set `false` in `amazon-search-to-payment.spec.ts`. Hence it will run with visualization
6. Run `npx playwright show-report`

## Test description

Test is stored in `amazon-search-to-payment.spec.ts` file.

### What the test does

1. Goes to `amazon.in`
2. searches `dress` in search and clicks enter
3. goes to product listing page
4. from there it gets the first product item link and opens the page 
5. Selects a dress size option and selects and quantity
6. Clicks go to cart and goes to cart page 
7. Clicks proceeds to payments page

### Total price verification through quantity and price

1. In product description page It selects **random quantity each time** and calculates to expected total price through quantity and product price
2. Once it goes to Cart Page it verifies the `expected total price` with `actual total price`