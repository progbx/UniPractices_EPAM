# Service workers and PWA

## Add manifest file and service worker to the existing web site

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

Open the file `src/index.html` in your browser and find a site that works well on mobile devices.

1. In the `src` folder, create a file.

### Web App Manifest

Here you need to create a web app manifest file and add it to the page. 

1. Create the file `pwa.webmanifest` in the `src` folder.
2. Requirements for the web app manifest file:
    - Name: `JS PWA Demo`
    - Short Name: `JS PWA`
    - Description: `Demo application of PWA and service workers`
    - Icons: Please use the icons from the `src/icons/icons.json` file
    - Start URL: `index.html`
    - It should be displayed on a full screen
    - Theme Color: `#136a8a`
    - Background Color: `#136a8a`
3. Use the created file as a web app manifest in `src/index.html`

### Service Worker Registration and Notifications

Write the function `initApp` for registering a service worker and adding a handler for showing notifications. 

In the `src` folder, create the file `app.js`. This file should export the function `initApp`:

```js
export function initApp() {
    // Your code
}
```

All the `HTML' and `CSS` required for this task is already created and added to the `index.html` file.

The `initApp` function is already imported and called in `src/index.html`.

Everything described below should be done inside the `initApp` function.

#### Service Worker Registration

If `serviceWorker` exists in the global `navigator` object, register the file `sw.js` as a service worker. 

Please use `sw.js` as the path for registering a service worker.

#### Showing Notification

When a user clicks on a `<button>` with `id="notification-button"`, show a notification using the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API).

##### Requirements  for the notification:

1. Before showing a notification, request permission from the user to do this. 
2. If permission is `granted`, show a notification with the following parameters:
    - Title: `Hello, there!`
    - Body: `I can send you notifications even from outer space!`
    - Notification Image: `images/rocket.jpg`
3. To show a notification, please use the `Notification` constructor.

### Service Worker Implementation

Please write all the code for the service worker in `src/sw.js`, which has already been created but is empty now.

#### Service Worker Installation

On the `"install"` event of this service worker:

1. While installation is in progress, open a cache with the name `'pwa-demo-app-v1'`.
2. Cache all the files from the list below:

```js
const appShellFiles = [
    'index.html',
    'app.js',
    'images/astronaut-crop1.jpg',
    'images/astronaut-crop2.jpg',
    'images/astronaut.jpg',
    'styles/style.css',
    'styles/mobile.css',
    'icons/favicon.ico',
    'icons/icon-32.png',
    'icons/icon-64.png',
    'icons/icon-96.png',
    'icons/icon-128.png',
    'icons/icon-167.png',
    'icons/icon-192.png',
    'icons/icon-256.png',
    'icons/icon-512.png',
];
```
Please note that the order of the files should be the same as above.

#### Fetch Event Handler

On the `"fetch"` event of this service worker, and if the request `URL` starts with `http:` or `https:`:

1. Respond to a request with a cached result if it exists in the cache
2. If a cache does not exist, call the `fetch` function
3. After getting a response, put this new value in the cache with the name `'pwa-demo-app-v1'`
4. Add the clone of the response to the cache
5. Respond to the request with a response from the `fetch` call
