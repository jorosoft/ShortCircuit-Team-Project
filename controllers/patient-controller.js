/* globals global */

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
        getReservationForm(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

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

            global.io.emit('new-reservation', reservation);

            data.addReservation(reservation)
                .then(() => res.redirect('/'));
        },
        getResults(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect('/unauthorized');
            }

            const result = init(req, {});
            result.title = 'Резултати от изслевания';

            res.render('patient/results-view', { result });
        },
        getPatientResults(req, res) {
            data.getPatient({ username: res.user })
                .then((patient) => {
                    data.getResults({ _patientId: patient._id })
                        .then((results) => {
                            res.send(JSON.stringify({ result: results }));
                        });
                });
        },
    };
};
