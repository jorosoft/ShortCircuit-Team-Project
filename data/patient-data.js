module.exports = function(repository, models) {
    return {
        addPatient(patient) {
            repository.add('patients', patient);
        },
    };
};
