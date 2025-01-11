async function getRandomUsers(quantity, nationalities) {
    quantity = quantity || 1;
    nationalities = nationalities || "";
    const url = `https://randomuser.me/api/?results=${quantity}&nat=${nationalities}&inc=name,email,nat&noinfo`;
    const response = await fetch(url);
    const data = await response.json();
    const users = data.results;
    return users;
}

async function getUsers(names) {
    let results = [];
    for (let name of names) {
        try {
            let response = await fetch(`https://api.github.com/users/${name}`);
            let user = await response.json();
            results.push(user);
        }
        catch (error) {
            results.push(null);
        }
    }
    return results;
}

async function createPost(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', options);
    let post = await response.json();
    return post;
}