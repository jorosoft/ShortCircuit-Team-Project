const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function(app, data, models, constants) {
    const controller =
        require('../controllers/auth-controller')(data, models, constants);

    const router = new express.Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/login',
            (req, res) => {
                const result = {};
                req.sanitize('username').trim();
                req.sanitize('password').trim();
                req.checkBody(constants.RULES_USERNAME);
                req.checkBody(constants.RULES_PASSWORD);

                const errors = req.validationErrors();

                if (errors) {
                    result.flash = { messages: errors };
                    res.render('auth/login-view', { result });

                    return;
                }
                passport
                    .authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/login',
                    })(req, res);
            })
        .post('/register', controller.register)
        .get('/logout', controller.logout)
        .get('/profile', controller.getProfile)
        .post('/profile', (req, res) => res.redirect('/profile-change'))
        .get('/profile-change', controller.getChangeProfileForm)
        .post('/profile-change', controller.changeProfileInfo)
        .get('/unauthorized', controller.unauthorized)
        .get('/user', passport
            .authenticate('jwt', { session: false }), controller.getLoggedUser)
        .get('/profile/:username', controller.getUserProfile);

    app.use('/', router);
};
