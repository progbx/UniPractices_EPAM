export function isValidEmail(str) {
    if (str === null || str === undefined) {
        return false;
    }
    const emailRegex = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,7}$/;
    return emailRegex.test(str);
}