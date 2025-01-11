# Introduction to JavaScript

## Before we start

1. This practical task is verified automatically with tests. 
2. Please, put all your `JavaScript` code in mentioned files. If you use any other file, we would not be able to verify it.
3. Please, don't change the page structure, if it is not required for a task. It may affect tests.

## Development

While developing, you can open any HTML file in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in RunJS application

`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux operating systems.

Here are detailed instructions how to install and use it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

### Requirements for the tasks

1. **Task 1: Add JavaScript code in an HTML document:**  

For this task, you should include some javascript code in HTML document by 2 possible ways:

- Add an external file `src/task-1.js` with javascript code inside into html file `src/task-1.html`. Please, don't change the `task-1.js` file, it may affect expected visual result and tests.
- Add following javascript code to `src/task-1.html` using `<script>` tag:
```js
console.log('Hello, world!');
```
Note, this code must be added directly to the page, and not to the external file or as an external file.

**How you can check yourself:**  
Open `task-1.html` file in browser and follow the instruction. If nothing is changed on the webpage upon `Check` button clicking it means that the `task-1.js` file hasn't been included in an HTML document in a proper way. Then, press `F12` and in the developer tools open the `console` tab.

***

For the next following tasks please, put the javascript code to the corresponding `task-<taskNumber>.js` files. Don't forget to use strict mode for all the tasks - the `"use strict";` statement must be written on the first line.

To check the results open the corresponding `task-<taskNumber>.html` file in browser and a `console` window. Please, don't change the `.html` files, it may affect expected results.

2. **Task 2: Declare JavaScript variables:**  
Please, put all your JavaScript code for this task in the `src/task-2.js`.   
- Declare three variables `numVar`, `numLet`, and `numConst` by using `var`, `let`, and `const` keywords correspondingly and assign them with the any integer numerical values, for example: `1`, `2`, and `3`. Then output in the console the result of their summation. For outputing to console, please, use `console.log` function.
- Declare variables `str`, `num`, with `Boeing` and `747` values by using `let`. Then change the `str` variable so the `console.log(str + num)` outputs as `Boeing 747` (with a one space between). 

3. **Task 3: Interact with a user:**  
Please, put all your JavaScript code for this task in the `src/task-3.js`.   
Ask user for two arbitrary integer numbers (in sequence) by `prompt` function, then outputs by `alert` the result of their product.

Please, don't forget about `"use strict"` in the beginning of a script file.

4. **Task 4: Define and invoke a function:**  
Please, put all your JavaScript code for this task in the `src/task-4.js`.   

Create a function `toSquare` that asks user for an integer number by `prompt` function and returns the square of it. 

After you define this function, please, call it inside this file, and store the return value in the `result` variable and output it in the console.

For outputing to console, please, use `console.log` function.

Please, don't forget about `"use strict"` in the beginning of a script file.
    
5. **Task 5: Use comments:**

There are, 2 definitions of a function `sum` in the `src/task-5.js` file. Comment out 2 definitions, so the output in console would be the sum of `a` and `b` parameters. 

Please, don't delete these definitions, just comment them out. Also, please, don't change the rest of a file.
