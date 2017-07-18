module.exports = function(repository, models) {
    return {
        addDoctor(doctor) {
            return repository.add('doctors', doctor);
        },
        getDoctor(filter) {
            return repository.findOne('doctors', filter);
        },
        getDoctors(filter) {
            return repository.find('doctors', filter);
        },
        updateDoctor(doctor) {
            return repository.update('doctors', doctor);
        },
    };
};
