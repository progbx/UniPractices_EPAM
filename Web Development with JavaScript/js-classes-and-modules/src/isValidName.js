function isValidName(name) {
    return !!name && typeof name === 'string' && name.trim().length > 1;
}

export default isValidName;