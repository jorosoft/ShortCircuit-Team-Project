const crypto = require('crypto-js');
const constants = require('../common/constants');
const validator = require('../common/validator');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        validator.validateStringLength(value,
            constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

        this._username = value.trim();
    }

    get password() {
        return this._password;
    }

    set password(value) {
        validator.validateStringLength(value,
            constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);

        this._password = new crypto.SHA1(value.trim()).toString();
    }
}

class Patient extends User {
    constructor(username, password, pin) {
        super(username, password);
        this.pin = pin;
    }

    get pin() {
        return this._pin;
    }

    set pin(value) {
        this._pin = value;
    }
}

class Doctor extends User {
    constructor(username, password, regNumber, speciality) {
        super(username, password);
        this.regNumber = regNumber;
        this.speciality = speciality;
    }

    get regNumber() {
        return this._regNumber;
    }

    set regNumber(value) {
        this._regNumber = value;
    }

    get speciality() {
        return this._speciality;
    }

    set speciality(value) {
        this._speciality = value;
    }
}

module.exports = {
    getUser(username, password) {
        return new User(username, password);
    },
    getPatient(username, password, pin) {
        return new Patient(username, password, pin);
    },
    getDoctor(username, password, regNumber, speciality) {
        return new Doctor(username, password, regNumber, speciality);
    },
};
