export function crossSiteScripting(userInput) {
    const output = document.getElementById("output");
    output.textContent = userInput;
}

export function remoteCodeExecution(userInput) {
    try {
        const func = new Function(userInput);
        func();
    } catch (e) {
        console.error("Error executing code: ", e);
    }
}

export function SQLInjection(userInput) {
    if (/^\d+$/.test(userInput)) {
        return `SELECT * FROM users WHERE id = ${userInput}`;
    } else {
        return null;
    }
}

export async function safeRequest() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'deny',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    }; 
    return await fetch(url, {
        method: 'POST',
        headers: headers,
    });
}

module.exports = { crossSiteScripting, remoteCodeExecution, SQLInjection, safeRequest };