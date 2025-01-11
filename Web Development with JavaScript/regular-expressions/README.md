# JS Regular Expressions

## Practice regular expressions in JavaScript

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


## Task Requirements
Every function created here should be in its own separate file and should be exported from it. Please use the file names mentioned in the requirements to pass the tests.

When creating a function, you must use Function Declaration, or it will not be able to be verified. How to use Function Declaration: 
javascript.info: [Function Declaration](https://javascript.info/function-basics#function-declaration).

**Please, note:**
- If the task requirement says: _Function should **return** <something>_, it should deliberately return the expected value. If it is displayed in the console instead of returning a value, it will not pass verification. More about returning a function value: [Returning a value](https://javascript.info/function-basics#returning-a-value).


1. **The Function "hasDigit"**

Write the function `hasDigit` which checks if input string contains digits uisng with regular expression.

In the `src` folder, create the file `hasDigit.js`, which should export the function `hasDigit`:

```js
export function hasDigit(str) {
    // Your code
}
```
This function takes one parameter:
`str` - any string element, `null` or `undefined`.

1. The function should return `true` if there is at least one digit in the `str` parameter.
2. The function should return `false` if `str` is `null`.
3. The function should return `false` if `str` is `undefined`.

Usage example:
```js
hasDigit("SomeSome"); // false
hasDigit("Some7Name"); // true
hasDigit("44"); // true
hasDigit(); // false
hasDigit(null); // false
```

2. **The Function "isValidPhoneNumber"**

Write the function `isValidPhoneNumber` to use regular expression to check whether an input string is a valid number in the format `555-555-5555`.

In the src folder, create the file `isValidPhoneNumber.js`, which should export the function `isValidPhoneNumber`:

```js
export function isValidPhoneNumber(str) {
    // Your code
}
```
This function takes one parameter:
`str` - any string element, `null` or `undefined`.

1. The function should return `true` if its format corresponds strictly to `555-555-5555`.
2. The function should return `false` if its format doesn't correspond to `555-555-5555`. For example: `444.444.4444`, `333-33-33`, `55555555555`, `343434`, `555 555 55555`, etc.
3. The function should return `false` if `str` is `null`.
4. The function should return `false` if `str` is `undefined`.

Usage example:
```js
isValidPhoneNumber("444-444-4444"); // true
isValidPhoneNumber("222 222 2222"); // false
isValidPhoneNumber("2222"); // false
isValidPhoneNumber(null); // false
isValidPhoneNumber(); // false
```

3. **The Function "isValidEmail"**

Write the function i`sValidEmail` to use regular expression to check whether an input string is a valid email address.

In the `src` folder, create the file `isValidEmail.js`, which should export the function `isValidEmail`:

```js
export function isValidEmail(str) {
    // Your code
}
```
This function takes one parameter:
`str` - any string element, `null` or `undefined`.

    1. The function should return `true` if `str` is a valid email.
    2. The function should return `false` if `str` is not a valid email.
    3. The function should return `false` if `str` is `null`.
    4. The function should return `false` if `str` is `undefined`.

**Note**
An email is a string (a subset of ASCII characters) separated into two parts by the @ symbol—"personal_info" and a domain, e.g., personal_info@domain. The length of the personal_info part can be up to 64 characters long, and the domain name can be up to 253 characters.

The personal_info part contains the following ASCII characters:
- Uppercase (A–Z) and lowercase (a–z) English letters
- Digits (0–9)
- The characters **! # $ % & ' * + - / = ? ^ _ ` { | } ~**
- The character . (period/dot/fullstop), provided that it is not the first or last character and that there are not two dots in a row
- The domain name part [e.g., com, org, net, in, us, info] can contain letters, digits, hyphens, and dots.

An example of a valid email:
- mysite@ourearth.com
- my.ownsite@ourearth.org
- mysite@you.me.net

Usage example:
```js
isValidEmail("mysite@gmail.com"); // true
isValidEmail("some.name@itpu.uz"); // true
isValidEmail("some-name@itpu.uz"); // true

isValidEmail("user"); // false
isValidEmail("user@com"); // false
isValidEmail("gmail.com"); // false

isValidEmail(null); // false
isValidEmail(); // false
```

4. **The Function "filterArrayContainsString"**

Write the function `filterArrayContainsString` to filter Array items if they contain a string.

In the `src` folder, create the file `filterArrayContainsString.js`, which should export the function `filterArrayContainsString`:

```js
export function filterArrayContainsString(array,str) {
    // Your code
}
```
This function takes two parameters:
`array` - array of strings
`str` - any string element.

1. The function should return an `array` filtered from the input `array` and contain only items that have `str` as a substring.
2. The function should return an empty `array` if the input `array` items don't contain `str` as a substring.
3. The function should return an `array` with the same items as the input `array` if `str` is `null` or `undefined`.

Usage example:
```js
let arr = ['apple', 'pineapple', 'orange', 'lemon'];

filterArrayContainsString(arr, "ap"); // ['apple', 'pineapple']
filterArrayContainsString(arr); // ['apple', 'pineapple', 'orange', 'lemon']
filterArrayContainsString(arr, "ppp"); // []
```

4. **The Function "replaceASymbol"**

Write the function `replaceASymbol` to find all words that begin and end with the letter `a` and replace each of them with `!`. Any character except `a` can be between two `a`s (e.g., aba, aca, but not aaa). 

For example, the string `aba accca azzza wwwwa` should give a result with `! ! ! wwwwa`

In the `src` folder, create the file `replaceASymbol.js`, which should export the function `replaceASymbol`:

```js
export function replaceASymbol(str) {
    // Your code
}
```
This function takes one parameters:
`str` - any string element, `null` or `undefined`.

1. The function should return a new string in which the character `a` is replaced with a `!` sign in all words that begin and end with the letter `a`. 
2. The function should return a new string that is equal to the input `str` if no words are found that begin and end with the letter `a`.

Usage example:
```js
replaceASymbol("aba accca zzz wwaww"); // "! ! zzz wwaww"
replaceASymbol("zzz wwaww"); // "zzz wwaww"
```
