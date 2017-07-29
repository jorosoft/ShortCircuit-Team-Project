const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

module.exports = function(app, data) {
    app.use(passport.initialize());
    app.use(passport.session());

    const localStrategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then((user) => {
                if (user) {
                    const secretOrKey = jwtOptions.secretOrKey;
                    const token = jwt.sign(user, secretOrKey, {
                        expiresIn: 631139040, // 20 years in seconds
                    });

                    user.token = token;

                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, null));
    });

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'topsecretanduniquekey',
    };

    const jwtStrategy = new JwtStrategy(jwtOptions, function(jwtPayload, done) {
        data.findUserById(jwtPayload.sub)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, false));
    });

    passport.use(localStrategy);
    passport.use(jwtStrategy);

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
