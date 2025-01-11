export function filterArrayContainsString(array, str) {
    if (str === null || str === undefined) {
        return array;
    }
    return array.filter(item => item.includes(str));
}