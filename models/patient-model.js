const constants = require('../common/constants');
const validator = require('../common/validator');

class Patient {
    constructor(userId, pin) {
        this.userId = userId;
        this.pin = pin;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get pin() {
        return this._pin;
    }

    set pin(value) {
        this._pin = value;
    }
}

module.exports = function() {
    return {
        getPatient(userId, pin) {
            return new Patient(userId, pin);
        },
    };
};
