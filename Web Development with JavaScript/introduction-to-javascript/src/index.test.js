const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { replaceScriptSrcFilePathInString } = require('../test-utils/replaceScriptSrcFilePathInString');

describe('Introduction to JavaScript', () => {
    let htmlString;
    let scriptString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    describe('Task 1', () => {
        let scriptFileName;

        beforeEach(async () => {
            scriptFileName = 'task-1.js';

            consoleLogListener = jest.fn();
            virtualConsole = new VirtualConsole();
            // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
            virtualConsole.on('log', consoleLogListener);

            const filePath = path.join(__dirname, 'task-1.html');
            htmlString = await readTextFile(filePath);
            const newHtmlString = replaceScriptSrcFilePathInString(htmlString, [scriptFileName], __dirname);

            // Create fake DOM
            dom = new JSDOM(newHtmlString, {
                runScripts: 'dangerously',
                resources: 'usable',
                virtualConsole,
            });
            document = dom.window.document;
        });

        it('script tag with correct src added', async () => {
            await waitBrowserLoadEvent(document);

            let scriptElement = document.querySelector('script[src]');
            let src = scriptElement?.src || '';

            let parsedSrc = path.parse(src);
            const hasCorrectBase = parsedSrc.base === scriptFileName;
            const srcFolderNameExists = /src$/gi.test(parsedSrc.dir);

            expect(hasCorrectBase).toBe(true);
            expect(srcFolderNameExists).toBe(true);
        });

        it('should include only two script elements', async () => {
            await waitBrowserLoadEvent(document);

            let scripts = document.querySelectorAll('script');

            expect(scripts.length).toBe(2);
        });

        it('should add expected code to a script tag', async () => {
            await waitBrowserLoadEvent(document);

            expect(consoleLogListener).toHaveBeenCalledWith('Hello, world!');
        });
    });

    describe('Task 2', () => {
        let scriptFileName;

        beforeEach(async () => {
            scriptFileName = 'task-2.js';

            consoleLogListener = jest.fn();
            virtualConsole = new VirtualConsole();
            // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
            virtualConsole.on('log', consoleLogListener);

            const filePath = path.join(__dirname, 'task-2.html');
            const scriptFilePath = path.join(__dirname, scriptFileName);
            htmlString = await readTextFile(filePath);
            scriptString = await readTextFile(scriptFilePath);
            const newHtmlString = replaceScriptSrcFilePathInString(htmlString, [scriptFileName], __dirname);

            // Create fake DOM
            dom = new JSDOM(newHtmlString, {
                runScripts: 'dangerously',
                resources: 'usable',
                virtualConsole,
            });
            document = dom.window.document;
        });

        it('should add "use strict" to a file', () => {
            expect(hasUseStrict(scriptString)).toBe(true);
        });

        it('should define numVar variable', async () => {
            await waitBrowserLoadEvent(document);

            expect(typeof (dom.window.numVar) === 'number').toBe(true);
            expect(isFinite(dom.window.numVar)).toBe(true);
        });

        it('should define numLet variable', async () => {
            await waitBrowserLoadEvent(document);

            const numLet = dom.window.eval('numLet');
            let reassignedWithoutError = true;

            try {
                dom.window.eval('"use strict;"');
                dom.window.eval('numLet = 100;');
            } catch (error) {
                reassignedWithoutError = false;
            }

            expect(typeof (numLet) === 'number').toBe(true);
            expect(isFinite(numLet)).toBe(true);
            expect(reassignedWithoutError).toBe(true);
        });

        it('should define numConst variable', async () => {
            await waitBrowserLoadEvent(document);

            const numConst = dom.window.eval('numConst');
            let reassignedWithError = false;
            
            try {
                dom.window.eval('"use strict;"');
                dom.window.eval('numConst = 100;');
            } catch (error) {
                reassignedWithError = true;
            }
            
            expect(typeof (numConst) === 'number').toBe(true);
            expect(isFinite(numConst)).toBe(true);
            expect(reassignedWithError).toBe(true);
        });

        it('should output to a console a sum of variables', async () => {
            await waitBrowserLoadEvent(document);

            const numVar = dom.window.numVar;
            const numLet = dom.window.eval('numLet');
            const numConst = dom.window.eval('numConst');

            expect(consoleLogListener).toHaveBeenCalledWith(numVar + numLet + numConst);
        });

        it('should define str variable', async () => {
            await waitBrowserLoadEvent(document);

            const str = dom.window.eval('str');
            let reassignedWithoutError = true;
            
            try {
                dom.window.eval('"use strict;"');
                dom.window.eval('str = \'new\'');
            } catch (error) {
                if (error instanceof TypeError) {
                    reassignedWithoutError = false;
                }
            }
            
            expect(str).toBe('Boeing ');
            expect(reassignedWithoutError).toBe(true);
        });

        it('should define num variable', async () => {
            await waitBrowserLoadEvent(document);

            const num = dom.window.eval('num');
            let reassignedWithoutError = true;

            try {
                dom.window.eval('"use strict;"');
                dom.window.eval('num = 748');
            } catch (error) {
                reassignedWithoutError = false;
            }

            expect(num).toBe(747);
            expect(reassignedWithoutError).toBe(true);
        });

    });

    describe('Task 3', () => {
        let scriptFileName;

        let promptMock;
        let alertMock;

        beforeEach(async () => {
            promptMock = jest.fn();
            alertMock = jest.fn();
            scriptFileName = 'task-3.js';

            consoleLogListener = jest.fn();
            virtualConsole = new VirtualConsole();
            // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
            virtualConsole.on('log', consoleLogListener);

            const filePath = path.join(__dirname, 'task-3.html');
            const scriptFilePath = path.join(__dirname, scriptFileName);
            htmlString = await readTextFile(filePath);
            scriptString = await readTextFile(scriptFilePath);
            const newHtmlString = replaceScriptSrcFilePathInString(htmlString, [scriptFileName], __dirname);

            // Create fake DOM
            dom = new JSDOM(newHtmlString, {
                runScripts: 'dangerously',
                resources: 'usable',
                virtualConsole,
            });
            document = dom.window.document;

            dom.window.prompt = promptMock;
            dom.window.alert = alertMock;
        });

        it('should add "use script" to a file', () => {
            expect(hasUseStrict(scriptString)).toBe(true);
        });

        it('should request 2 numbers from user', async () => {
            await waitBrowserLoadEvent(document);

            expect(promptMock).toHaveBeenCalledTimes(2);
        });

        it('should output the result of their product using alert', async () => {
            const firstNum = '124';
            const secondNum = '238';
            let count = 1;

            promptMock.mockImplementation(() => {
                if (count === 1) {
                    count++;

                    return firstNum;
                }

                return secondNum;
            });

            await waitBrowserLoadEvent(document);

            expect(alertMock).toHaveBeenCalledWith(124 * 238);
        });
    });

    describe('Task 4', () => {
        let scriptFileName;

        let promptMock;

        beforeEach(async () => {
            promptMock = jest.fn();
            scriptFileName = 'task-4.js';

            consoleLogListener = jest.fn();
            virtualConsole = new VirtualConsole();
            // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
            virtualConsole.on('log', consoleLogListener);

            const filePath = path.join(__dirname, 'task-4.html');
            const scriptFilePath = path.join(__dirname, scriptFileName);
            htmlString = await readTextFile(filePath);
            scriptString = await readTextFile(scriptFilePath);
            const newHtmlString = replaceScriptSrcFilePathInString(htmlString, [scriptFileName], __dirname);

            // Create fake DOM
            dom = new JSDOM(newHtmlString, {
                runScripts: 'dangerously',
                resources: 'usable',
                virtualConsole,
            });
            document = dom.window.document;

            dom.window.prompt = promptMock;

            promptMock.mockReturnValue('88');
        });

        it('should add "use script" to a file', () => {
            expect(hasUseStrict(scriptString)).toBe(true);
        });

        it('should define toSquare function', async () => {
            await waitBrowserLoadEvent(document);

            const toSquare = dom.window.eval('toSquare');

            expect(typeof (toSquare) === 'function').toBe(true);
        });

        it('toSquare function should request a number from user', async () => {
            await waitBrowserLoadEvent(document);

            expect(promptMock).toHaveBeenCalledTimes(1);
        });

        it('toSquare function should return a square of a number', async () => {
            await waitBrowserLoadEvent(document);

            const toSquare = dom.window.eval('toSquare');

            expect(toSquare()).toBe(7744);
        });

        it('the returned value from toSquare function should be put to result variable', async () => {
            await waitBrowserLoadEvent(document);

            const result = dom.window.eval('result');

            expect(result).toBe(7744);
        });

        it('the returned value from should be output to console', async () => {
            await waitBrowserLoadEvent(document);

            expect(consoleLogListener).toHaveBeenCalledWith(7744);
        });

    });

    describe('Task 5', () => {
        let scriptFileName;
        let scriptString;

        beforeEach(async () => {
            scriptFileName = 'task-5.js';

            consoleLogListener = jest.fn();
            virtualConsole = new VirtualConsole();
            // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
            virtualConsole.on('log', consoleLogListener);

            const filePath = path.join(__dirname, 'task-5.html');
            const scriptFilePath = path.join(__dirname, scriptFileName);
            htmlString = await readTextFile(filePath);
            htmlString = await readTextFile(filePath);
            scriptString = await readTextFile(scriptFilePath);
            const newHtmlString = replaceScriptSrcFilePathInString(htmlString, [scriptFileName], __dirname);

            // Create fake DOM
            dom = new JSDOM(newHtmlString, {
                runScripts: 'dangerously',
                resources: 'usable',
                virtualConsole,
            });
            document = dom.window.document;
        });

        it('sum function should return correct value', async () => {
            await waitBrowserLoadEvent(document);

            const sum = dom.window.eval('sum');

            expect(sum(7, 9)).toBe(16);
        });

        it('the result value should be outputed to console', async () => {
            await waitBrowserLoadEvent(document);

            expect(consoleLogListener).toHaveBeenCalledWith(12);
        });

        it('should comment the rest', async () => {
            await waitBrowserLoadEvent(document);

            const allCommentsString = getAllCommentsFromString(scriptString);

            expect(/return +a +- +b/gi.test(allCommentsString)).toBe(true);
            expect(/return +a +\* +b/gi.test(allCommentsString)).toBe(true);
        });
    });

    function hasUseStrict(scriptString) {
        return /^[`"']use strict["'`]/gi.test(scriptString.trim());
    }

    function getAllCommentsFromString(str) {
        return [...str.matchAll(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm)]
            .map(([item]) => {
                return item;
            }).join('');
    };
});
