const express = require('express');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/home-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/', controller.getHome)
        .get('/about', controller.getAbout)
        .get('/personal-doctors', controller.getPersonalDoctorsView)
        .get('/doctors', controller.getDoctorsView)
        .get('/doctors-all', controller.getDoctors)
        .get('/personal-doctors-all', controller.getPersonalDoctors)
        .get('/reciepes-search', controller.getReciepesSearch);

    app.use('/', router);
};
