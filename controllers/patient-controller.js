module.exports = function(data) {
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
