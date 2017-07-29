module.exports = function(data, models, constants) {
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
        getChangeProfileForm(req, res) {
            const result = init(req, {});
            result.title = 'Промяна на данни';

            res.render('auth/profile-change-view', { result });
        },
        changeProfileInfo(req, res) {
            const newMedCenter = req.body.medCenter;
            const newCity = req.body.city;
            const userId = req.user._id;

            data.getDoctor({
                    _userId: userId,
                })
                .then((doctor) => {
                    doctor._medCenter = newMedCenter;
                    doctor._city = newCity;
                    data.updateDoctor(doctor);
                    res.redirect('/');
                });
        },
        register(req, res) {
            const result = {};

            req.sanitize('username').trim();
            req.sanitize('password').trim();
            req.sanitize('passConfirmation').trim();
            req.sanitize('firstName').trim();
            req.sanitize('lastName').trim();
            req.checkBody(constants.RULES_USERNAME);
            req.checkBody(constants.RULES_PASSWORD);
            req.checkBody('passConfirmation', 'Паролите не съвпадат!')
                .equals(req.body.password);
            req.checkBody(constants.RULES_FIRSTNAME);
            req.checkBody(constants.RULES_LASTNAME);

            if (!req.body.oprtadio) {
                req.checkBody(constants.RULES_OPTRADIO);
            }

            let errors = req.validationErrors();

            if (errors) {
                result.flash = { messages: errors };
                res.render('auth/register-view', { result });

                return;
            }

            const user = models
                .getUser(req.body.username,
                    req.body.password,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.optradio);

            if (req.body.optradio === 'doctorType') {
                req.sanitize('regNumber').trim();
                req.sanitize('speciality').trim();
                req.sanitize('medCenter').trim();
                req.sanitize('city').trim();
                req.checkBody(constants.RULES_REGNUMBER);
                req.checkBody(constants.RULES_SPECIALITY);
                req.checkBody(constants.RULES_CENTER);
                req.checkBody(constants.RULES_CITYNAME);

                errors = req.validationErrors();

                if (errors) {
                    result.flash = { messages: errors };
                    res.render('auth/register-view', { result });

                    return;
                }

                data.addUser(user)
                    .then((userId) => {
                        const doctor = models.getDoctor(userId,
                            req.body.regNumber,
                            req.body.speciality,
                            req.body.medCenter,
                            req.body.city,
                            false);

                        return data.addDoctor(doctor);
                    })
                    .then(res.redirect('/login'));
            } else if (req.body.optradio === 'patientType') {
                req.sanitize('pin').trim();
                req.checkBody(constants.RULES_PIN);

                errors = req.validationErrors();

                if (errors) {
                    result.flash = { messages: errors };
                    res.render('auth/register-view', { result });

                    return;
                }

                data.addUser(user)
                    .then((userId) => {
                        const patient = models.getPatient(userId, req.body.pin);

                        return data.addPatient(patient);
                    })
                    .then(res.redirect('/login'));
            }
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Профил';

            const user = req.user;
            result.firstName = user._firstName;
            result.lastName = user._lastName;

            if (user._userType === 'patientType') {
                result.isPatient = true;

                data.getPatient({ _userId: user._id })
                    .then((patient) => {
                        result.pin = patient._pin;
                        res.render('auth/profile-view', { result });
                    });
            } else {
                result.isPatient = false;

                data.getDoctor({ _userId: user._id })
                    .then((doctor) => {
                        result.regNum = doctor._regNumber;
                        result.speciality = doctor._speciality;
                        result.medCenter = doctor._medCenter;
                        result.city = doctor._city;

                        res.render('auth/profile-view', { result });
                    });
            }
        },
        getUserProfile(req, res) {
            const result = {};
            result.title = 'Профил';
            result.user = req.params.username;

            const user = req.user;
            result.firstName = user._firstName;
            result.lastName = user._lastName;

            if (user._userType === 'patientType') {
                result.isPatient = true;
                data.getPatient({ _userId: user._id })
                    .then((patient) => {
                        result.pin = patient._pin;
                        res.render('auth/profile-view', { result });
                    });
            } else {
                result.isPatient = false;
                data.getDoctor({ _userId: user._id })
                    .then((doctor) => {
                        result.regNum = doctor._regNumber;
                        result.speciality = doctor._speciality;
                        result.medCenter = doctor._medCenter;
                        result.city = doctor._city;

                        res.render('auth/profile-view', { result });
                    });
            }
        },
        unauthorized(req, res) {
            const result = init(req, {});
            result.title = 'ГРЕШКА!';

            res.render('auth/unauthorized-view', { result });
        },
        getLoggedUser(req, res) {
            res.send(JSON.stringify({ result: req.user }));
        },
    };
};
