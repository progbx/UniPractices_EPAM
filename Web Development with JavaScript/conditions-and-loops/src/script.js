function isEvenOrOdd(num) {
    if (num % 2 === 0) {
        return `The number ${num} is even`;
    } else {
        return `The number ${num} is odd`;
    }
}

function rangeSum(a, b) {
    if (a > b) return 0;
    let sum = 0;
    for (let i = a; i <= b; i++) {
        sum += i;
    }
    return sum;
}

function sumExclude(num, n) {
    if (n === 1) return 0;
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        if (i % n !== 0) {
            sum += i;
        }
    }
    return sum;
}

function calcSimple(num1, num2, operator) {
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            return `${num1}+${num2}=${result}`;
        case '-':
            result = num1 - num2;
            return `${num1}-${num2}=${result}`;
        case '*':
            result = num1 * num2;
            return `${num1}*${num2}=${result}`;
        case '/':
            // Handle division by zero
            if (num2 === 0) return 'Division by zero error';
            result = num1 / num2;
            return `${num1}/${num2}=${result}`;
        default:
            return 'invalid operator';
    }
}

function makeRulerStr(length) {
    if (length === 0) return "0";
    let ruler = "0";
    for (let i = 1; i <= length; i++) {
        ruler += "'''''''''";
        ruler += i;
    }
    return ruler;
}