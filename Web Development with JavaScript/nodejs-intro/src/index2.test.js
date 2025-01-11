const { startServer } = require('./server/startServer');

jest.mock('./server/startServer', () => {
    return {
        startServer: jest.fn(),
    };
})

describe('NodeJS Intro 2', () => {
    describe('http server: index.js', () => {
        let server;
        let fakeConsoleLog;
        let realConsoleLog;

        beforeEach(() => {
            server = { listen: jest.fn(), };
            startServer.mockReturnValue(server);
            fakeConsoleLog = jest.fn();
            realConsoleLog = console.log;
            console.log = fakeConsoleLog;
        });
        
        afterEach(() => {
            console.log = realConsoleLog;
        });
        
        it('should start server on 3000 port', () => {
            let isCorrectlyCalled = false;
            server.listen.mockImplementation((port) => {
                if (port === 3000 || port === "3000") {
                    isCorrectlyCalled = true;
                } 
            });
            require('./server/index');

            expect(isCorrectlyCalled).toBe(true);
        });
    });
});