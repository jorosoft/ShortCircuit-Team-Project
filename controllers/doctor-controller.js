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
            result.title = 'Приемни часове';

            res.render('doctor/schedule-schema-view', { result });
        },
        getSchedule(req, res) {
            const result = init(req, {});
            result.title = 'Седмичен график';

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
    };
};
