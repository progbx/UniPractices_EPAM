const { crossSiteScripting, remoteCodeExecution, SQLInjection, safeRequest } = require('./script');

function checkHeaders(expect, header) {
    expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts",
        expect.objectContaining({ headers: expect.objectContaining(header)})
    );
}

describe('Frontend security', () => {
    describe('crossSiteScripting', () => {
        it('should use textContent', () => {
            const userInput = '<p>Test paragraph</p>';

            const textContentSpy = jest.spyOn(document.getElementById('output'), 'textContent', 'set');

            crossSiteScripting(userInput);

            expect(textContentSpy).toHaveBeenCalled();
        });

        it('should NOT use innerHTML', () => {
            const userInput = '<p>Test paragraph</p>';
            document.body.innerHTML = '<div id="output"></div>';

            const innerHTMLSpy = jest.spyOn(document.getElementById('output'), 'innerHTML', 'set');

            crossSiteScripting(userInput);

            expect(innerHTMLSpy).not.toHaveBeenCalled();
        });
    });

    describe('remoteCodeExecution ', () => {
        it('should NOT call eval function', () => {
            const userInput = 'test';
            const evalSpy = jest.spyOn(global, "eval");

            remoteCodeExecution(userInput);

            expect(evalSpy).not.toHaveBeenCalledWith(userInput);
        });

        it('should use function constructor', () => {
            const userInput = 'test';
            const newFunctionSpy = jest.spyOn(global, "Function");

            remoteCodeExecution(userInput);

            expect(newFunctionSpy).toHaveBeenCalled();
        });
    });

    describe('SQLInjection ', () => {
        it('should return null when input is string', () => {
            const userInput = 'test';

            const returnValue = SQLInjection(userInput);

            expect(returnValue).toBe(null);
        });

        it('should return string when input is number', () => {
            const userInput = '1';

            const returnValue = SQLInjection(userInput);

            expect(returnValue).toBe('SELECT * FROM users WHERE id = 1');
        });

        it('should return null when input is empty', () => {
            const userInput = '';

            const returnValue = SQLInjection(userInput);

            expect(returnValue).toBe(null);
        });
    });

    describe('safeRequest', () => {
        beforeEach(async() => {
            await safeRequest();
        });

        it('headers should contain "Content-Type" header with value "application/json"',  () => {
            checkHeaders(expect, {'Content-Type': 'application/json'})
        });

        it('headers should contain "Authorization" header with value "Bearer token"',  () => {
            checkHeaders(expect, {'Authorization': 'Bearer token'})
        });

        it('headers should contain "X-Content-Type-Options" header with value "nosniff"',  () => {
            checkHeaders(expect, {'X-Content-Type-Options': 'nosniff'})
        });

        it('headers should contain "X-Frame-Options" header with value "deny"',  () => {
            checkHeaders(expect, {'X-Frame-Options': 'deny'})
        });

        it('headers should contain "X-XSS-Protection" header with value "1; mode=block"',  () => {
            checkHeaders(expect, {'X-XSS-Protection': '1; mode=block'})
        });

        it('headers should contain "Strict-Transport-Security" header with value "max-age=31536000; includeSubDomains; preload"',  () => {
            checkHeaders(expect, {'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'})
        });
    });
});
