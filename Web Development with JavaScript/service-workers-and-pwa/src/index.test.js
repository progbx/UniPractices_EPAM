const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');

// initApp
let initApp = null;
let initAppModule = null;
try {
    initAppModule = require('./app');
    initApp = initAppModule.initApp;
} catch (error) { }

describe('Service Workers and PWA', () => {
    let htmlString;

    let dom;
    let document;

    let virtualConsole;
    let consoleLogListener;

    beforeEach(async () => {
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
            virtualConsole,
        });

        document = dom.window.document;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Web App Manifest', () => {
        let webAppManifest;
        let webAppManifestString;

        beforeEach(async () => {
            const filePath = path.join(__dirname, 'pwa.webmanifest');

            try {
                webAppManifestString = await readTextFile(filePath);
                webAppManifest = JSON.parse(webAppManifestString);
            } catch (error) { }
        });

        it('should create a pwa.webmanifest file', () => {
            expect(typeof webAppManifestString === 'string').toBe(true);
        });

        it('should be an object', () => {
            expect(typeof webAppManifest === 'object').toBe(true);
        });

        it('should add icons array', () => {
            expect(webAppManifest).toEqual(expect.objectContaining({
                "icons": [
                    {
                        "src": "icons/icon-32.png",
                        "sizes": "32x32",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-96.png",
                        "sizes": "96x96",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-128.png",
                        "sizes": "128x128",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-167.png",
                        "sizes": "167x167",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
            }))
        });

        it('should add main properties', () => {
            expect(webAppManifest).toEqual(expect.objectContaining({
                "name": "JS PWA Demo",
                "short_name": "JS PWA",
                "description": "Demo application of PWA and service workers",
                "start_url": "index.html",
                "display": "fullscreen",
                "theme_color": "#136a8a",
                "background_color": "#136a8a"
            }))
        });
    });

    describe('app.js', () => {
        let navigatorMock;
        let serviceWorkerMock;
        let NotificationMock;

        beforeEach(() => {
            serviceWorkerMock = {
                register: jest.fn(),
            };
            navigatorMock = {
                serviceWorker: serviceWorkerMock,
            };
            NotificationMock = jest.fn();
            NotificationMock.requestPermission = jest.fn();

            global.navigator = navigatorMock;
            global.document = document;
            global.Notification = NotificationMock;
        });

        it('should create initAppModule.js file', () => {
            expect(initAppModule).not.toBeNull();
        });

        it('should register as a service worker the "sw.js" file', async () => {
            await waitBrowserLoadEvent(document);

            initApp();

            expect(serviceWorkerMock.register)
                .toHaveBeenCalledWith('sw.js');
        });

        describe('Show Notification', () => {
            beforeEach(() => {
                NotificationMock.requestPermission.mockReturnValue(Promise.resolve());
            });

            it('should request permission for showing notification', async () => {
                await waitBrowserLoadEvent(document);

                initApp();

                const button = document.querySelector('#notification-button');
                const clickEvent = createClickEvent();

                button.dispatchEvent(clickEvent);

                expect(Notification.requestPermission)
                    .toHaveBeenCalled();
            });

            it('should show notification if permission granted', async () => {
                const permissionGrantedPromise = Promise.resolve('granted');
                NotificationMock.requestPermission
                    .mockReturnValue(permissionGrantedPromise);

                await waitBrowserLoadEvent(document);

                initApp();

                const button = document.querySelector('#notification-button');
                const clickEvent = createClickEvent();

                button.dispatchEvent(clickEvent);

                await permissionGrantedPromise;

                const title = 'Hello, there!';
                const options = {
                    body: 'I can send you notifications even from outer space!',
                    icon: 'images/rocket.jpg',
                };

                expect(Notification)
                    .toHaveBeenCalledWith(title, options);
            });
        });

        function createClickEvent() {
            return new dom.window.MouseEvent('click', {
                cancelable: true,
                bubbles: true,
            });
        }
    });

    describe('sw.js', () => {
        let selfMock;
        let installEventListener;
        let fetchEventListener;
        let cachesMock;
        let cacheMock;

        let installEvent;
        let fetchEvent;

        let waitUntilPromise;
        let respondWithPromise;
        let cachesOpenPromise;
        let cacheAddAllPromise;

        beforeEach(() => {
            selfMock = {};
            selfMock.addEventListener = (eventName, eventListener) => {
                if (eventName === 'install') {
                    installEventListener = eventListener;
                }

                if (eventName === 'fetch') {
                    fetchEventListener = eventListener;
                }
            };

            cachesMock = {
                open: jest.fn(),
                match: jest.fn(),
            };

            cacheMock = {
                addAll: jest.fn(),
                put: jest.fn(),
            };

            installEvent = {
                waitUntil: jest.fn(),
            };

            fetchEvent = {
                request: {
                    url: '',
                },

                respondWith: jest.fn(),
            };

            installEvent.waitUntil.mockImplementation((promise) => {
                waitUntilPromise = promise;
            });

            fetchEvent.respondWith.mockImplementation((promise) => {
                respondWithPromise = promise;
            });

            cachesOpenPromise = Promise.resolve(cacheMock);
            cacheAddAllPromise = Promise.resolve();

            cachesMock.open.mockReturnValue(cachesOpenPromise);
            cacheMock.addAll.mockReturnValue(cacheAddAllPromise);

            global.self = selfMock;
            global.caches = cachesMock;

            require('./sw.js');
        });

        afterEach(() => {
            waitUntilPromise = undefined;
            respondWithPromise = undefined;
        });

        describe('install', () => {
            it('should add event listener', async () => {
                expect(installEventListener).toBeDefined();
            });

            it('should request waitUntil install finishes', async () => {
                installEventListener(installEvent);

                expect(waitUntilPromise instanceof Promise).toBe(true);
            });

            it('should open caches with a correct name', async () => {
                installEventListener(installEvent);

                await waitUntilPromise;

                expect(cachesMock.open)
                    .toHaveBeenCalledWith('pwa-demo-app-v1');
            });

            it('should add all files to cache', async () => {
                installEventListener(installEvent);

                await waitUntilPromise;
                await cachesOpenPromise;

                const expectedCachedFile = [
                    'index.html',
                    'app.js',
                    'images/astronaut-crop1.jpg',
                    'images/astronaut-crop2.jpg',
                    'images/astronaut.jpg',
                    'styles/style.css',
                    'styles/mobile.css',
                    'icons/favicon.ico',
                    'icons/icon-32.png',
                    'icons/icon-64.png',
                    'icons/icon-96.png',
                    'icons/icon-128.png',
                    'icons/icon-167.png',
                    'icons/icon-192.png',
                    'icons/icon-256.png',
                    'icons/icon-512.png',
                ];

                expect(cacheMock.addAll)
                    .toHaveBeenCalledWith(expectedCachedFile);
            });
        });

        describe('fetch', () => {
            let fetchMock;
            let fetchResponseMock;

            beforeEach(() => {
                fetchResponseMock = {
                    clone: jest.fn(),
                };

                fetchMock = jest.fn();
                fetchMock.mockReturnValue(Promise.resolve(fetchResponseMock));

                global.fetch = fetchMock;
            });

            it('should add event listener', async () => {
                expect(fetchEventListener).toBeDefined();
            });

            describe('when it is a http request', () => {
                beforeEach(() => {
                    fetchEvent.request.url = 'http://dsdsds';
                });

                it('should attempt to respond with', async () => {
                    fetchEventListener(fetchEvent);
    
                    expect(respondWithPromise instanceof Promise).toBe(true);
                });

                it('should search for matching cache data', async () => {
                    fetchEventListener(fetchEvent);
    
                    expect(cachesMock.match).toHaveBeenCalledWith(fetchEvent.request);
                })
            });

            describe('when it is a https request', () => {
                beforeEach(() => {
                    fetchEvent.request.url = 'https://dsdsds';
                });

                it('should attempt to respond with', async () => {
                    fetchEventListener(fetchEvent);
    
                    expect(respondWithPromise instanceof Promise).toBe(true);
                });
            });

            describe('when it is not http or https request', () => {
                beforeEach(() => {
                    fetchEvent.request.url = 'htt://dsdsds';
                });

                it('should not attempt to respond with', async () => {
                    fetchEventListener(fetchEvent);
    
                    expect(fetchEvent.respondWith).not.toHaveBeenCalled();
                });
            });
        });
    });

});
