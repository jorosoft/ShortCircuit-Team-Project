const express = require('express');

module.exports = function(app, data) {
    const controller = require('../controllers/users-controller')(data);

    const router = new express.Router();

    router
        .get('/login', controller.login)
        .get('/register', controller.register);

    app.use('/', router);
};