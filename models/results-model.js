module.exports = function(constants, validator) {
    class Result {
        constructor(doctorId, patientId, content) {
            this.doctorId = doctorId;
            this.patientId = patientId;
            this.content = content;
        }

        get doctorId() {
            return this._doctorId;
        }

        set doctorId(value) {
            this._doctorId = value;
        }

        get patientId() {
            return this._patientId;
        }

        set patientId(value) {
            this._patientId = value;
        }

        get content() {
            return this._content;
        }

        set content(value) {
            this._content = value;
        }
    }

    return {
        getResult(doctorId, patientId, content) {
            return new Result(doctorId, patientId, content);
        },
    };
};
