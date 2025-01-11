const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');

// hasDigit
let hasDigit = null;
let hasDigitModule = null;
try {
    hasDigitModule = require('./hasDigit');
    hasDigit = hasDigitModule.hasDigit;
} catch (error) { }

// isValidPhoneNumber
let isValidPhoneNumber = null;
let isValidPhoneNumberModule = null;
try {
    isValidPhoneNumberModule = require('./isValidPhoneNumber');
    isValidPhoneNumber = isValidPhoneNumberModule.isValidPhoneNumber;
} catch (error) { }

// isValidEmail
let isValidEmail = null;
let isValidEmailModule = null;
try {
    isValidEmailModule = require('./isValidEmail');
    isValidEmail = isValidEmailModule.isValidEmail;
} catch (error) { }

// filterArrayContainsString
let filterArrayContainsString = null;
let filterArrayContainsStringModule = null;
try {
    filterArrayContainsStringModule = require('./filterArrayContainsString');
    filterArrayContainsString = filterArrayContainsStringModule.filterArrayContainsString;
} catch (error) { }

// replaceASymbol
let replaceASymbol = null;
let replaceASymbolModule = null;
try {
    replaceASymbolModule = require('./replaceASymbol');
    replaceASymbol = replaceASymbolModule.replaceASymbol;
} catch (error) { }

describe('JS Regular Expressions', () => { 

    describe('hasDigit', () => {
        it('should create hasDigit.js file', () => {
            expect(hasDigitModule).not.toBeNull();
        });

        it('should return false if string does not contain digit', () => {
            expect(hasDigit('SomeName')).toBe(false);
        });

        it('should return true if string contains digit', () => {
            expect(hasDigit('Some2Name')).toBe(true);
            expect(hasDigit('222')).toBe(true);
        });

        it('should return false if parameter is null', () => {
            expect(hasDigit(null)).toBe(false);
        });

        it('should return false if parameter is undefined', () => {
            expect(hasDigit(undefined)).toBe(false);
        });
    });

    describe('isValidPhoneNumber', () => {
        it('should create isValidPhoneNumber.js file', () => {
            expect(isValidPhoneNumberModule).not.toBeNull();
        });

        it('should return true if string strickly corresponds to `555-555-5555`', () => {
            expect(isValidPhoneNumber('555-555-5555')).toBe(true);
        });

        it('should return false if string does not correspond to `555-555-5555`', () => {
            expect(isValidPhoneNumber('222')).toBe(false);
            expect(isValidPhoneNumber('222 222 2222')).toBe(false);
            expect(isValidPhoneNumber('222- 222- 2222')).toBe(false);
            expect(isValidPhoneNumber('222.222.2222')).toBe(false);
            expect(isValidPhoneNumber('22-22-222222')).toBe(false);
            expect(isValidPhoneNumber('2222222222')).toBe(false);
            expect(isValidPhoneNumber('2222-222-222')).toBe(false);
            expect(isValidPhoneNumber('aaa-aaa-aaaa')).toBe(false);
        });

        it('should return false if parameter is null', () => {
            expect(isValidPhoneNumber(null)).toBe(false);
        });

        it('should return false if parameter is undefined', () => {
            expect(isValidPhoneNumber(undefined)).toBe(false);
        });
    });    

    describe('isValidEmail', () => {
        it('should create isValidEmail.js file', () => {
            expect(isValidEmailModule).not.toBeNull();
        });

        it('should return true if string is valid email', () => {
            expect(isValidEmail('mysite@gmail.com')).toBe(true);
            expect(isValidEmail('user.name@itpu.uz')).toBe(true);
            expect(isValidEmail('user-name@itpu.uz')).toBe(true);
            expect(isValidEmail('user_name@itpu.uz')).toBe(true);
            expect(isValidEmail('user@you.me.net')).toBe(true);
        });

        it('should return false if string is not valid email', () => {
            expect(isValidEmail('user')).toBe(false);
            expect(isValidEmail('user@com')).toBe(false);
            expect(isValidEmail('gmail.com')).toBe(false);
            expect(isValidEmail('user@gmail.b')).toBe(false);
            expect(isValidEmail('user@.gmail.com')).toBe(false);
            expect(isValidEmail('.user@gmail.com')).toBe(false);
            expect(isValidEmail('user..name@itpu.uz')).toBe(false);
            expect(isValidEmail('user(name)@itpu.uz')).toBe(false);
        });

        it('should return false if parameter is null', () => {
            expect(isValidEmail(null)).toBe(false);
        });

        it('should return false if parameter is undefined', () => {
            expect(isValidEmail(undefined)).toBe(false);
        });
    });
    
    describe('filterArrayContainsString', () => {
        let inputArray = ['apple', 'pineapple', 'orange', 'apricot', 'lemon'];
        let apResultArray = ['apple', 'pineapple', 'apricot'];
        let nullResultArray = ['apple', 'pineapple', 'orange', 'apricot', 'lemon'];

        it('should create filterArrayContainsString.js file', () => {
            expect(filterArrayContainsStringModule).not.toBeNull();
        });

        it('should returnarray filtered from input `array`', () => {
            expect(filterArrayContainsString(inputArray, 'ap').sort()).toEqual(apResultArray.sort());            
        });

        it('should return array equal to input `array` is str is null', () => {
            expect(filterArrayContainsString(inputArray).sort()).toEqual(nullResultArray.sort());            
        });

        it('should  return empty array, if input `array` items do not contain `str` as a substring', () => {
            expect(filterArrayContainsString(inputArray, 'apl').length).toBe(0)
        });
    });

    describe('replaceASymbol', () => {
        let inputStringA = 'aba accca zzz wwaww';
        let resultString = '! ! zzz wwaww';
        let inputStringNoA = 'zzz wwaww';
        

        it('should create filterArrayContainsString.js file', () => {
            expect(replaceASymbolModule).not.toBeNull();
        });

        it('should return new string with replaced `a` character with `!` sign in all words starting and ending with the letter `a`', () => {
            expect(replaceASymbol(inputStringA)).toEqual(resultString);            
        });

        it('should  return new string that is equal to input `str` if no words starting and ending with letter `a` found.', () => {
            expect(replaceASymbol(inputStringNoA)).toEqual(inputStringNoA);     
        });
    });
});
