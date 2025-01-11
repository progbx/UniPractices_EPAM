require('jest-fetch-mock').enableMocks()
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
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
        </body>
      </html>
    `);
global.window = dom.window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;

require('../src/script');
