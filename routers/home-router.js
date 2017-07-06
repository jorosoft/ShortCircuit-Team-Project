const express = require('express');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/home-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/', controller.getHome)
        .get('/about', controller.getAbout)
        .get('/personal-doctors', controller.getPersonalDoctors)
        .get('/doctors', controller.getDoctors)
        .get('/reciepes-search', controller.getReciepesSearch);

    app.use('/', router);
};
