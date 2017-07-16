const express = require('express');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/patient-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/reservation', controller.getReservationForm)
        .get('/show-results', controller.getResults);

    app.use('/', router);
};
