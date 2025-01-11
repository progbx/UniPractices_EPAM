const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { addFileProtocolToElements } = require('../test-utils/addFileProtocolToElements');
const { replaceScriptSrcFilePathInString } = require('../test-utils/replaceScriptSrcFilePathInString');

describe('Conditions and loops', () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    beforeEach(async () => {
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        virtualConsole.on('log', consoleLogListener);
        
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);
        const newHtmlString = replaceScriptSrcFilePathInString(htmlString, ['script.js'], __dirname);

        // Create fake DOM
        dom = new JSDOM(newHtmlString, {
            runScripts: 'dangerously',
            resources: 'usable',
            virtualConsole,
        });
        document = dom.window.document;

        // Replace CSS href with absolute paths
        const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        addFileProtocolToElements(linkElements, 'href', __dirname);
    });
    // 1. isEvenOrOdd
    describe('isEvenOrOdd', () => {
        it('should return the statement that the number is even for even numbers', async () => {
            await waitBrowserLoadEvent(document);

            const isEvenOrOdd = dom.window.isEvenOrOdd;
            expect(isEvenOrOdd(22)).toBe('The number 22 is even');
        });

        it('should return the statement that the number is odd for odd numbers', async () => {
            await waitBrowserLoadEvent(document);

            const isEvenOrOdd = dom.window.isEvenOrOdd;
            expect(isEvenOrOdd(11)).toBe('The number 11 is odd');
        });        
    });
    // 2. rangeSum
    describe('rangeSum', () => {
        it('should return the sum of values with a given range', async () => {
            await waitBrowserLoadEvent(document);

            const rangeSum = dom.window.rangeSum;

            expect(rangeSum(1, 5)).toBe(15);
        });

        it('should return the sum of values with a given range including negative numbers', async () => {
            await waitBrowserLoadEvent(document);

            const rangeSum = dom.window.rangeSum;

            expect(rangeSum(-2, 5)).toBe(12);
        });

        it('should return 0 if the upper limit of the range is less than the lower one', async () => {
            await waitBrowserLoadEvent(document);

            const rangeSum = dom.window.rangeSum;

            expect(rangeSum(5, 1)).toBe(0);
        });

        it('if the range consists of a single number should return this number', async () => {
            await waitBrowserLoadEvent(document);

            const rangeSum = dom.window.rangeSum;

            expect(rangeSum(5, 5)).toBe(5);
        });
    });

    // 3. sumExclude
    describe('sumExclude', () => {
        it('should return the sum of values with a given range excluding every nth number', async () => {
            await waitBrowserLoadEvent(document);

            const sumExclude = dom.window.sumExclude;

            expect(sumExclude(5, 2)).toBe(9);
        });

        it('should return 0 for n=1 i.e. when each number should be excluded', async () => {
            await waitBrowserLoadEvent(document);

            const sumExclude = dom.window.sumExclude;

            expect(sumExclude(5, 1)).toBe(0);
        });
       
        it('should return the sum of all numbers in a range if n is greater  than upper limit of that range', async () => {
            await waitBrowserLoadEvent(document);

            const sumExclude = dom.window.sumExclude;

            expect(sumExclude(5, 6)).toBe(15);
        });
       
    });

    // 4. calcSimple
    describe('calcSimple', () => {
        it('should return the statement that the num1+num2=their sum for "+" operator', async () => {
            await waitBrowserLoadEvent(document);

            const calcSimple = dom.window.calcSimple;
            expect(calcSimple(3, 5, '+')).toBe('3+5=8');
        });
           
        it('should return the statement that the num1-num2=their difference for "-" operator', async () => {
            await waitBrowserLoadEvent(document);

            const calcSimple = dom.window.calcSimple;
            expect(calcSimple(12, 2, '-')).toBe('12-2=10');
        });
   
        it('should return the statement that the num1*num2=their product for "*" operator', async () => {
            await waitBrowserLoadEvent(document);

            const calcSimple = dom.window.calcSimple;
            expect(calcSimple(4, 2, '*')).toBe('4*2=8');
        });

        it('should return the statement that the num1/num2=their quotient for "/" operator', async () => {
            await waitBrowserLoadEvent(document);

            const calcSimple = dom.window.calcSimple;
            expect(calcSimple(15, 5, '/')).toBe('15/5=3');
        });

        it('should return the statement "invalid operator" if the operator is not equal to "+", "-", "*", or "/"', async () => {
            await waitBrowserLoadEvent(document);

            const calcSimple = dom.window.calcSimple;
            expect(calcSimple(2, 2, '#')).toBe('invalid operator');
        });          
    });

    // 5. makeRulerStr
    describe('makeRulerStr', () => {
        it('should return a string that represents a ruler whose length  is determined by the "length" parameter', async () => {
            await waitBrowserLoadEvent(document);

            const makeRulerStr = dom.window.makeRulerStr;
            expect(makeRulerStr(3)).toBe("0'''''''''1'''''''''2'''''''''3");
        });

        it('should return "0" for length equal to 0', async () => {
            await waitBrowserLoadEvent(document);

            const makeRulerStr = dom.window.makeRulerStr;
            expect(makeRulerStr(0)).toBe("0");
        });    
    });
});
