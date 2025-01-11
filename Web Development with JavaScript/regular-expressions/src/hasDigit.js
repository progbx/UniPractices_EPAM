export function hasDigit(str) {
    if (str === null || str === undefined) {
        return false;
    }
    return /\d/.test(str);
}