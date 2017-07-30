const request = require('supertest');
const constants = require('../../common/constants');
const models = require('../../models')();
const repository = require('../../data/repository')(constants);
const data = require('../../data')(repository, models);
const app = require('../../config/app-config')(data);


describe('Routers Tests', () => {
    describe('Auth Router Tests', () => {

    });

    describe('Home Router Tests', () => {
        it('expect GET / to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /doctors to return 200', (done) => {
            request(app)
                .get('/doctors')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /doctors-all to return 200', (done) => {
            request(app)
                .get('/doctors-all')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /personal-doctors to return 200', (done) => {
            request(app)
                .get('/personal-doctors')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /personal-doctors-all to return 200', (done) => {
            request(app)
                .get('/personal-doctors-all')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /recipes-search to return 200', (done) => {
            request(app)
                .get('/recipes-search')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /recipes-search to return 200', (done) => {
            request(app)
                .post('/recipes-search')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('Patient Router Tests', () => {

    });

    describe('Doctor Router Tests', () => {

    });
});
