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
        getResults(req, res) {
            const result = init(req, {});
            result.title = 'Резултатти от изслевания';

            res.render('patient/results-view', { result });
        },
    };
};
