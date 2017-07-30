const request = require('supertest');
const constants = require('../../common/constants');
let models = require('../../models')();
let repository = require('../../data/repository')(constants);
let data = require('../../data')(repository, models);
let app = require('../../config/app-config')(data);


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
                    if  (err) {
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
                    if (err){
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
                    if  (err){
                        return done(err);
                    }

                    return done();
                })
        });

        it('expect POST /add-recipe to return 200', (done) => {
            request(app)
                .post('/add-recipe')
                .expect(200)
                .end((err, res) => {
                    if (err){
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
                    if  (err){
                        return done(err);
                    }

                    return done();
                })
        });

        it('expect POST /add-result to return 200', (done) => {
            request(app)
                .post('/add-result')
                .expect(200)
                .end((err, res) => {
                    if  (err){
                        return done(err);
                    }

                    return done();
                })
        });

        it('expect GET /schedule-schema to return 302', (done) =>{
            request(app)
                .get('/schedule-schema')
                .expect(302)
                .end((err, res) => {
                    if  (err){
                        return done(err);
                    }

                    return done();
                })
        });
    });
});
