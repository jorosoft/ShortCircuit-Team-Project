module.exports = function(data, models, validator) {
    function init(req, result) {
        if (req.isAuthenticated()) {
            result.user = req.user.username;
            if (req.user._userType === 'doctorType') {
                result.isDoctor = true;
            }

            if (req.user._userType === 'patientType') {
                result.isPatient = true;
            }
        }

        return result;
    }

    return {
        getLoginForm(req, res) {
            const result = init(req, {});
            result.title = 'Вход в системата';

            res.render('auth/login-view', { result });
        },
        getRegisterForm(req, res) {
            const result = init(req, {});
            result.title = 'Регистрация';

            res.render('auth/register-view', { result });
        },
        register(req, res) {
            validator.validatePasswordsMatch(req.body.password,
                req.body.passConfirmation);

            const user = models
                .getUser(req.body.username,
                    req.body.password,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.optradio);

            data.addUser(user)
                .then((userId) => {
                    if (req.body.optradio === 'doctorType') {
                        const doctor = models.getDoctor(userId,
                            req.body.regNumber,
                            req.body.speciality,
                            req.body.medCenter,
                            req.body.city,
                            false);

                        data.addDoctor(doctor);
                    } else if (req.body.optradio === 'patientType') {
                        const patient = models.getPatient(userId, req.body.pin);

                        data.addPatient(patient);
                    }
                })
                .catch(console.log);

            res.redirect('/login');
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            const result = init(req, {});
            result.title = 'Профил';

            res.render('auth/profile-view', { result });
        },
        unauthorized(req, res) {
            const result = init(req, {});
            result.title = 'ГРЕШКА!';

            res.render('unauthorized-view', { result });
        },
        getLoggedUser(req, res) {
            res.send(JSON.stringify({ result: req.user }));
        },
    };
};
