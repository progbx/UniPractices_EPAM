const temp = require('temp');
const path = require('path');
const { writeFile } = require('fs/promises');
const { readTextFile } = require('../test-utils/readTextFile');
const util = require('node:util');
const { exec } = require('node:child_process');
const request = require('supertest');

const countries = [
    {
        "country": "Belarus",
        "capital": "Minsk",
        "population": "9200000"
    },
    {
        "country": "Ukraine",
        "capital": "Kyiv",
        "population": "43800000"
    },
    {
        "country": "Poland",
        "capital": "Warsaw",
        "population": "37750000"
    },
    {
        "country": "Uzbekistan",
        "capital": "Tashkent",
        "population": "34920000"
    },
    {
        "country": "Kazakhstan",
        "capital": "Astana",
        "population": "19000000"
    },
    {
        "country": "Azerbaijan",
        "capital": "Baku",
        "population": "10140000"
    },
    {
        "country": "Kyrgyzstan",
        "capital": "Bishkek",
        "population": "6692000"
    },
    {
        "country": "Kyrgyzstan",
        "capital": "Bishkek",
        "population": "6692000"
    }
];

// startServer
let startServer = null;
let startServerModule = null;
try {
    startServerModule = require("./server/startServer");
    startServer = startServerModule.startServer;
} catch (error) { }

// node-project
let nodeProjectPackageJson = null;
try {
    nodeProjectPackageJson = require("./node-project/package.json");
} catch (error) { }

describe('NodeJS Intro 1', () => {

    let execAsync;

    beforeEach(() => {
        execAsync = util.promisify(exec);
    });

    describe('manage-file.js', () => {
        let testFileName;
        let testFileContent;
        let testFilePath;

        let scriptFileName;
        let scriptFullPath;

        let testDirPath;

        beforeEach(async () => {
            scriptFileName = 'manage-file.js';
            testFileName = 'test-test.txt';
            testFileContent = 'Hello, world!';

            scriptFullPath = path.join(__dirname, scriptFileName);
            testDirPath = await temp.mkdir('test-dir');

            testFilePath = path.join(testDirPath, testFileName);

            temp.track();
        });

        afterEach(() => {
            temp.cleanup();
        });

        describe('when copy', () => {
            let copiedFileName;

            beforeEach(() => {
                copiedFileName = 'copiedFileName.txt';
            });

            it('should create a file copy', async () => {
                await setupTempFiles();
                const copiedFilePath = path.join(testDirPath, copiedFileName);

                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --copy ${testFileName} --to ${copiedFileName}`, options);

                const resultFileContent = await readTextFile(copiedFilePath);

                expect(typeof (resultFileContent) === 'string').toBe(true);
            });

            it('a file copy should have the same content as the original', async () => {
                await setupTempFiles();
                const copiedFilePath = path.join(testDirPath, copiedFileName);

                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --copy ${testFileName} --to ${copiedFileName}`, options);

                const resultFileContent = await readTextFile(copiedFilePath);
                const originalFileContent = await readTextFile(testFilePath);

                expect(originalFileContent).toBe(testFileContent);
                expect(resultFileContent).toBe(testFileContent);
            });

        });

        describe('when rename', () => {
            let renamedFileName;

            beforeEach(() => {
                renamedFileName = 'backup-test.txt';
            });

            it('should create a renamed file', async () => {
                await setupTempFiles();
                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --rename ${testFileName} --to ${renamedFileName}`, options);

                const newFileName = path.join(testDirPath, renamedFileName);
                const resultFileContent = await readTextFile(newFileName);

                expect(typeof (resultFileContent) === 'string').toBe(true);
            });

            it('a renamed file should have the same content as the original', async () => {
                await setupTempFiles();
                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --rename ${testFileName} --to ${renamedFileName}`, options);

                const newFileName = path.join(testDirPath, renamedFileName);
                const resultFileContent = await readTextFile(newFileName);

                expect(resultFileContent).toBe(testFileContent);
            });

            it('an original file should be removed', async () => {
                await setupTempFiles();
                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --rename ${testFileName} --to ${renamedFileName}`, options);

                let result;
                try {
                    await readTextFile(testFilePath);
                } catch (error) {
                    result = error;
                }

                const isNoSuchFileError = result.message.startsWith('ENOENT: no such file or directory');
                expect(isNoSuchFileError).toBe(true);
            });
        });

        describe('when no --to argument', () => {
            let defaultFileName;

            beforeEach(() => {
                defaultFileName = 'default.txt';
            });

            it('should create a file copy with a default file name', async () => {
                await setupTempFiles();

                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --copy ${testFileName}`, options);

                const newFileName = path.join(testDirPath, defaultFileName);
                const resultFileContent = await readTextFile(newFileName);

                expect(resultFileContent).toBe(testFileContent);
            });

            it('should create a renamed file with a default file name', async () => {
                await setupTempFiles();

                const options = { cwd: testDirPath };
                await execAsync(`node ${scriptFileName} --rename ${testFileName}`, options);

                const newFileName = path.join(testDirPath, defaultFileName);
                const resultFileContent = await readTextFile(newFileName);

                expect(resultFileContent).toBe(testFileContent);
            });
        });

        describe('when wrong command passed', () => {
            it('should throw an error', async () => {
                await setupTempFiles();

                let result;
                try {
                    const options = { cwd: testDirPath };
                    await execAsync(`node ${scriptFileName} --some ${testFileName}`, options);
                } catch (error) {
                    result = error.stderr;
                }
                const expectedErrorMessage = 'Invalid command name! Please specify either copy or rename!';

                expect(result.includes(expectedErrorMessage)).toBe(true);
            });
        });

        describe('when -- passed in arguments', () => {
            let expectedErrorMessage;

            beforeEach(() => {
                expectedErrorMessage = 'Invalid arguments! The value should not start with --!';
            });

            it('should throw an error when in original file name', async () => {
                await setupTempFiles();

                let result;
                try {
                    const options = { cwd: testDirPath };
                    await execAsync(`node ${scriptFileName} --copy --${testFileName} --to new-test.txt`, options);
                } catch (error) {
                    result = error.stderr;
                }

                expect(result.includes(expectedErrorMessage)).toBe(true);
            });

            it('should throw an error when in new file name', async () => {
                await setupTempFiles();

                let result;
                try {
                    const options = { cwd: testDirPath };
                    await execAsync(`node ${scriptFileName} --rename ${testFileName} --to --new-test.txt`, options);
                } catch (error) {
                    result = error.stderr;
                }

                expect(result.includes(expectedErrorMessage)).toBe(true);
            });
        });

        async function setupTempFiles() {
            const scriptFileContent = await readTextFile(scriptFullPath);
            const filePath = path.join(testDirPath, testFileName);
            const scriptFilePath = path.join(testDirPath, scriptFileName);

            await writeFile(filePath, testFileContent);
            await writeFile(scriptFilePath, scriptFileContent);
        }
    });

    describe('http server: startServer.js', () => {
        it('should create src/server/startServer.js file', () => {
            expect(startServerModule).not.toBeNull();
        });

        describe('when all countries call', () => {
            it('should have a success status', async () => {
                const app = startServer();
                return request(app)
                    .get('/')
                    .expect(200);
            });

            it('should have a JSON Content-Type header', async () => {
                const app = startServer();
                return request(app)
                    .get('/')
                    .expect('Content-Type', /json/i);
            });

            it('should return all countries', async () => {
                const app = startServer();
                const response = await request(app).get('/');

                expect(JSON.parse(response.text)).toEqual(countries);
            });
        });

        describe('when one country call', () => {
            it('should return this country only', async () => {
                const app = startServer();
                const response = await request(app)
                    .get('/Ukraine')
                    .expect(200)
                    .expect('Content-Type', /json/i);

                const expectedCountry = [{
                    "country": "Ukraine",
                    "capital": "Kyiv",
                    "population": "43800000"
                }];

                expect(JSON.parse(response.text)).toEqual(expectedCountry);
            });
        });

        describe('when call for country which is not in the list', () => {
            it('should return the object with message', async () => {
                const app = startServer();
                const response = await request(app).get('/someOtherCountry');

                const expectedResult = { message: 'no such country in the list' };

                expect(JSON.parse(response.text)).toEqual(expectedResult);
            });
        });
    });

    describe('node-project', () => {
        it('should create a package.json', () => {
            expect(nodeProjectPackageJson).not.toBeNull();
        });

        describe('devDependencies', () => {
            let devDependencies;

            beforeEach(() => {
                devDependencies = nodeProjectPackageJson.devDependencies;
            });

            it('should install @babel/cli', () => {
                expect(devDependencies.hasOwnProperty('@babel/cli'))
                    .toBe(true);
            });

            it('should install @babel/core', () => {
                expect(devDependencies.hasOwnProperty('@babel/core'))
                    .toBe(true);
            });

            it('should install @babel/preset-env', () => {
                expect(devDependencies.hasOwnProperty('@babel/preset-env'))
                    .toBe(true);
            });
        });

        describe('.babelrc', () => {
            it('should create a .babelrc file', async () => {
                const babelRcFile = await readTextFile('./src/node-project/.babelrc');
            
                expect(babelRcFile).not.toBeNull();
            });

            it('should add preset-env to file', async () => {
                const babelRcFileString = await readTextFile('./src/node-project/.babelrc');
                const babelRcFileJson = JSON.parse(babelRcFileString);

                expect(Object.keys(babelRcFileJson).length === 1).toBe(true);
                expect(babelRcFileJson.presets.length === 1).toBe(true);
                expect(babelRcFileJson.presets[0].length === 1).toBe(true);
                expect(babelRcFileJson.presets[0].includes('@babel/preset-env'))
                    .toBe(true);
            });
        });

        describe('build script', () => {
            let buildScript;

            beforeEach(() => {
                buildScript = nodeProjectPackageJson?.scripts?.build;
            });

            it('should add it', () => {
                expect(buildScript).toBeDefined();
            });

            it('should use babel for parsing', async () => {
                const regex = /babel +(\.\/)?input.js +--out-file +(\.\/)?lib\/output\.js/g;
            
                expect(regex.test(buildScript)).toBe(true);
            });
        });
    });
});