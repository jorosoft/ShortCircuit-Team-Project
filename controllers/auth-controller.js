const models = require('../models')();
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

            const user = models
                .getUser(req.body.username,
                    req.body.password,
                    req.body.firstName,
                    req.body.lastName);

            data.addUser(user)
                .then((userId) => {
                    if (req.body.doctorType) {
                        const doctor = models.getDoctor(userId,
                            req.body.regNumber,
                            req.body.speciality);

                        data.addDoctor(doctor);
                    } else if (req.body.patientType) {
                        const patient = models.getPatient(userId, req.body.pin);

                        data.addPatient(patient);
                    }
                });

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
