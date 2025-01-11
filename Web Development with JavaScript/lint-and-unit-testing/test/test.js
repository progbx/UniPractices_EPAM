const chai = require('chai');
const expect = chai.expect;
const { ESLint } = require('eslint');
const { resolveFilePathRelativeToRoot, resolveFilePathRelativeToSrc } = require('../test-utils/resolveFilePath');
const { readTextFile } = require('../test-utils/readTextFile');
const { execSync } = require('child_process');

describe('Lint And Unit Testing', function () {
    describe('unit-tests for calculateTotalCost function:', () => {
        let filePath;
        let coverageFilePath;
        let commonConfig;

        this.beforeEach(() => {
            filePath = resolveFilePathRelativeToSrc('script.test.js');
            coverageFilePath = resolveFilePathRelativeToRoot('coverage/coverage-summary.json');

            commonConfig = {
                env: {
                    browser: true,
                    es2022: true,
                },
                parserOptions: {
                    sourceType: 'module',
                    allowImportExportEverywhere: true,
                },
                plugins: ['jest'],
            };
        });

        it('all unit-tests should pass', () => {
            const areAllTestsPassed = checkPassTests();

            expect(areAllTestsPassed).equal(true);
        }).timeout(5000);

        it('should have 80% coverage', async () => {
            let averageTotalCoverage;

            try {
                const coverageSummary = await runTestCoverage();;
                /* 
                coverageSummary:
                {
                    "total": {
                        "lines": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "statements": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "functions": { "total": 1, "covered": 1, "skipped": 0, "pct": 100 },
                        "branches": { "total": 9, "covered": 9, "skipped": 0, "pct": 100 },
                        "branchesTrue": { "total": 0, "covered": 0, "skipped": 0, "pct": "Unknown" }
                    },
                    "\\lint-and-unit-testing\\src\\script.js": {
                        "lines": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "statements": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "functions": { "total": 1, "covered": 1, "skipped": 0, "pct": 100 },
                        "branches": { "total": 9, "covered": 9, "skipped": 0, "pct": 100 },
                    }
                }      
                */
                const coverageTotal = coverageSummary.total;
                averageTotalCoverage = getAverageTotalCoverage(coverageTotal);
            } catch (error) {
                console.error('ERROR: ', error.toString());
            }

            const isCoverageMeetsExpectations = averageTotalCoverage >= 80;

            expect(isCoverageMeetsExpectations).equal(true);
        }).timeout(5000);

        it('should have 100% coverage', async () => {
            let averageTotalCoverage;

            try {
                const coverageSummary = await runTestCoverage();
                /* 
                coverageSummary:
                {
                    "total": {
                        "lines": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "statements": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "functions": { "total": 1, "covered": 1, "skipped": 0, "pct": 100 },
                        "branches": { "total": 9, "covered": 9, "skipped": 0, "pct": 100 },
                        "branchesTrue": { "total": 0, "covered": 0, "skipped": 0, "pct": "Unknown" }
                    },
                    "\\lint-and-unit-testing\\src\\script.js": {
                        "lines": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "statements": { "total": 20, "covered": 20, "skipped": 0, "pct": 100 },
                        "functions": { "total": 1, "covered": 1, "skipped": 0, "pct": 100 },
                        "branches": { "total": 9, "covered": 9, "skipped": 0, "pct": 100 },
                    }
                }      
                */
                const coverageTotal = coverageSummary.total;
                averageTotalCoverage = getAverageTotalCoverage(coverageTotal);
            } catch (error) {
                console.error('ERROR: ', error.toString());
            }

            expect(averageTotalCoverage).equal(100);
        }).timeout(5000);

        it('tests style should fit requirements', async () => {
            const areAllTestsPassed = checkPassTests();

            const consistentTestItRuleId = 'jest/consistent-test-it';
            const maxExpectsRuleId = 'jest/max-expects';
            const noIdenticalTitleRuleId = 'jest/no-identical-title';
            const noDisabledTestsRuleId = 'jest/no-disabled-tests';
            const noCommentedOutTestsRuleId = 'jest/no-commented-out-tests';

            const rules = [
                consistentTestItRuleId,
                maxExpectsRuleId,
                noIdenticalTitleRuleId,
                noDisabledTestsRuleId,
                noCommentedOutTestsRuleId,
            ];

            const baseConfig = mergeConfigWithCommon({
                rules: {
                    [consistentTestItRuleId]: 'error',
                    [maxExpectsRuleId]: [
                        "error",
                        {
                            "max": 1
                        }
                    ],
                    [noIdenticalTitleRuleId]: 'error',
                    [noDisabledTestsRuleId]: 'error',
                    [noCommentedOutTestsRuleId]: 'error',
                }
            });

            eslint = new ESLint({ baseConfig });

            const lintResult = await eslint.lintFiles(filePath);

            const allMessages = lintResult[0].messages;
            const errorMessages = allMessages.filter((message) => rules.includes(message.ruleId));

            if (errorMessages.length > 0) {
                console.error(errorMessages);
            }

            expect(areAllTestsPassed && errorMessages.length === 0).equal(true);
        }).timeout(5000);

        function getAverageTotalCoverage(coverageTotal) {
            if (!coverageTotal) {
                return 0;
            }

            const linesPct = coverageTotal.lines.pct;
            const statementsPct = coverageTotal.statements.pct;
            const functionsPct = coverageTotal.functions.pct;
            const branchesPct = coverageTotal.branches.pct;

            return (linesPct + statementsPct + functionsPct + branchesPct) / 4;
        }

        function getJSONFromNonEscapedString(nonEscapedJSON) {
            try {
                return JSON.parse(nonEscapedJSON.replace(/\\/gi, '|'));
            } catch (error) {
                return null;
            }
        };

        function mergeConfigWithCommon(baseConfig) {
            return Object.assign({}, commonConfig, baseConfig);
        }

        async function runTestCoverage() {
            execSync(`jest --silent --coverage`, { encoding: 'utf8' });

            const JSONString = await readTextFile(coverageFilePath);

            return JSON.parse(JSONString);
        }

        function checkPassTests() {
            let areAllTestsPassed = false;

            try {
                const result = execSync(`jest --reporters=default --json`, { encoding: 'utf8', stdio: 'pipe' });
                const resultJSON = getJSONFromNonEscapedString(result);

                areAllTestsPassed = !!resultJSON &&
                    resultJSON.numPassedTestSuites === 1 &&
                    resultJSON.numFailedTests === 0;
            } catch (error) {
                console.error('ERROR: ', error.toString());
            }

            return areAllTestsPassed;
        }
    });
});
