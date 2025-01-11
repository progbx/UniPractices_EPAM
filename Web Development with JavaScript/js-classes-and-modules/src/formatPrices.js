import { CURRENCY_SYMBOLS } from './constants/CURRENCY_SYMBOLS.js';
import { formatWithCurrency } from './formatWithCurrency.js';

function formatPrices(prices, currency) {
    const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
    return prices.map((price) => {
        return formatWithCurrency(price, currencySymbol);
    });
}
export { formatPrices };