module.exports = function(repository, models) {
    return {
        addDoctor(doctor) {
            return repository.add('doctors', doctor);
        },
        getDoctors(filter) {
            return repository.find('doctors', filter);
        },
        updateDoctor(doctor) {
            return repository.update('doctors', doctor);
        },
    };
};
