module.exports = function(constants, validator) {
    class Patient {
        constructor(userId, pin, doctorId) {
            this.userId = userId;
            this.pin = pin;
            this.doctorId = doctorId;
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

        get doctorId() {
            return this._doctorId;
        }

        set doctorId(value) {
            this._doctorId = value;
        }
    }

    return {
        getPatient(userId, pin, doctorId) {
            return new Patient(userId, pin, doctorId);
        },
    };
};
