# NodeJS intro

## Write scripts for NodeJS.

## Before you start
1. This practical task is verified automatically with tests. 
2. Please don't change the page structure if it is not required for the task. This may affect the tests.
	 
## Check your solution before submitting it (OPTIONAL)
	 
To be sure you submit a correct solution, you can verify it locally, which requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
	 
### Requirements for the tasks
	 
1. **Implement a CLI tool for working with files:**
	 
For this task, you should implement a CLI program that creates a copy of the `test.txt` file or renames it, depending on the parameters passed. 
	 
Please put your solution in the file `src/manage-file.js`. You should run the command from the `src` folder, so if you open a console from the project root, you need to get inside the src folder before running a command, like this:
```bash
cd ./src
```
For your convenience, we already created a `test.txt` file to work with. You can use any other file if you want.
	 
Your code should work like this:
```bash
node manage-file.js --copy test.txt --to backup-test.txt
```
and 
```bash
node manage-file.js --rename test.txt --to new-test.txt
```
where:
- `manage-file.js`: the entry point for your CLI program;   
- `test.txt`: the file that needed to be copied or renamed;     
- `backup-test.txt`: the name of the copy.
- `new-test.txt`: the new name for the file `test.txt`.
	 
**Please note:**
- The order in which parameters are passed is important and should be the same as the order described above.
- If `backup-test.txt` or `new-test.txt` is omitted in the command line (i.e., nothing comes after the `--to` flag or it's not passed) for creating a new file name or renaming a file, the default value `default.txt` should be used.
```bash
node manage-file.js --copy test.txt
# The file test.txt should be copied to default.txt
node manage-file.js --rename test.txt
# The file test.txt should be renamed to default.txt
```
- If an incorrect command name is specified (neither `rename` nor `copy`), an error should be thrown. The text of the error should be the following: `"Invalid command name! Please specify either copy or rename!"`. Please use the global `Error` constructor for it. The error message above should be passed as a parameter to an `Error` constructor. You can learn how to throw an error here: [Throwing our errors](https://javascript.info/try-catch#throwing-our-own-errors)     
- The names of files (arguments after flags) must not start with `--`, or an error should be thrown. The text of the error should be the following: `Invalid arguments! The value should not start with --!`. 
```bash
node manage-file.js --copy test.txt --to --backup-test.txt
# An error is thrown with the message: Invalid arguments! The value should not start with --!
```
- Your CLI program should work asynchronously. This means reading and writing of files should be asynchronous and should not block the program execution.
	 
2. **Create a simple HTTP server with an endpoint**
	 
For this task, you need to implement a simple web server that returns data in `JSON` format as a response to an HTTP request. 
	 
To create a server using the `http` module, you may not use any framework (like `express`).
	 
All your code should be put into two files. Please follow the requirements:
**index.js file**
- In the folder `src/server`, create the file `index.js`.
- In this file, you should import the `startServer` function and call it.
- Using the returned server object, make the server listen on port `3000`.
- After your server starts logging to the console using `console.log` the message should appear: `Server started and listening on port 3000`.
	 
**startServer.js file:**
- In the folder `src/server`, create the file `startServer.js`.
- This file should export the `startServer` function like this:
```js
function startServer() {
	// your code
}
module.exports = { startServer };
```
- The `startServer` function should return a configure server object: the result of the `http.createServer` call. 
- This function should create a simple server.
- Use `countries.json` as data for the server.
- The response must be in a valid JSON format with a valid `Content-Type` header.
- The response from the server should differ based on the URLs:
	- The `http://localhost:3000` must return the entire array given in the `countries.json` file.
	- For example, the `URL` with the country name `http://localhost:3000/uzbekistan` must return only data for this country, i.e.:
```js
[{"country": "Uzbekistan", "capital": "Tashkent", "population": "34920000"}]
```
- Please note that the country name passed in `URL` **is not case-sensitive**. For instance, `http://localhost:3000/uzbekistan` should work the same as `http://localhost:3000/UzBekIstan`
- A `URL` with a country name that doesn't present in `countries.json`—for example, `http://localhost:3000/chili`—must return a `JSON` object with the message `{ "message": "no such country in the list."}`.
	 
**You should run your server** from the `src` folder. So, if you open a console from the project root, you need to get inside the src folder before running a command, like this:
```bash
cd ./src
```
To run your code from an `src` folder:
```bash
node server
```
**To stop server** press `CTRL + C` on the keyboard.
	 
3. **Compile ES6 to ES5:**
	 
For this task, you need to create a NodeJS application that compiles the file `input.js` written in `ES6` syntax into the file `output.js` in `ES5` syntax. Please follow the steps below:
- In the directory `node-project`, initialize a new `Node(NPM)` project. Make sure the `package.json` file appears after the initialization.
- Install the necessary packages for working with babel, `@babel/cli`, `@babel/core`, and `@babel/preset-env`, as `devDependencies`. Please do this inside the `src/node-project`. Also, make sure they appear in `devDependencies`. 
- Inside the `src/node-project` folder, create a new file called `.babelrc` for configuring babel, and put the following code in it:
```json
{
    "presets": [
      [
        "@babel/preset-env"
      ]
    ]
}   
```              
- Add the npm script `build` into the `"scripts"` property of your `package.json`.
- This script should run `babel` for `input.js` inside the `node-project` folder. 
- The results of the run should be inside the `node-project/lib/output.js` file.
- Run the command `npm run build` and check to see if it works as expected. Please make sure you run this command inside the `src/node-project` folder. Otherwise, it will not work properly.
- For more information, please visit [Babel docs](https://babeljs.io/docs/en/usage)
	 
An example of using the application:
```bash
# Starting with the project root folder
cd ./src/node-project # Go inside the "node-project" folder
# You should only do this if you are not inside of it initially
    
npm run build
# After the run, file src/node-project/lib/output.js should appear with ES5 syntax inside.
```
