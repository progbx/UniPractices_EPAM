const { ESLint } = require('eslint');
const { resolveFilePath } = require('../test-utils/resolveFilePath');

// Dry
let dryModule = null;
let formatter;
let generateGreetUserMessage;
try {
    dryModule = require('./dry');
    formatter = dryModule.formatter;
    generateGreetUserMessage = dryModule.generateGreetUserMessage;
} catch (error) { }

//KISS
let kissModule = null;
let calculateDiscountedPrice;
try {
    kissModule = require('./kiss');
    calculateDiscountedPrice = kissModule.calculateDiscountedPrice;
} catch (error) { }

//YAGNI
let yagniModule = null;
let searchEmployees = null;
try {
    yagniModule = require('./yagni');
    searchEmployees = yagniModule.searchEmployees;
} catch (error) { }

describe('Code Quality', () => {
    let eslint;
    let filePath;

    let commonConfig;

    beforeEach(() => {
        commonConfig = {
            env: {
                browser: true,
                es2022: true,
            },
            parserOptions: {
                sourceType: 'module',
                allowImportExportEverywhere: true,
            },
            plugins: ['sonarjs'],
        };
    });

    describe('DRY', () => {
        beforeEach(() => {
            filePath = resolveFilePath('dry.js');
        });

        describe('formatter', () => {
            it('format function should not duplicate one another', async () => {
                const ruleId = 'sonarjs/no-identical-functions';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: 'error' }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
            });
    
            it('should create one function without duplication', async () => {
                expect(formatter(100, '%')).toBe('100%');
            });
        });

        describe('generateGreetUserMessage', () => {
            it('should remove if-else duplication', async () => {
                const ruleId = 'no-dupe-else-if';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: 'error' }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                const name = 'Bob';
                const loggedInUser = { age: 33, isLoggedIn: true, name };
                const strangerUser = { isLoggedIn: false, age: 44 };
    
                expect(message).toBe(undefined);
                expect(generateGreetUserMessage()).toBeNull();
                expect(generateGreetUserMessage(loggedInUser))
                    .toBe(`Hello, ${name}! Thank you, for your purchase!`);
                expect(generateGreetUserMessage(strangerUser))
                    .toBe('Thank you, stranger!')
            });

            it('should remove redundant else statements', async () => {
                const ruleId = 'no-else-return';
                const baseConfig = mergeConfigWithCommon({
                    rules: { 
                        [ruleId]: 'error',
                    }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const messages = lintResult[0].messages;
                const message = messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
                expect(messages.length).toBe(0);
            });

            it('should remove unused variables and unreachable return', async () => {
                const ruleId1 = 'no-else-return';
                const ruleId2 = 'no-unreachable';
                const baseConfig = mergeConfigWithCommon({
                    rules: { 
                        [ruleId1]: 'error',
                        [ruleId2]: 'error',
                    }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const messages = lintResult[0].messages;
                const message1 = messages.find((item) => item.ruleId === ruleId1);
                const message2 = messages.find((item) => item.ruleId === ruleId2);
    
                expect(message1).toBe(undefined);
                expect(message2).toBe(undefined);
            });
        }); 
    });

    describe('KISS', () => {
        beforeEach(() => {
            filePath = resolveFilePath('kiss.js');
        });

        describe('calculateDiscountedPrice', () => {
            it('should require one parameter', async () => {
                const ruleId = 'max-params';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: ['error', 1] }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
            });
    
            it('should work with object with correct properties', async () => {
                const result = calculateDiscountedPrice({
                    basePrice: 100,
                    discountPercentage: 20,
                    taxPercentage: 8.25,
                    shippingCost: 5,
                    couponCode: 'ABCDE1'
                });
    
                expect(result).toBe('82.44');
            });
    
            it('variables should have a consistent naming', async () => {
                const ruleId = 'camelcase';
                const baseConfig = mergeConfigWithCommon({
                    rules: {
                        [ruleId]: 'error'
                    }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
            });
    
            it('coupon code should be checked in a separate function', async () => {
                const ruleId = 'complexity';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: ['error', 2] }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
            });
        });
    });

    describe('YAGNI', () => {
        let employees;

        beforeEach(() => {
            employees = [
                {
                    name: 'Employee1',
                    jobTitle: 'jobTitle1',
                    department: 'department1'
                },
                {
                    name: 'Employee2',
                    jobTitle: 'jobTitle2',
                    department: 'department2'
                },
                {
                    name: 'Employee3',
                    jobTitle: 'jobTitle3',
                    department: 'department3'
                },
            ];

            filePath = resolveFilePath('yagni.js');
        });

        describe('searchEmployees', () => {
            it('should not check for "search" parameter type', async () => {
                const ruleId = 'no-param-reassign';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: ["error", { "props": false }] }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                expect(message).toBe(undefined);
                expect(searchEmployees.bind(null, [], null)).not.toThrowError('search must be string');
            });
    
            it('should not search for jobTitle and department', async () => {
                const ruleId = 'complexity';
                const baseConfig = mergeConfigWithCommon({
                    rules: { [ruleId]: ['error', 1] }
                });
                eslint = new ESLint({ baseConfig });
    
                const lintResult = await eslint.lintFiles(filePath);
                const message = lintResult[0].messages.find((item) => item.ruleId === ruleId);
    
                const nameSearchResult = searchEmployees(employees, 'Employee3');
                const jobTitleSearchResult = searchEmployees(employees, 'jobTitle1');
                const departmentSearchResult = searchEmployees(employees, 'department2');
    
                const expectedEmployeeSearchResult = [{
                    name: 'Employee3',
                    jobTitle: 'jobTitle3',
                    department: 'department3'
                }];
    
                expect(message).toBe(undefined);
                expect(nameSearchResult).toEqual(expectedEmployeeSearchResult);
                expect(jobTitleSearchResult).toEqual([]);
                expect(departmentSearchResult).toEqual([]);
            });
        });
    });

    function mergeConfigWithCommon(baseConfig) {
        return Object.assign({}, commonConfig, baseConfig);
    }
});
