const express = require('express');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/doctor-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/add-patient', controller.getAddPatientForm)
        .post('/add-patient', controller.addPatient)
        .get('/add-recipe', controller.getAddRecipeForm)
        .post('/add-recipe', controller.addRecipe)
        .get('/add-result', controller.getAddResultForm)
        .post('/add-result', controller.addResult)
        .get('/schedule-schema', controller.getScheduleSchema)
        .post('/schedule-schema', controller.setScheduleSchema)
        .get('/schedule', controller.getSchedule)
        .get('/patients-list', controller.getGetPatientsList)
        .post('/add-patient-result', controller.addResult)
        .get('/patients-list', controller.getGetPatientsList)
        .get('/reservations/:params', controller.getReservations);

    app.use('/', router);
};
