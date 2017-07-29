const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const validator = require('../common/validator');

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

    return app;
};
