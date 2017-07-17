module.exports = function(repository, models) {
    return {
        addPatient(patient) {
            return repository.add('patients', patient);
        },
        getPatient(filter) {
            return repository.findOne('patients', filter);
        },
        getPatients(filter) {
            return repository.find('patients', filter);
        },
        updatePatient(patient) {
            return repository.update('patients', patient);
        },
    };
};
