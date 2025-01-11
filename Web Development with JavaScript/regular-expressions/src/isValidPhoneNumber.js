export function isValidPhoneNumber(str) {
    if (str === null || str === undefined) {
        return false;
    }
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(str);
}