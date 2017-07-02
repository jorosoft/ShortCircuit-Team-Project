module.exports = {
    validateStringLength(value, minLength, maxLength) {
        if (!value || typeof value !== 'string' ||
            value.length < minLength || value.length > maxLength) {
            throw new Error('Invalid input length!');
        }
    },
    validatePasswordsMatch(pass, passConfirm) {
        if (pass !== passConfirm) {
            throw new Error('Password does not match password confirmation!');
        }
    },
};
