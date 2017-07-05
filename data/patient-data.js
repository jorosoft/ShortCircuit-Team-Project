const models = require('../models')();

module.exports = function(repository) {
    return {
        addPatient(patient) {
            repository.add('patients', patient);
        },
    };
};
