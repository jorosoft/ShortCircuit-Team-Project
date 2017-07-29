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

    function getDefaultSchema() {
        return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    }

    return {
        addPatient(req, res) {
            const result = init(req, {});

            req.sanitize('pin').trim();
            req.checkBody(constants.RULES_PIN);

            const errors = req.validationErrors();

            if (errors) {
                result.flash = { messages: errors };
                res.render('doctor/add-patient-view', { result });

                return;
            }

            const egn = req.body.pin;
            const userId = req.user._id;

            Promise.all(
                    [
                        data.getPatient({
                            _pin: egn,
                        }),
                        data.getDoctor({
                            _userId: userId,
                        }),
                    ]
                )
                .then(([patient, doctor]) => {
                    patient._doctorId = doctor._id;
                    doctor.hasPatients = true;
                    data.updatePatient(patient);
                    data.updateDoctor(doctor);
                    res.redirect('/');
                })
                .catch((error) => {
                    res.redirect('/add-patient');
                });
        },
        addRecipe(req, res) {
            const result = init(req, {});

            req.sanitize('pin').trim();
            req.sanitize('content').trim();
            req.checkBody(constants.RULES_PIN);
            req.checkBody(constants.RULES_CONTENT);

            const errors = req.validationErrors();

            if (errors) {
                result.flash = { messages: errors };
                res.render('doctor/add-recipe-view', { result });

                return;
            }

            const patientEgn = req.body.pin;
            const content = req.body.content;
            const doctorId = req.user._id;
            const expDate = req.body.expDate;
            const dateParts = expDate.split('.');
            const parsedDate =
                new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            data.getPatient({
                    _pin: patientEgn,
                })
                .then((patient) => {
                    data.addRecipe(
                        models
                        .getRecipe(doctorId, patient._id, parsedDate, content)
                    );
                    res.redirect('/');
                })
                .catch((err) => {
                    res.redirect('/add-recipe');
                });
        },
        addResult(req, res) {
            const result = init(req, {});

            req.sanitize('pin').trim();
            req.sanitize('content').trim();
            req.checkBody(constants.RULES_PIN);
            req.checkBody(constants.RULES_CONTENT);

            const errors = req.validationErrors();

            if (errors) {
                result.flash = { messages: errors };
                res.render('doctor/add-result-view', { result });

                return;
            }

            const pin = req.body.pin;
            const content = req.body.content;

            data.getPatients({ _pin: pin })
                .then((pat) => {
                    const r = models.getResult(
                        pat[0]._doctorId,
                        pat[0]._id, content,
                        new Date(Date.now()));
                    data.addResult(r);
                    res.redirect('/');
                })
                .catch((err) => {
                    res.redirect('/add-result');
                });
        },
        getAddPatientForm(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Добавяне на пациент';

            res.render('doctor/add-patient-view', { result });
        },
        getAddRecipeForm(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Добавяне на рецепта';

            res.render('doctor/add-recipe-view', { result });
        },
        getAddResultForm(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Добавяне на резултат';

            res.render('doctor/add-result-view', { result });
        },
        getScheduleSchema(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Приемно време';
            const userId = req.user._id;
            data.getDoctors({ _userId: userId })
                .then((doc) => {
                    if (doc[0].hasOwnProperty('_scheduleSchema')) {
                        result._hasSchema = true;
                        result._scheduleSchema = doc[0]._scheduleSchema;
                    } else {
                        result._hasSchema = false;
                    }

                    result._defaultSchema = getDefaultSchema();

                    res.render('doctor/schedule-schema-view', { result });
                });
        },
        setScheduleSchema(req, res) {
            const mondayBegin = +req.body.mondayBegin
                .substring(0, req.body.mondayBegin.length - 3);
            const mondayEnd = +req.body.mondayEnd
                .substring(0, req.body.mondayEnd.length - 3);
            const tuesdayBegin = +req.body.tuesdayBegin
                .substring(0, req.body.tuesdayBegin.length - 3);
            const tuesdayEnd = +req.body.tuesdayEnd
                .substring(0, req.body.tuesdayEnd.length - 3);
            const wednesdayBegin = +req.body.wednesdayBegin
                .substring(0, req.body.wednesdayBegin.length - 3);
            const wednesdayEnd = +req.body.wednesdayEnd
                .substring(0, req.body.wednesdayEnd.length - 3);
            const thursdayBegin = +req.body.thursdayBegin
                .substring(0, req.body.thursdayBegin.length - 3);
            const thursdayEnd = +req.body.thursdayEnd
                .substring(0, req.body.thursdayEnd.length - 3);
            const fridayBegin = +req.body.fridayBegin
                .substring(0, req.body.fridayBegin.length - 3);
            const fridayEnd = +req.body.fridayEnd
                .substring(0, req.body.fridayEnd.length - 3);
            const isValidSchema = (mondayBegin < mondayEnd) &&
                (tuesdayBegin < tuesdayEnd) &&
                (wednesdayBegin < wednesdayEnd) &&
                (thursdayBegin < thursdayEnd) &&
                (fridayBegin < fridayEnd);

            if (!isValidSchema) {
                throw new Error('Невалидна схема!');
            }

            const schema = {
                monday: { begin: mondayBegin, end: mondayEnd },
                tuesday: { begin: tuesdayBegin, end: tuesdayEnd },
                wednesday: { begin: wednesdayBegin, end: wednesdayEnd },
                thursday: { begin: thursdayBegin, end: thursdayEnd },
                friday: { begin: fridayBegin, end: fridayEnd },
            };
            const userId = req.user._id;

            data.getDoctors({ _userId: userId })
                .then((doc) => {
                    doc[0]._scheduleSchema = schema;

                    return data.updateDoctor(doc[0]);
                })
                .then(() => res.redirect('/'));
        },
        getSchedule(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Седмичен график';
            result._defaultSchema = getDefaultSchema();
            const today = new Date();
            const day = today.getDay();
            let startOffset;

            if (day === 0) {
                startOffset = 1;
            } else if (day === 6) {
                startOffset = 2;
            } else {
                startOffset = -(day - 1);
            }

            const dd = today.getDate();
            const mm = today.getMonth();
            const yyyy = today.getFullYear();

            const beginDate = new Date(yyyy, mm, dd, 12, 0, 0, 0);
            beginDate.setDate(beginDate.getDate() + startOffset);
            const endDate = new Date(yyyy, mm, dd, 12, 0, 0, 0);
            endDate.setDate(endDate.getDate() + (startOffset + 4));

            const weekDays = [];
            for (let i = 0; i < 5; i += 1) {
                const date = new Date(beginDate);
                date.setDate(date.getDate() + i);
                weekDays.push(date);
            }

            result.weekDays = weekDays;

            data.getDoctor({ _userId: req.user._id })
                .then((doc) => {
                    result.mySchema = doc._scheduleSchema;

                    return Promise.all([data.getReservations({
                        _doctorId: doc._id.toString(),
                        _date: {
                            $gte: beginDate.toISOString(),
                            $lte: endDate.toISOString(),
                        },
                    }), data.getUsers({})]);
                })
                .then(([reservations, users]) => {
                    reservations.forEach((reservation) => {
                        users.forEach((user) => {
                            if (reservation._userId.toString() ===
                                user._id.toString()) {
                                reservation._firstName = user._firstName;
                                reservation._lastName = user._lastName;
                            }
                        });
                    });

                    result.reservations = reservations;

                    res.render('doctor/schedule-view', { result });
                });
        },
        getPatientsList(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Моите пациенти';
            const userId = req.user._id;

            data.getDoctors({ _userId: userId })
                .then((doc) => {
                    return Promise.all([
                        data.getPatients({ _doctorId: doc[0]._id }),
                        data.getUsers({ _userType: 'patientType' }),
                    ]);
                })
                .then(([patients, users]) => {
                    patients.forEach((patient) => {
                        users.forEach((user) => {
                            if (patient._userId.toString() ===
                                user._id.toString()) {
                                patient._firstName = user._firstName;
                                patient._lastName = user._lastName;
                            }
                        });
                    });

                    result.patients = patients;

                    res.render('doctor/patients-list-view', { result });
                });
        },
        getReservations(req, res) {
            const params = req.params.params.split(';');
            const doctorId = params[0].split('=')[1];
            const date = params[1].split('=')[1];
            const searchedDate = new Date(date).toISOString();

            data.getReservations({ _doctorId: doctorId, _date: searchedDate })
                .then((reservations) => {
                    res.send({ result: reservations });
                });
        },
    };
};
