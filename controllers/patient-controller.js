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
        getReservationForm(req, res) {
            const result = init(req, {});
            result.title = 'Резервация на час за преглед';

            res.render('patient/reservation-view', { result });
        },
        reservation(req, res) {
            const reservation = {
                _doctorId: req.body.doctorId,
                _userId: req.body.userId,
                _date: req.body.date,
                _hour: req.body.hour,
            };

            data.addReservation(reservation)
                .then(() => res.redirect('/'));
        },
        getResults(req, res) {
            const result = init(req, {});
            result.title = 'Резултати от изслевания';

            res.render('patient/results-view', { result });
        },
        getPatientResults(req, res) {
            data.getPatient({ username: res.user })
                .then((patient) => {
<<<<<<< .mine
                    data.getResults();
                    console.log(patient);
                })
                .then((results) => {
                    res.send(JSON.stringify({ result: results }));
                    console.log(results);
                });
=======
                    data.getResults({ _patientId: patient._id })
                        .then((results) => {
                            res.send(JSON.stringify({ result: results }));
                        });
                });


>>>>>>> .theirs
        },
    };
};
