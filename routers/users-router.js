const express = require('express');
const passport = require('passport');

module.exports = function(app, data) {
    const controller = require('../controllers/users-controller')(data);

    const router = new express.Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/login',
            passport
            .authenticate('local', { failureRedirect: '/login' }),
            (req, res) => res.redirect('/'))
        .post('/register', controller.register)
        .get('/logout', controller.logout)
        .get('/profile', controller.getProfile)
        .get('/unauthorized', controller.unauthorized);

    app.use('/', router);
};
