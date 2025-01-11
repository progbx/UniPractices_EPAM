function isValid(name) {
    return !name.includes(' ');
}

function countChars(str) {
    return str.trim().length;
}

function sum(a, b) {
    return Number(a) + Number(b);
}

function formatMoney(amount) {
    return '$' + amount.toFixed(2);
}

function convertToBoolean(value) {
    return Boolean(value);
}