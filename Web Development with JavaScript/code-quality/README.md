# Code Quality

## Making your code follow clean code priciples

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

In the files for these tasks, you will need to adjust the existing code based on the best practices you learned in the lesson: 
•	`DRY`
•	`KISS`
•	`YAGNI`


##Before you start editing the code, please review it carefully..

### 1. DRY

`DRY` simply means "Don't repeat yourself!" In other words, you should try to avoid duplicated code. Instead, you should reuse code when possible.

In the `src/dry.js` file, you can see three functions.


#### 1.1. Functions percentFormatter and currencyFormatter

The code for this function is duplicated. The only difference is the function names. Replace these two functions with one with the same code and name: `formatter`.

The `dry.js` file should export the function `formatter`.

```js
export function formatter(num, symbol) {
    // your code
}
```

#### 1.2. Function generateGreetUserMessage

1. Merge duplicated conditions. 

This function has identical conditions: `user.isLoggedIn && user.age > 18` and `user.age > 18 && user.isLoggedIn`.

Remove the duplication and update the function to return: `Hello, ${user.name}! Thank you, for your purchase!` in this case.

2.	Remove the redundant `else` clauses.
In this function, `else` clauses are not required because from `if` clauses are returned.

3. Remove the redundant variable `message`.
4. Verify that the function doesn't have an unreachable `return` at the bottom.

### 2. KISS

`KISS` stands for `Keep it simple, stupid`. In other words, you should try to avoid unnecessary complexity, you shouldn't over-engineer code, and there should be no further explanations. Code should be simple, concise, and easy to understand.

In the `src/kiss.js` file, you can see one function: `calculateDiscountedPrice`.

**Requirements**:

1. Replace five separate parameters with one object parameter. 

When a function has four or more parameters, its maintainability decreases significantly, and the number of errors increases when the developer changes something.

Replace five parameters with object parameters. Each property of an object replaces the corresponding parameter.

```js
export function calculateDiscountedPrice(params) {
    // ...
}

// This object format:
let params = {
    basePrice: 100, // replaces bPrice parameter
    discountPercentage: 20, // replaces d_Percent parameter
    taxPercentage: 8.25, // replaces tPercent parameter
    shippingCost: 5, // replaces s_Cost parameter
    couponCode: 'ABCDE1' // replaces cCode parameter
};

```
2.	Make sure all variables use the `camelCase` naming convention. 
It is much easier to work with code that uses a consistent naming convention. Initially, the function had non-`camelCase` variables: `d_Percent` and `s_Cost`. Make sure they are replaced.
3.	Replace the nested `if` statement with the function call. 
Nesting `if` statements can increase the complexity of your code and decrease its maintainability.

The function contains the following block:

```js
if (cCode) {
    if (cCode.length !== 6) {
        throw new Error('Invalid coupon code');
    }

    let dAmount = (total * 0.1);
    total -= dAmount;
}
```

Replace the nested `if` with a function for calculating the total price with a discount.

This new function should use an object as a parameter. 
This object should have two properties: 
- `couponCode`: the value from the main function parameter object
- `total`: the current calculated total

Function signature:
```js
function getTotalWithCoupon({ couponCode, total }) {
    // Your code
}
```

The function should replace the following block:
```js
if (cCode.length !== 6) {
    throw new Error('Invalid coupon code');
}

let dAmount = (total * 0.1);
total -= dAmount; // Updated total value
```
And it should return an updated total value.

An example of using the function:
```js
let total = subTotal + totalAmount + shippingCost;

if (couponCode) {
    total = getTotalWithCoupon({ couponCode, total });
}
```

### YAGNI

`YAGNI` stands for `You aren't gonna need it`. The `YAGNI` principle says you shouldn't add anything you don't absolutely need. Functionality should only be implemented in a program when it is clear that it is needed.

The `src/yagni.js` file contains the function `searchEmployees` to search for employees by name.

The initial requirements for this function were:
1. It should take two parameters: 
- `employees`: an array of employee objects with the following structure:
```js
{
    name: 'Bob Smith', // employee name
    jobTitle: 'developer', // employee job title
    department: 'IT Department' // employee department
}
```
- `search`: a string to search.

2.	The function should search the `employees` array and return an array of employees who have a string from the `search` parameter in the `name` property of an employee object.

An example of using the function

```js
let employees = [
    {
        name: 'Bob Smith', 
        jobTitle: 'developer',
        department: 'IT Department' 
    },

    {
        name: 'Robert Jones', 
        jobTitle: 'developer',
        department: 'other' 
    }
];

const filteredEmployees = searchEmployees(employees, 'Bob');
// filteredEmployees:
/*
[
    {
        name: 'Bob Smith', 
        jobTitle: 'developer',
        departmennt: 'IT Department' 
    }
]
*/
```

3. `search`: The parameter is **always a string**, and it always persists.
4. The function **should not search by other user object fields** like `jobTitle` and `department`.

#### Task: Update the function code based on the YAGNI principle 

Remove all redundant code that doesn't fit requirements.
