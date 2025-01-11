# Web Components

## Creating custom elements

## Before we start

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

Write classes for custom elements creation. Requirements are below.

Please note that you should edit the `src/script.js` file. We can't verify your solution if you use a different file.

To create custom elements, you must extend `HTMLElement`, or we will not be able to verify them. How to use custom elements: [https://developer.mozilla.org/: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).

**Please, note:**
- Avoid using `innerHTML` for creating elements and styles, or we will not be able to verify them.

### Requirements

1. **class 'MyCounter'**

Create the custom element `my-counter` to display count. Custom elements should contain two buttons (`+` and `-`) to increment or decrement the `count` text field.

```js
class MyCounter extends HTMLElement {
	constructor() {
		super();

		// your code...
	}
};

customElements.define('my-counter', MyCounter);
````
1. Create the custom element `my-counter`.
2. The custom element should contain an element `span` with `id="count"` to display the current `count`. The start value for `count` should be `0`. `count` should be a positive number (count >= 0).
3. The custom element should contain an element `button` with `id="increment"`. Clicking on this button should increment `count`.
4. The custom element should contain an element `button` with `id="decrement"`. Clicking on this button should decrement `count`. It should not decrement if `count` is 0.


2. **class 'DrawSquare'**

Create the custom element `draw-square` to display a square.
```js
class DrawSquare extends HTMLElement {
	constructor() {
		super();

		// your code...
	}
}

customElements.define('draw-square', DrawSquare);
```
1. Create the custom element `draw-square`.
2. The custom element should contain `div`.
3. The `div` element should have a `width` and `height` of `100px`. `background-color` should be `red`.


3. **class 'UserCard'**

Create the custom element `user-card` to display user first and last name using a `slot`.

```js
class UserCard extends HTMLElement {
	constructor() {
		super();

		// your code...
	}
}

customElements.define('user-card', UserCard);
```
1. Create the custom element `user-card`.
2. The custom element should contain a tag `slot` with the attribute `name="firstname"`.
3. The custom element should contain a tag `slot` with the attribute `name="lastname"`.

