module.exports = function(data) {
    return {
        getAddPatientForm(req, res) {
            res.render('doctor/add-patient-view', {
                result: {
                    title: 'Добавяне на пациент',
                    user: req.user.username || null,
                },
            });
        },
    };
};
