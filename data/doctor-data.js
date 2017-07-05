const models = require('../models')();

module.exports = function(repository) {
    return {
        addDoctor(doctor) {
            repository.add('doctors', doctor);
        },
    };
};
