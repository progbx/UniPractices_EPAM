# JS Extras

## Write functions for working with JavaScript language features

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

To be sure your solution is correct before you submit, you can verify it locally. This will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Write functions for working with the features of the JavaScript language. See the requirements below.

Please note that you should edit the `src/script.js` file. We can't verify your solution if you use a different file.

To create function, you must use `Function Declaration`, or we will not be able to verify it. How to use `Function Declaration`: [javascript.info: Function Declaration](https://javascript.info/function-basics#function-declaration).

**Please note:**

- If a task requirement says: _Function should **return** <something>_, it means it should deliberately return expected value. If you show it in the console, instead of returning a value it will not pass the check. Find more details here: [Returning a value](https://javascript.info/function-basics#returning-a-value).

### Requirements for functions

1. **The function "selectionTypes"**

Write the function `selectionTypes`. It should return an object with separate properties for each of the types presented in the input. Each property should contain an array of corresponding values.

```js
function selectionTypes(arr) {
  // your code...
}
```

This function takes one parameter: `arr` - an array with elements of any type

1. 1. The function should return an object.
2. The function defines an empty object obj to store the grouped elements
3. The function defines the type of array that will hold the unique data types of the elements in the input array.
4. The types array is created by mapping over the input array and getiing the data type of each element.
5. If the type is not presented in the nput, no corresponding properties are expected

**An example of using the function:**

```js
selectionTypes(["a", 1, 2, false, "b"]); //{ number: [1, 2], string: ['a', 'b'], boolean: [false] }
selectionTypes([{}, null, 3]); // {object: [{}, null], number: [3]}
```

2. **The function "multiply"**
   Create the function `multiply` to multiply values. This function takes one argument, x, and returns another function that takes one argument, y, and returns yet another function that takes one argument, z.

```js
function multiply(x)(y)(z) {
  // your code...
}
```

This function takes one parameter:
`x` - a number

1. The function should return a number after the third call. (You should remember what currying is. For more about currying https://javascript.info/currying-partials)
2. All parameters should be multiplied.
3. The function returns a function that takes one parameter, y.
4. The inner function returns another arrow function that takes one parameter, z.
5. If one of the parameters is not set, the function should return 0.
6. If any of these values is not a number or if the product of these values is 0, the function should return 0

**An example of using the function:**

```js
multiply(2)(4)(6); // 48
multiply(3)(3)(3); // 27
multiply(3)(3)(undefined); // 0

const partial = multiply(3);
result = partial(4)(5); // 60
```

3. **The function "smartMultiply"**

Write the function `smartMultiply` function to take two parameters, x and y, and return the product of x and y if both parameters are provided. Otherwise, it should return a function that takes one argument, y, and returns the product of x and y

```js
function smartMultiply(x, y) {
  // your code...
}
```

The `smartMultiply` function takes one or two parameters:
`x`, `y` - a number of values

1. The function should return a number.
2. The function checks to see if the second parameter y is not undefined. If not it returns the product of x and y.
3. If y is undefined, the function returns another function, doubleMultiply, which takes one argument y and returns the product of x and y.
4. The doubleMultiply function takes one parameter, y, and returns the product of x and y.
5. If one of the parameters is not a number the function should return 0.

**An example of using the function:**

```js
smartMultiply(2, 3); // => 6
smartMultiply(3, "0"); // => 0

const multiply1 = smartMultiply(2);
multiply1(2); // => 4
multiply1(3); // => 6

const multiply2 = smartMultiply(5, undefined);
multiply2(2); // => 10
multiply2(3); // => 15
```

4. **The function "getNumberOfItems"**
   Write a function `getNumberOfItems`to take a multidimensional array as a parameter. The array should contain items with data types such as `['String', Number]`, and the function should return the number of elements with unique strings.

```js
function getNumberOfItems() {
  // your code...
}
```

This function takes one parameter:
data - a multidimensional array (for example, `[['Ball', 5], ['Bicycle', 100], ['Teddybear', 10],['Kite', 3], ['Ball', 3]]`)

1. The function should return a number.
2. The function should take a multidimensional array as its parameter.
3. Each subarray should contains two elements: the first is a string and the second is a number.
4. The function should then loop through each subarray. If the first element is a string, the function should add it to the data structure with unique elements.
5. If the string is empty, decrease the number of elements by 1.

**An example of using the function:**

```js
getNumberOfItems([
  ["Ball", 5],
  ["Bicycle", 100],
  ["Teddybear", 10],
  ["Kite", 3],
  ["Ball", 3],
]); // 4

getNumberOfItems([
  ["Ball", 5],
  ["Bicycle", 100],
  ["Teddybear", 10],
  ["", 3],
  ["Ball", 3],
]); // 3
getNumberOfItems([]); // 0
```

5. **The function "createStack"**
   Write the function `createStack` to that create instances of the stack data structure.
   The stack should have four methods, push(), pop(), peek(), and getStack(). Also, the stack should have the property `items`

   Read more about Stack: (https://en.wikipedia.org/wiki/Stack_(abstract_data_type))

```js
function createStack() {
  // your code...
}
```

This function takes one parameter:
data - an array of values

1. The function should returns an object that contains four methods: push, pop, peek, and getStack.
2. The stack should be implemented as an array.
3. The `pop` method removes the top item from the stack and returns it.
4. The `push` method takes an item as its parameter and adds it to the top of the stack.
5. The `peek` method returns the top item from the stack without removing it.
6. The `getStack` method returns the entire stack as an array.
7. The stack should have the property `items`
8. The call `stack.items` should return undefined

**An example of using the function:**

```js
const stack = createStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop(); // => 3
stack.items; // => undefined
stack.peek(); // 2
stack.getStack(); // [1,2]
```
