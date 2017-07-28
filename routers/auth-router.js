const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/auth-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/login',
            passport
            .authenticate('local', { failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            })
        .post('/register', controller.register)
        .get('/logout', controller.logout)
        .get('/profile', controller.getProfile)
        .get('/unauthorized', controller.unauthorized)
        .get('/user', passport
            .authenticate('jwt', { session: false }), controller.getLoggedUser)
        .get('/profile/:username', controller.getUserProfile);

    app.use('/', router);
};
