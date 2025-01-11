require('jest-fetch-mock').enableMocks()
fetchMock.dontMock();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Counter</title>
        </head>
        <body>
            <div id="output"></div>
        </body>
      </html>
    `);
global.window = dom.window;
global.document = window.document;

jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({}),
});

