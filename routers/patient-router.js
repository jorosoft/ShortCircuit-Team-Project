const express = require('express');

module.exports = function(app, data) {
    const controller = require('../controllers/patient-controller')(data);

    const router = new express.Router();

    router
        .get('/reservation', controller.getReservationForm);

    app.use('/', router);
};
