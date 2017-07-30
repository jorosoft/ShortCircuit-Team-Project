const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
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

    require('./passport-config')(app, data);
    require('../routers')(app, data, models, constants);

    return app;
};
