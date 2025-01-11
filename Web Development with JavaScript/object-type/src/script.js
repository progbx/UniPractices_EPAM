function createUser(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName
    };
}

function getFullName(user) {
    if (!user || typeof user.firstName === 'undefined' || typeof user.lastName === 'undefined') {
        return '';
    }
    return user.firstName + ' ' + user.lastName;
}

function getWidth(params) {
    if (!params || !params.styling || !params.styling.sizes || !params.styling.sizes.width) {
        return null;
    }
    return params.styling.sizes.width;
}

function extendObject(obj, isValid) {
    let clonedObj = { ...obj, isValid: isValid };
    return clonedObj;
}

function sumPrices(prices) {
    let sum = 0;
    for (let key in prices) {
        if (typeof prices[key] === 'number' && isFinite(prices[key])) {
            sum += prices[key];
        }
    }
    return sum;
}

function createUserWithFullName(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName,
        setFirstName: function(newFirstName) {
            this.firstName = newFirstName;
        },
        setLastName: function(newLastName) {
            this.lastName = newLastName;
        },
        getFullName: function() {
            return this.firstName + ' ' + this.lastName;
        }
    };
}