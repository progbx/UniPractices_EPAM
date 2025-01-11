export function getAverageAge(arr) {
    const uniqueUsers = _.uniqBy(arr, 'name');
    const totalAge = _.sumBy(uniqueUsers, 'age');
    return totalAge / uniqueUsers.length;
}