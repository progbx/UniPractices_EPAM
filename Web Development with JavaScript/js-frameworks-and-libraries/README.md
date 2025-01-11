# JS Frameworks and libraries

## Write functions to work with JS libraries.

## Before we start

1. This practical task is verified automatically with tests. 
2. Please, put all your `JavaScript` code in the `src/script.js` and `HTML` code in the `src/index.html` files. Functions from `src/script.js` are used in the `<script>` inside `src/index.html`. If you use any other file, we would not be able to verify it.
3. Please, don't change the page structure, if it is not required for a task. It may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Run JavaScript code in RunJS application

`RunJS` is a JavaScript and TypeScript playground for desktop operating systems. It runs code as it's written and displays formatted results in the output panel on the right.

![RunJS application in work](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/images/runjs-intro.png)

RunJS is available on macOS, Windows, and Linux operating systems.

Here are detailed instructions how to install and use it: [RunJS documentation](https://runjs.app/docs).

## Check your solution before submitting it (OPTIONAL)
To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).


## Task Requirements

1. **Loading JS Libraries From a CDN**
  
For this task, you should add both the Lodash and date-fns libraries from the CDN to the file `index.html`. To do this, you can use a CDN service, e.g., .

Please make sure that the scripts you copied are placed before the closing body tag and before any subsequent scripts.

Please also note that when adding the libraries from the CDN, Lodash and date-fns are named `_` and `dateFns` objects, respectively. 
So, to use the libraries' functions, use the syntax `_.<some_function>()` or `dateFns.<some_function>()`.


2. **The Function "findLongestWord"**

Write a function called `findLongestWord` for finding the longest word in a phrase. 
In the `src` folder, create the file `findLongestWord.js`. This file should export the function `findLongestWord`: 
```js
export function findLongestWord(phrase) {
    // Your code
}
```

It takes one parameter:
•	`phrase`: a string with a text

The function `findLongestWord` should contain at least one Lodash function. Please use its global variable `_`.

The function should return the word in the phrase with the largest number of letters. If there is more than one such word, the function should return the first occurrence.

An example of using the function:
```js
const phrase_1 = 'JavaScript is a programming language';
const phrase_2 = 'The Lodash library is exported as Node.js modules.';

findLongestWord(phrase_1); //programming
findLongestWord(phrase_2); //exported
```

3. **The Function "getAverageAge"**

Write a function called `getAverageAge` for calculating the average value of the `age` property in an array of objects as follows: 
```js
    const users = [
        {name: 'John', age: 30},
        {name: 'Mike', age: 28},
        ...
    ]
```

In the `src` folder, create the file `getAverageAge.js`. This file should export the function `getAverageAge`:

```js
export function getAverageAge(arr) {
    // Your code
}
```
It takes one parameter:
•	`arr`: an array of objects with the corresponding data

The function `getAverageAge` should contain at least one Lodash function. Please use its global variable `_`.

The calculation shouldn't include duplicates based on the `name` property; only the first occurrence of each object in the original array is counted.

An example of using the function:

```js
    const users = [
        {name: 'John', age: 30},
        {name: 'Mike', age: 28},
        {name: 'Jack', age: 29}
    ];

    const newUsers = [
        {name: 'Jane', age: 20},
        {name: 'Ann', age: 24},
        {name: 'Mary', age: 28},
        {name: 'Jane', age: 20},
    ];

    getAverageAge(users); //29
    getAverageAge(newUsers); //24 (not 23)
```

4. **The Function "getTimeBetween"**

Write a function that returns the difference between two dates in a specified unit of time (days, hours, or minutes) using the date-fns library.

In the `src` folder, create the file `getTimeBetween.js`. This file should export the function `getTimeBetween`:

```js
export function getTimeBetween(date_1, date_2, unit) {
    // Your code
}
```

It takes three parameters:
•	`date_1` and `date_2`: JavaScript date objects
•	`unit`: a string that specifies the unit of time ("days," "hours," or "minutes") 
If some other unit is specified, the function should return a message with the following text: `Invalid unit specified. Must be 'days', 'hours', or 'minutes'`.

The function `getTimeBetween` should contain all the necessary date-fns methods. Please use its global variable `dateFns`.

An example of using the function:
```js
    const date_1 = new Date(2023, 3, 28, 12, 0, 0);
    const date_2 = new Date(2023, 4, 7, 14, 30, 0);

    getTimeBetween(date_1, date_2, "days"); //9 
    getTimeBetween(date_1, date_2, "hours"); //218 
    getTimeBetween(date_1, date_2, "minutes"); //13110 
    getTimeBetween(date_1, date_2, "seconds"); // "Invalid unit specified. Must be 'days', 'hours', or 'minutes'" 
    
```

5. **The Function "customIncludes"**

Write a function that is a 'custom' version of the Lodash function `_.includes` for arrays: [_includes](https://lodash.com/docs/4.17.15#includes). Using methods from Array.prototype is not allowed (except for the `.length` property).

In the `src` folder, create the file `customIncludes.js` . This file should export the function `customIncludes`:

```js
export function customIncludes(arr, value, [fromIndex=0]) {
    // Your code
}
```
It takes two mandatory parameters and one optional parameter:
•	`arr`: the array to inspect
•	`value`: the value to search for
•	`fromIndex`: a number—the index to search from (if omitted, the default value of 0 is used)

The function should return true if the value is found; otherwise, it should return false.

An example of using the function:
```js
const arr = [1,2,3,4,5];

customIncludes(arr, 1); //true
customIncludes(arr, 6); //false
customIncludes(arr, 2, 2); //false
```
