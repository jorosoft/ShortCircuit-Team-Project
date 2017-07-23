module.exports = function(repository, models) {
    return {
        addReservation(reservation) {
            return repository.add('reservations', reservation);
        },
        getReservation(filter) {
            return repository.findOne('reservations', filter);
        },
        getReservations(filter) {
            return repository.find('reservations', filter);
        },
        updateReservation(reservation) {
            return repository.update('reservations', reservation);
        },
    };
};
