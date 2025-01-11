function addNumber(arr, number) {
    if (typeof number !== 'number' || isNaN(number) || number === 0) {
        return arr;
    }
    if (number > 0) {
        arr.unshift(number);
    } else if (number < 0) {
        arr.push(number);
    }
    return arr;
}

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        if (Number.isNaN(arr1[i]) && Number.isNaN(arr2[i])) {
          continue;
        }
        return false;
      }
    }
    return true;
}

function getNumberOfEven(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number' && arr[i] % 2 === 0) {
            count++;
        }
    }
    return count;
}

function getSubarray(arr, data) {
    const index = arr.indexOf(data);
    if (index === -1) {
        return [];
    }
    return arr.slice(0, index + 1);
}

function getDuplicateValues(arr) {
    const duplicates = [];
    const uniqueElements = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (uniqueElements.has(arr[i]) && !duplicates.includes(arr[i])) {
            duplicates.push(arr[i]);
        } else {
            uniqueElements.add(arr[i]);
        }
    }
    return duplicates;
}

function getMaxNumbers(arr) {
    const maxNumbers = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) {
            maxNumbers.push(Math.max(...arr[i]));
        }
    }
    return maxNumbers;
}