export async function getFriendNames(userId) {
    const response = await fetch(`https://example.com/users/${userId}/friends`);
    const data = await response.json();
    return data.map((friend) => friend.name);
}