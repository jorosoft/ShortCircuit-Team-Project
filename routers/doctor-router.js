const express = require('express');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/doctor-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/addPatient', controller.getAddPatientForm);

    app.use('/', router);
};
