module.exports = function() {
    class Recipe {
        constructor(doctorId, patientId, expirationDate, content) {
            this.doctorId = doctorId;
            this.patientId = patientId;
            this.expirationDate = expirationDate;
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

        get expirationDate() {
            return this._expirationDate;
        }

        set expirationDate(value) {
            this._expirationDate = value;
        }

        get content() {
            return this._content;
        }

        set content(value) {
            this._content = value;
        }
    }

    return {
        getRecipe(doctorId, patientId, expirationDate, content) {
            return new Recipe(doctorId, patientId, expirationDate, content);
        },
    };
};
