const crypto = require('crypto-js');

module.exports = function() {
    class BaseUser {
        constructor(user, pass) {
            this.user = user;
            this.pass = pass;
        }

        get user() {
            return this.username;
        }

        set user(value) {
            this.username = value.trim();
        }

        get pass() {
            return this.password;
        }

        set pass(value) {
            this.password = new crypto.SHA1(value.trim()).toString();
        }
    }

    class User extends BaseUser {
        constructor(user, pass, firstName, lastName, userType) {
            super(user, pass);
            this.firstName = firstName;
            this.lastName = lastName;
            this.userType = userType;
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

        get userType() {
            return this._userType;
        }

        set userType(value) {
            this._userType = value;
        }
    }

    return {
        getBaseUser(user, pass) {
            return new BaseUser(user, pass);
        },
        getUser(user, pass, firstName, lastName, userType) {
            return new User(user, pass, firstName, lastName, userType);
        },
    };
};
