const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function(app, data, models, constants) {
    const controller =
        require('../controllers/auth-controller')(data, models, constants);

    const router = new express.Router();

    router
        .get('/login', controller.getLoginForm)
        .post('/login', controller.login)
        .get('/register', controller.getRegisterForm)
        .post('/register', controller.register)
        .get('/logout', controller.logout)
        .get('/profile', controller.getProfile)
        .post('/profile', controller.getChangeProfileForm)
        .post('/profile-change', controller.changeProfileInfo)
        .get('/unauthorized', controller.unauthorized)
        .get('/user', controller.getLoggedUser);

    app.use('/', router);
};
