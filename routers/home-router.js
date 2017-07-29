const express = require('express');

module.exports = function(app, data, models, constants) {
    const controller =
        require('../controllers/home-controller')(data, models, constants);

    const router = new express.Router();

    router
        .get('/', controller.getHome)
        .get('/doctors', controller.getDoctorsView)
        .get('/doctors-all', controller.getDoctors)
        .get('/personal-doctors', controller.getPersonalDoctorsView)
        .get('/personal-doctors-all', controller.getPersonalDoctors)
        .get('/recipes-search', controller.getRecipesSearchView)
        .post('/recipes-search', controller.recipesSearch);

    app.use('/', router);
};
