const passport = require('passport');
const LocalStrategy = require('passport-local');
const data = require('../data/data');


module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, null));
    });

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        data.findUserById(id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, false));
    });
};
