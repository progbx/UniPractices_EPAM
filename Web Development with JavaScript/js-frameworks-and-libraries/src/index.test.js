const path = require('path');
const _ = require('lodash');
const dateFns = require('date-fns');

global._ = _;
global.dateFns = dateFns;
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');

// findLongestWord
let findLongestWord = null;
let findLongestWordModule = null;
try {
    findLongestWordModule = require('./findLongestWord');
    findLongestWord = findLongestWordModule.findLongestWord;
} catch (error) { }

// getAverageAge
let getAverageAge = null;
let getAverageAgeModule = null;
try {
    getAverageAgeModule = require('./getAverageAge');
    getAverageAge = getAverageAgeModule.getAverageAge;
} catch (error) { }

// getTimeBetween
let getTimeBetween = null;
let getTimeBetweenModule = null;
try {
    getTimeBetweenModule = require('./getTimeBetween');
    getTimeBetween = getTimeBetweenModule.getTimeBetween;
} catch (error) { }

// customIncludes
let customIncludes = null;
let customIncludesModule = null;
try {
    customIncludesModule = require('./customIncludes');
    customIncludes = customIncludesModule.customIncludes;
} catch (error) { }

describe('JS frameworks and libraries', () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    let url;

    beforeEach(async () => {
        jest.resetAllMocks();

        url = 'https://1.1.1.1/'
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
        virtualConsole.on('log', consoleLogListener);

        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            runScripts: 'dangerously',
            resources: 'usable',
            url,
            virtualConsole,
        });
        document = dom.window.document;
    });

    // 1. adding libraries to HTML
    describe('index.html', () => {

        it('index.html should have script that adds Lodash library to the file', () => {
            const script = document.querySelector(`script[src*="lodash"]`);
            expect(script).not.toBeNull();
        });

        it('index.html should have script that adds Date-fns library to the file', () => {
            const script = document.querySelector(`script[src*="date-fns"]`);
            expect(script).not.toBeNull();
        });
    });

    // 2. findLongestWord
    describe('findLongestWord.js', () => {

        it('should create findLongestWord.js file', () => {
            expect(findLongestWordModule).not.toBeNull();
        });

        it('should contain at least one Lodash method', () => {
            const fnString = findLongestWord.toString();
            const lodashMethods = Object.keys(_);
            const usesLodash = _.some(lodashMethods, (method) => _.includes(fnString, method));
            expect(usesLodash).toBe(true);
        });

        it('should return the word with the maximum number of letters', async () => {
            await waitBrowserLoadEvent(document);

            const phrase_1 = 'JavaScript is a programming language';
            const phrase_2 = 'The Lodash library is exported as Node.js modules.';

            expect(findLongestWord(phrase_1)).toBe('programming');
            expect(findLongestWord(phrase_2)).toBe('exported');
        });
    });

    // 3. getAverageAge
    describe('getAverageAge.js', () => {

        it('should create getAverageAge.js file', () => {
            expect(getAverageAgeModule).not.toBeNull();
        });

        it('should contain at least one Lodash method', () => {
            const fnString = getAverageAge.toString();
            const lodashMethods = Object.keys(_);
            const usesLodash = _.some(lodashMethods, (method) => _.includes(fnString, method));
            expect(usesLodash).toBe(true);
        });

        it('should return the average age of users', async () => {
            await waitBrowserLoadEvent(document);

            const users = [
                { name: 'John', age: 30 },
                { name: 'Mike', age: 28 },
                { name: 'Jack', age: 29 }
            ];

            expect(getAverageAge(users)).toBe(29);

        });

        it('shouldn\'t include dublicates upon calculation', async () => {
            await waitBrowserLoadEvent(document);

            const newUsers = [
                { name: 'Jane', age: 20 },
                { name: 'Ann', age: 24 },
                { name: 'Mary', age: 28 },
                { name: 'Jane', age: 20 },
            ];

            expect(getAverageAge(newUsers)).toBe(24);

        });
    });

    // 4. getTimeBetween
    describe('getTimeBetween.js', () => {

        it('should create getTimeBetween.js file', () => {
            expect(getTimeBetweenModule).not.toBeNull();
        });

        it('should contain all necessary date-fns methods', () => {
            const expectedMethods = [
                'dateFns.differenceInDays',
                'dateFns.differenceInHours',
                'dateFns.differenceInMinutes'
            ];
            expectedMethods.forEach((method) => {
                expect(getTimeBetween.toString()).toEqual(expect.stringContaining(method));
            })
        });

        it('should return the difference between 2 dates in days', async () => {
            await waitBrowserLoadEvent(document);

            const date_1 = new Date(2023, 3, 28, 12, 0, 0);
            const date_2 = new Date(2023, 4, 7, 14, 30, 0);

            expect(getTimeBetween(date_1, date_2, "days")).toBe(9);
        });

        it('should return the difference between 2 dates in hours', async () => {
            await waitBrowserLoadEvent(document);

            const date_1 = new Date(2023, 3, 28, 12, 0, 0);
            const date_2 = new Date(2023, 4, 7, 14, 30, 0);

            expect(getTimeBetween(date_1, date_2, "hours")).toBe(218);
        });

        it('should return the difference between 2 dates in minutes', async () => {
            await waitBrowserLoadEvent(document);

            const date_1 = new Date(2023, 3, 28, 12, 0, 0);
            const date_2 = new Date(2023, 4, 7, 14, 30, 0);

            expect(getTimeBetween(date_1, date_2, "minutes")).toBe(13110);
        });

        it('should return the message that the unit is invalid', async () => {
            await waitBrowserLoadEvent(document);

            const date_1 = new Date(2023, 3, 28, 12, 0, 0);
            const date_2 = new Date(2023, 4, 7, 14, 30, 0);

            expect(getTimeBetween(date_1, date_2, "seconds")).toBe("Invalid unit specified. Must be 'days', 'hours', or 'minutes'");
        });

    });

    // 5. customIncludes
    describe('customIncludes.js', () => {

        it('should create customIncludes.js file', () => {
            expect(customIncludesModule).not.toBeNull();
        });

        it('shouldn\'t contain any Array.prototype methods with an exception of .length property', () => {
            const fnString = customIncludes.toString();
            const arrayMethods = Object.getOwnPropertyNames(Array.prototype);
            const foundMethods = arrayMethods.filter((method) => fnString.includes(method));
            const isOnlyLength = foundMethods.length === (fnString.includes('.length') ? 1 : 0)
            expect(isOnlyLength).toBe(true);
        });

        it('should return true if the value is in array', async () => {
            await waitBrowserLoadEvent(document);

            const arr = [1, 2, 3, 4, 5];

            expect(customIncludes(arr, 1)).toBe(true);
        });

        it('should return false if the value does not present in array', async () => {
            await waitBrowserLoadEvent(document);

            const arr = [1, 2, 3, 4, 5];

            expect(customIncludes(arr, 6)).toBe(false);
        });

        it('should return false if the value is in array but search index (3d parameter of the function) exceed the index for this value', async () => {
            await waitBrowserLoadEvent(document);

            const arr = [1, 2, 3, 4, 5];

            expect(customIncludes(arr, 2, 2)).toBe(false);
        });
    });
});
