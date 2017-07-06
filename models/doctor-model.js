module.exports = function(constants, validator) {
    class Doctor {
        constructor(userId, regNumber, speciality, medCenter, city) {
            this.userId = userId;
            this.regNumber = regNumber;
            this.speciality = speciality;
            this.medCenter = medCenter;
            this.city = city;
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

        get medCenter() {
            return this._medCenter;
        }

        set medCenter(value) {
            this._medCenter = value;
        }

        get city() {
            return this._city;
        }

        set city(value) {
            this._city = value;
        }
    }

    return {
        getDoctor(userId, regNumber, speciality, medCenter, city) {
            return new Doctor(userId, regNumber, speciality, medCenter, city);
        },
    };
};
