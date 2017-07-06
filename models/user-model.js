const crypto = require('crypto-js');

module.exports = function(constants, validator) {
    class BaseUser {
        constructor(user, pass) {
            this.user = user;
            this.pass = pass;
        }

        get user() {
            return this.username;
        }

        set user(value) {
            validator.validateStringLength(value,
                constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

            this.username = value.trim();
        }

        get pass() {
            return this.password;
        }

        set pass(value) {
            validator.validateStringLength(value,
                constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);

            this.password = new crypto.SHA1(value.trim()).toString();
        }
    }

    class User extends BaseUser {
        constructor(user, pass, firstName, lastName) {
            super(user, pass);
            this.firstName = firstName;
            this.lastName = lastName;
        }

        get firstName() {
            return this._firstName;
        }

        set firstName(value) {
            this._firstName = value;
        }

        get lastName() {
            return this._lastName;
        }

        set lastName(value) {
            this._lastName = value;
        }
    }

    return {
        getBaseUser(user, pass) {
            return new BaseUser(user, pass);
        },
        getUser(user, pass, firstName, lastName) {
            return new User(user, pass, firstName, lastName);
        },
    };
};
