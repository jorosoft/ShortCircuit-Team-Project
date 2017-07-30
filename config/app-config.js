const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const validator = require('../common/validator');
const constants = require('../common/constants');
const models = require('../models')();

module.exports = function(data) {
    const app = express();

    app.set('view engine', 'pug');

    app.use('/static', express.static('public'));
    app.use('/libs', express.static('node_modules'));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'alabala',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(expressValidator({
        customValidators: {
            isValidPin: validator.validatePin,
        },
    }));

    app.use(flash());
    app.use(toastr());
    app.use((req, res, next) => {
        res.locals.toasts = req.toastr.render;
        next();
    });

    require('./passport-config')(app, data);
    require('../routers')(app, data, models, constants);

    return app;
};
