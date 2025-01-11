function sumSequence(n) {
    if (n === 0) return '0.00';
    
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += 1 / Math.pow(2, i);
    }
    return sum.toFixed(2);
}

function mergeArrays(...arrays) {
    return arrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
}

function isPalindrome(str) {
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
}

function countLetters(str) {
    if (!str) return {};
    
    const count = {};
    for (const char of str.replace(/\s/g, '')) {
        count[char] = (count[char] || 0) + 1;
    }
    
    return count;
}

function divideArrays(arr, size) {
    if (size <= 0) return [];
    if (arr.length <= size) return [arr];
    
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    
    return result;
}

function encrypt(str, n) {
    if (n <= 0) return str;
    
    return str.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const newCharCode = charCode - n < 65 ? 91 - (65 - (charCode - n)) : charCode - n;
        return String.fromCharCode(newCharCode);
    }).join('');
}