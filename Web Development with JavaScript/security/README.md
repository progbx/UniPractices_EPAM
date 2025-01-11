# Security

## Dealing With Security Vulnerabilities

## Before you start


1. This practical task is verified automatically with tests.
2. Please, put all your `JavaScript` code in the `src/script.js` files. Custom elements from `src/script.js` are used in the `src/index.html`. If you use any other file, we would not be able to verify it.
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

Rewrite or change functions to meet security requirements.

Please note that you should edit the `src/script.js` file. We can't verify your solution if you use a different file.

To create a function, you must use `Function Declaration`, or we will not be able to verify it. How to use `Function Declaration`: [javascript.info: Function Declaration](https://javascript.info/function-basics#function-declaration)

### Requirements for the functions

1. **function 'crossSiteScripting'**
 Avoid using the `innerHTML` method. If userInput contains a malicious script, it will be inserted directly into the HTML document and executed when the page is rendered. This can enable attackers to execute arbitrary JavaScript code on the user's browser, leading to unauthorized actions, data theft, or further exploitation.
 ```js
export function crossSiteScripting (userInput) {
document.getElementById("output").innerHTML = userInput;
// change the code above
}
crossSiteScripting("<script>alert('XSS attack!');</script>");
```
 Remove `innerHTML` and use a method for the text instead.
  
2. **function 'remoteCodeExecution'**
 In vulnerable code, `eval` is used to execute arbitrary code provided by the user. This poses a significant security risk as the user can execute any JavaScript code, including malicious actions like stealing sensitive information or manipulating the application.
To fix the vulnerability, `eval` should not be used at all. Instead, consider alternative approaches.
 ```js
export function remoteCodeExecution (userInput) {
eval(userInput);
    // remove eval, create new function based on user input instead
}
 remoteCodeExecution('alert("Vulnerable code execution!")');
```
 Use `new Function()`: This allows you to dynamically create a function and execute the code within it. It provides better control and isolation.
 
 3. **function 'SQLInjection'**
 Sanitize user input to prevent SQL injection from the user input.
 ```js
export function SQLInjection(userInput) {
    // your code here ...
}
 SQLInjection('42 OR 1=1'); // should return null
SQLInjection('42');        // should return "SELECT * FROM users WHERE id = 42"
```
 1. If an input is not a number or string that contains only number characters, return `null`.
2. If an input is a number or string that contains only number characters, return `"SELECT * FROM users WHERE id = " + userInput`.
  
4. **function 'safeRequest'**
 Add common security headers to improve the security of a request.
 ```js
export async function safeRequest() {
const url = 'https://jsonplaceholder.typicode.com/posts';
const headers = {
// add headers here..
};
 return await fetch(url, {
method: 'POST',
headers: headers,
});
}
 safeRequest();
``` 
Add security headers in the headers object:
1. `Content-Type`: This header is set to `application/json` to prevent potential security vulnerabilities that could arise from the server misinterpreting the data.
2. `Authorization`: This header is set to `Bearer token` to ensure that only authenticated and authorized users can access sensitive data and perform authorized actions on the API.
3. `X-Content-Type-Options`: This header is set to `nosniff` to prevent browsers from interpreting responses with incorrect MIME types.
4. `X-Frame-Options`: This header is set to `deny` to prevent the API from being loaded in an iframe, which protects against clickjacking attacks.
5. `X-XSS-Protection`: This header is set to `1; mode=block` to enable the browser's built-in XSS protection mechanism.
6. `Strict-Transport-Security`: This header is set to `max-age=31536000; includeSubDomains; preload` to enforce the use of HTTPS for secure communication.

