function isValidDate(y, m, d) {
    const date = new Date(y, m - 1, d);
    return date && (date.getMonth() + 1) === m && date.getDate() === Number(d);
}

module.exports = {
    validatePin(pin) {
        if (pin.length !== 10) {
            return false;
        }
        if (/[^0-9]/.test(pin)) {
            return false;
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
            return false;
        }

        let checkSum = 0;
        const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

        for (let ii = 0; ii < weights.length; ++ii) {
            checkSum += weights[ii] * Number(pin.charAt(ii));
        }

        checkSum %= 11;
        checkSum %= 10;

        if (checkSum !== Number(pin.charAt(9))) {
            return false;
        }

        return true;
    },
};
