module.exports = function(data, models, validator) {
    return {
        getReservationForm(req, res) {
            res.render('patient/reservation-view', {
                result: {
                    title: 'Резервация на час за преглед',
                    user: req.user.username || null,
                },
            });
        },
    };
};
