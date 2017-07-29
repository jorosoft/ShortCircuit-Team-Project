module.exports = function() {
    class Result {
        constructor(doctorId, patientId, content, date) {
            this.doctorId = doctorId;
            this.patientId = patientId;
            this.content = content;
            this.date = date;
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

        get date() {
            return this._date;
        }

        set date(value) {
            this._date = value;
        }
    }

    return {
        getResult(doctorId, patientId, content, date) {
            return new Result(doctorId, patientId, content, date);
        },
    };
};
