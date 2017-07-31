const request = require('supertest');
const constants = require('../../common/constants');
const models = require('../../models')();
const repository = require('../../data/repository')(constants);
const data = require('../../data')(repository, models);
const app = require('../../config/app-config')(data);


describe('Routers Tests', () => {
    describe('Auth Router Tests', () => {
        it('expect GET /login to return 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /login to return 200', (done) => {
            request(app)
                .post('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /register to return 200', (done) => {
            request(app)
                .get('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /register to return 200', (done) => {
            request(app)
                .post('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /logout to return 302', (done) => {
            request(app)
                .get('/logout')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /profile to return 302', (done) => {
            request(app)
                .get('/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /profile to return 200', (done) => {
            request(app)
                .post('/profile')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect get /unauthorized to return 200', (done) => {
            request(app)
                .get('/unauthorized')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
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
        it('expect GET /reservation to return 302', (done) => {
            request(app)
                .get('/reservation')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /show-results to return 302', (done) => {
            request(app)
                .get('/show-results')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('Doctor Router Tests', () => {
        it('expect GET /add-patient to return 302', (done) => {
            request(app)
                .get('/add-patient')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /add-patient to return 200', (done) => {
            request(app)
                .post('/add-patient')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /add-recipe to return 302', (done) => {
            request(app)
                .get('/add-recipe')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /add-recipe to return 200', (done) => {
            request(app)
                .post('/add-recipe')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /add-result to return 302', (done) => {
            request(app)
                .get('/add-result')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect POST /add-result to return 200', (done) => {
            request(app)
                .post('/add-result')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect GET /schedule-schema to return 302', (done) => {
            request(app)
                .get('/schedule-schema')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
