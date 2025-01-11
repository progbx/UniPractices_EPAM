export function replaceASymbol(str) {
    if (str === null || str === undefined) {
        return str;
    }
    return str.replace(/\b[aA][a-zA-Z]*[aA]\b/g, '!');
}