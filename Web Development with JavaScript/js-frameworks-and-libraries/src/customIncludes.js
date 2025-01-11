export function customIncludes(arr, value, fromIndex = 0) {
    if (fromIndex < 0) fromIndex = 0;
    let i = fromIndex;
    while (i <= arr.length) {
        if (arr[i] === value) {
            return true;
        }
        i++;
    }
    return false;
}