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

    function getDefaultSchema() {
        return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    }

    return {
        addPatient(req, res) {
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
                    data.updatePatient(patient);
                    res.redirect('/');
                });
        },
        getAddPatientForm(req, res) {
            const result = init(req, {});
            result.title = 'Добавяне на пациент';

            res.render('doctor/add-patient-view', { result });
        },
        getAddRecipeForm(req, res) {
            const result = init(req, {});
            result.title = 'Добавяне на рецепта';

            res.render('doctor/add-recipe-view', { result });
        },
        getAddResultForm(req, res) {
            const result = init(req, {});
            result.title = 'Добавяне на резултат';

            res.render('doctor/add-result-view', { result });
        },
        getScheduleSchema(req, res) {
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
            const result = init(req, {});
            result.title = 'Седмичен график';
            result._defaultSchema = getDefaultSchema();

            res.render('doctor/schedule-view', { result });
        },
        getGetPatientsList(req, res) {
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
        getreservations(req, res) {
            const params = req.params.params.split(';');
            const doctorId = params[0].split('=')[1];
            const date = params[1].split('=')[1];

            data.getReservations({ _doctorId: doctorId, _date: date })
                .then((reservations) => {
                    res.send({ result: reservations });
                });
        },
    };
};
