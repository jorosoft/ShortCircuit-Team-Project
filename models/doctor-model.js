const constants = require('../common/constants');
const validator = require('../common/validator');

class Doctor {
    constructor(userId, regNumber, speciality) {
        this.userId = userId;
        this.regNumber = regNumber;
        this.speciality = speciality;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
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
    getDoctor(regNumber, speciality) {
        return new Doctor(regNumber, speciality);
    },
};
