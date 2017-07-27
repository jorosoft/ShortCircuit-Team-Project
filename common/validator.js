function isValidDate(y, m, d) {
    const date = new Date(y, m - 1, d);
    return date && (date.getMonth() + 1) === m && date.getDate() === Number(d);
}

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
    validatePin(pin) {
        if (pin.length !== 10) {
            throw new Error('Invalid pin length!');
        }
        if (/[^0-9]/.test(pin)) {
            throw new Error('Pin should be numbers only!');
        }
        let year = Number(pin.slice(0, 2));
        let month = Number(pin.slice(2, 4));
        const day = Number(pin.slice(4, 6));

        if (month >= 40) {
            year += 2000;
            month -= 40;
        } else if (month >= 20) {
            year += 1800;
            month -= 20;
        } else {
            year += 1900;
        }

        if (!isValidDate(year, month, day)) {
            throw new Error('Invalid date for Pin!');
        }

        let checkSum = 0;
        const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

        for (let ii = 0; ii < weights.length; ++ii) {
            checkSum += weights[ii] * Number(pin.charAt(ii));
        }

        checkSum %= 11;
        checkSum %= 10;

     /*   if (checkSum !== Number(pin.charAt(9))) {
            throw new Error();
        }*/
    },
    validateUserName(username){
        if (username.length <= 2 || username.length >= 17){
            throw new Error('Invalid username length!');
        }
    },
    validateName(name){
        if (name.length <= 2 || name.length >= 15){
            throw new Error('Invalid name length!');
        }

    }
};
