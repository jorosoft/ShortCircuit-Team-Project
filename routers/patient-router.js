const express = require('express');

module.exports = function(app, data, models, constants) {
    const controller =
        require('../controllers/patient-controller')(data, models, constants);

    const router = new express.Router();

    router
        .get('/reservation', controller.getReservationForm)
        .post('/reservation', controller.reservation)
        .get('/show-results', controller.getResults)
        .get('/show-patient-results', controller.getPatientResults);

    app.use('/', router);
};
