const userModel = require('../models/user-model');
const validator = require('../common/validator');

module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('auth/login-view', {
                result: {
                    title: 'Вход в системата',
                },
            });
        },
        getRegisterForm(req, res) {
            res.render('auth/register-view', {
                result: {
                    title: 'Регистрация',
                },
            });
        },
        register(req, res) {
            validator.validatePasswordsMatch(req.body.password,
                req.body.passConfirmation);

            const user = userModel
                .getUser(req.body.username, req.body.password);

            data.addUser(user);
            res.redirect('/login');
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            const result = {};
            result.title = 'Профил';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('auth/profile-view', { result });
        },
        unauthorized(req, res) {
            res.render('unauthorized-view', {
                result: {
                    title: 'ГРЕШКА!',
                },
            });
        },
    };
};