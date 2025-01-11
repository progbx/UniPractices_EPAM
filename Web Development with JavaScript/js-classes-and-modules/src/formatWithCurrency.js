function formatWithCurrency(price, currencySymbol) {
    return `${price.toFixed(2)}${currencySymbol}`;
}
export { formatWithCurrency };