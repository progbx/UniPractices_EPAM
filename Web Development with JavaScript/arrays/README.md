# Arrays

## Writing Functions for Working With Arrays

## Before we start
1. This practical task will be verified automatically with tests. 
2. Please put all `JavaScript` code in the `src/script.js` file and `HTML` code in the `src/index.html` file. Functions from `src/script.js` are used in the `<script>` inside `src/index.html`. If you use any other file, it cannot be verified.
3. Please don't change the page structure if this is not required. It may affect the tests.

## Development
While developing, you can open `src/index.html` in your browser to check your task as you go. However, we have prepared a more convenient way to run it locally. You can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in RunJS application
`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux operating systems.

Here are detailed instructions on installing and using it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally, but this will require some local setup. You can find the instructions here: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Write functions for working with arrays. Requirements are below.

Please note that you should edit the `src/script.js` file. Your solution cannot be verified if you use a different file.

To create a function, you must use `Function Declaration`, or it will not be verified. How to use `Function Declaration`: [javascript.info: Function Declaration](https://javascript.info/function-basics#function-declaration).

**Please, note:**

- If the task requirement says, "Function should return," it should deliberately return the expected value. If you show it in the console instead of returning a value, it will not pass the check. See the following link for more about returning a value:  [Returning a value](https://javascript.info/function-basics#returning-a-value).

### Requirements for the functions

1.	Function "addNumber"
Write the function addNumber, which takes an array and a number as parameters. If the number is negative, add it to the end of the array; add it to the beginning if it is positive. If the second parameter is 0 or NaN, the number should not be added to the array.
```js
function addNumber(arr, number) {
  // your code...
}
```
This function takes two parameters: arr (an array with any data) and number (a number).
The function should change and return an array.
```js
// An example of a returned array:
[8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
```
An example of using the function:
```js
let array = addNumber([1, 2, 3, 4, 10, 8, 1, 3, 7, 11], 8);

// user array:
[8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];

let array = addNumber([1, 2, 3, 4, 10, 8, 1, 3, 7, 11], -8);

// user array:
[1, 2, 3, 4, 10, 8, 1, 3, 7, 11, -8];

let array = addNumber([1, 2, 3, 4, 10, 8, 1, 3, 7, 11], 0);

// user array:
[1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
```

2.	Function "compareArrays"
Write the function compareArrays, which takes two arrays as parameters and compares them. The function should return true if the arrays are the same and false if they are different.
```js
function compareArrays(arr1, arr2) {
  // your code...
}
```
This function takes two parameters: arr1 (an array with any data) and arr2 (an array with any data).
```js
const arr1 = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
const arr2 = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
```
  1.	The function takes two arrays as a parameter. It can be the same array that is passed in the parameters.
  2.	The function should compare the arrays and return a result.
  3.	The function should return true if the arrays are the same and false if they are different.

An example of using the function:
```js
const arr1 = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];

let compare = compareArrays(arr1, arr1); //true

const arr1 = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
const arr2 = [8, 1, 2, 3];

let compare = compareArrays(arr1, arr2); //false
```

3.	Function "getNumberOfEven"
Write the function getNumberOfEven, which takes an array as a parameter and returns the number of even elements in the array.
```js
function getNumberOfEven(arr) {
  // your code...
}
```
This function takes one parameter: arr (an array of numbers).
```js
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
```
  1.	The function should return the number of even elements in the array.
  2.	arr is an array of numbers. Ignore all other types of values.
  3.	Also, the function should not break for an empty array. It should return 0 in this case.
An example of using the function:
```js
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];

let even = getNumberOfEven(arr); // 5
```
4.	Function "getSubarray"
Write the function getSubarray, which takes an array and data as parameters and returns a subarray. The subarray will contain all the elements of the original array, starting with the index 0, and including the data.
```js
function getSubarray(arr, data) {
  // your code...
}
```
This function takes two parameters: arr (an array with any data) and data (a variable with any data).
  1. The function should find the data in the original array.
  2. The function should return a subarray from the first element until the data.
  3. Also, the function should not break for an empty array or an array that does not contain data. It should return [] in this case.
**An example of using the function:**
```js
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
let data = 7;
let subarray = getSubarray(data); //[8,1,2,3,4,10,8,1,3,7];
const arr = ["d", "ds", "asdx", "r", "w", "w"];
let data = "r";
let subarray = getSubarray(data); // ['d','ds','asdx', 'r']
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 11];
let data = 0;
let subarray = getSubarray(data); // []
```

5.	Function "getDuplicateValues"
Write the function getDuplicateValues, which takes an array as a parameter and returns an array with duplicate data. The values in the new array should be unique.
```js
function getDuplicateValues(arr) {
  // your code...
}
```
This function takes one parameter: arr (an array with any data).
```js
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 1, 1];
```
  1.	The function should return a new array.
  2.	The function should collect element that are duplicated in arr. For example, if arr contains four 1s, the new array should contain only one 1.
  3.	Also, the function should not break for an empty array. It should return [] in this case.
An example of using the function:
```js
const arr = [8, 1, 2, 3, 4, 10, 8, 1, 3, 7, 1, 1];
let duplicate = getDuplicateValues(arr); // [8,1,3];
const arr = ["d", "ds", "asdx", "r", "w", "w"];
let duplicate = getDuplicateValues(arr); // ['w'];
```

6.	Function "getMaxNumbers"
Write the function getMaxNumbers, which takes a two-dimensional array of numbers as a parameter and returns an array with the maximum numbers from each nested array.
```js
function getMaxNumbers(arr) {
  // your code...
}
```
This function takes one parameter: arr (a two-dimensional array).
```js
const arr = [[1, 6, 9, 1], [2, 3, -4, 8], [15]];
```
  1.	The function should return a new one-dimensional array.
  2.	The function should gather the maximum numbers of the nested arrays into a new array.
  3.	Also, the function should not break for an empty array. It should return [] in this case.
An example of using the function:
```js
const arr = [[1, 6, 9, 1], [2, 3, -4, 8], [15]];
let newArrMaxNumber = getMaxNumbers(arr); // [9,8,15];
const arr = [];
let newArrMaxNumber = getMaxNumbers(arr); // [];
```
