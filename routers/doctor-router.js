const express = require('express');

module.exports = function(app, data) {
    const controller = require('../controllers/doctor-controller')(data);

    const router = new express.Router();

    router
        .get('/doctor/addPatient', controller.getAddPatientForm);

    app.use('/', router);
};
