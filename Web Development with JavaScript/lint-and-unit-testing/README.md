# Lint and init testing

## Writing unit tests for a function 

## Before you start

1. This practical task will be verified automatically with tests.
2. Please, put `JavaScript` code in the `src/script.js` file and `HTML` code in the `src/index.html` files. Functions from `src/script.js` are used in the `<script>` inside `src/index.html`. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure if this is not required to complete a task. It may affect the tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally. You can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in the RunJS application

`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux operating systems.

Here are detailed instructions on how to install and use it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)

This task is different from the rest because you will write unit tests. 

So, to **verify your tests written by you**: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

**If you want to run tests we use for evaluation of your tests**:

- `npm run auto:tests` launches a single run of all the tests we have for a task.
- `npm run auto:tests:watch` launches tests in `"watch mode"`. In `"watch mode"` tests are rerun every time you change the solution file (`script.js`, `script.test.js` files). This might come in handy when fixing something in your solution. This task `"freezes"` your terminal. To stop it, press `CTRL + C` on `Windows(Linux) OS` or `CMD + C` on `MacOS`.

## Task Requirements

Using the `jest` testing framework, write tests for the function `calculateTotalCost`.

### Preconditions

1. Unit tests running environment.

We have already set up a testing environment to make everything work. To learn more about it, please, read this [article](https://jestjs.io/docs/getting-started).

You can use the commands `npm run test:local` and `npm run test:watch` to run your tests. More details are available here: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md)

2. The `calculateTotalCost` function.

The `src/script.js` file contains the function `calculateTotalCost`:

```js
export function calculateTotalCost(totalPrice, discountPercentage, isPremiumMember) {
  // ...full code in the file
}
```

It already works. For the full code, please check out the file `src/script.js.` Please don't change its code; this may affect the assessment and your grade.

3. The `src/script.test.js` file. 

For your convenience, we have already created a file for your tests  `src/script.test.js`:

```js
import { calculateTotalCost } from './script.js';

describe('calculateTotalCost', () => {
  // Your tests go here
});
```
Please put all your tests inside `describe`.

###Requirements for unit tests
1.	All of your tests should pass.
2.	To complete this task successfully, you should cover all possible testing scenarios (i.e., gain 100% test coverage).
3.	Each test should have only one `assert`(`expect`) inside.
4.	You must use the function `it()` for each unit test.
5.	Each test should have a unique title.
6.	The test file should not have any disabled or commented tests.

