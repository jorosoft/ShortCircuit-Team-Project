module.exports = function(repository, models) {
    return {
        addPatient(patient) {
            return repository.add('patients', patient);
        },
        getPatient(filter) {
            return repository.findOne('patients', filter);
        },
    };
};
