const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const { readTextFile } = require("../test-utils/readTextFile");
const { waitBrowserLoadEvent } = require("../test-utils/waitBrowserEvent");
const {
    addFileProtocolToElements,
} = require("../test-utils/addFileProtocolToElements");
const {
    replaceScriptSrcFilePathInString,
} = require("../test-utils/replaceScriptSrcFilePathInString");

describe("JS Extras", () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    beforeEach(async () => {
        consoleLogListener = jest.fn();
        virtualConsole = new VirtualConsole();
        // You can listen for other console methods as well https://github.com/jsdom/jsdom#virtual-consoles
        virtualConsole.on("log", consoleLogListener);

        const filePath = path.join(__dirname, "index.html");
        htmlString = await readTextFile(filePath);
        const newHtmlString = replaceScriptSrcFilePathInString(
            htmlString,
            ["script.js"],
            __dirname
        );

        // Create fake DOM
        dom = new JSDOM(newHtmlString, {
            runScripts: "dangerously",
            resources: "usable",
            virtualConsole,
        });
        document = dom.window.document;

        // Replace CSS href with absolute paths
        const linkElements = document.querySelectorAll(
            'link[rel="stylesheet"]'
        );
        addFileProtocolToElements(linkElements, "href", __dirname);
    });

    describe("selectionTypes", () => {
        it("should return object { number: [1, 2], string: ['a', 'b'], boolean: [false] } for given input (['a', 1, 2, false, 'b'])", async () => {
            await waitBrowserLoadEvent(document);

            const selectionTypes = dom.window.selectionTypes;
            const arr = ["a", 1, 2, false, "b"];

            const objectTypes = selectionTypes(arr);

            expect(objectTypes).toEqual({
                number: [1, 2],
                string: ["a", "b"],
                boolean: [false],
            });
        });

        it("should return object {object: [{}, null], number: [3]} for given input ([{}, null, 3])", async () => {
            await waitBrowserLoadEvent(document);

            const selectionTypes = dom.window.selectionTypes;
            const arr = [{}, null, 3];

            const objectTypes = selectionTypes(arr);

            expect(objectTypes).toEqual({ object: [{}, null], number: [3] });
        });

        it("should return object {} for given input []", async () => {
            await waitBrowserLoadEvent(document);

            const selectionTypes = dom.window.selectionTypes;
            const arr = [];

            const objectTypes = selectionTypes(arr);

            expect(objectTypes).toEqual({});
        });
    });

    describe("multiply", () => {
        it("should return 48 for given input 2,4,6", async () => {
            await waitBrowserLoadEvent(document);

            const multiply = dom.window.multiply;
            expect(multiply(2)(4)(6)).toBe(48);
        });

        it("should return 54 for given input 3,2,9", async () => {
            await waitBrowserLoadEvent(document);

            const multiply = dom.window.multiply;
            expect(multiply(3)(2)(9)).toBe(54);
        });

        it("should return 1 for given input 1,1,1", async () => {
            await waitBrowserLoadEvent(document);

            const multiply = dom.window.multiply;
            expect(multiply(1)(1)(1)).toBe(1);
        });

        it("should return 0 for given input 3,3,undefined", async () => {
            await waitBrowserLoadEvent(document);

            const multiply = dom.window.multiply;
            expect(multiply(3)(3)(undefined)).toBe(0);
        });
    });

    describe("smartMultiply", () => {
        it("should return 6 for given input 2,3", async () => {
            await waitBrowserLoadEvent(document);

            const smartMultiply = dom.window.smartMultiply;
            expect(smartMultiply(2, 3)).toBe(6);
        });

        it("should return 0 for given input 3,'0'", async () => {
            await waitBrowserLoadEvent(document);

            const smartMultiply = dom.window.smartMultiply;
            expect(smartMultiply(3, "0")).toBe(0);
        });

        it("should return 4 for given input 2 and next input 2", async () => {
            await waitBrowserLoadEvent(document);

            const smartMultiply = dom.window.smartMultiply;
            const doubleMultiply = smartMultiply(2);
            expect(doubleMultiply(2)).toBe(4);
        });
        it("should return 15 for given input 5,undefined and next input 3", async () => {
            await waitBrowserLoadEvent(document);

            const smartMultiply = dom.window.smartMultiply;
            const doubleMultiply = smartMultiply(5, undefined);
            expect(doubleMultiply(3)).toBe(15);
        });
    });

    describe("getNumberOfItems", () => {
        it("should return 4 for given input [['Ball', 5],['Bicycle', 100],['Teddybear', 10],['Kite', 3],['Ball', 3]]", async () => {
            await waitBrowserLoadEvent(document);

            const getNumberOfItems = dom.window.getNumberOfItems;
            const arr = [
                ["Ball", 5],
                ["Bicycle", 100],
                ["Teddybear", 10],
                ["Kite", 3],
                ["Ball", 3],
            ];
            expect(getNumberOfItems(arr)).toBe(4);
        });

        it("should return 3 for given input [['Ball', 5],['Bicycle', 100],['Teddybear', 10],['', 3],['Ball', 3]]", async () => {
            await waitBrowserLoadEvent(document);

            const getNumberOfItems = dom.window.getNumberOfItems;
            const arr = [
                ["Ball", 5],
                ["Bicycle", 100],
                ["Teddybear", 10],
                ["", 3],
                ["Ball", 3],
            ];
            expect(getNumberOfItems(arr)).toBe(3);
        });

        it("should return 0 for given input []", async () => {
            await waitBrowserLoadEvent(document);

            const getNumberOfItems = dom.window.getNumberOfItems;
            const arr = [];
            expect(getNumberOfItems(arr)).toBe(0);
        });
    });

    describe("createStack", () => {
        it("should return 3 for call function pop()", async () => {
            await waitBrowserLoadEvent(document);

            const createStack = dom.window.createStack;
            const stack = createStack();
            stack.push(1);
            stack.push(2);
            stack.push(3);

            expect(stack.pop()).toBe(3);
        });

        it("should return [1,2,3] for call function getStack()", async () => {
            await waitBrowserLoadEvent(document);

            const createStack = dom.window.createStack;
            const stack = createStack();
            stack.push(1);
            stack.push(2);
            stack.push(3);
            const result = stack.getStack();
            expect(result).toEqual([1, 2, 3]);
        });

        it("should return 3 for call function peek()", async () => {
            await waitBrowserLoadEvent(document);

            const createStack = dom.window.createStack;
            const stack = createStack();
            stack.push(1);
            stack.push(2);
            stack.push(3);
            expect(stack.peek()).toBe(3);
        });

        it("should return undefined for property 'items' ", async () => {
            await waitBrowserLoadEvent(document);

            const createStack = dom.window.createStack;
            const stack = createStack();
            stack.push(1);
            stack.push(2);
            stack.push(3);
            expect(stack.items).toBe(undefined);
        });
    });
});
