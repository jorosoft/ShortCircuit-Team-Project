const request = require('supertest');
const constants = require('../../common/constants');
let models = require('../../models')();
let repository = require('../../data/repository')(constants);
let data = require('../../data')(repository, models);
let app = require('../../config/app-config')(data);


describe('Some', () => {
    it('Test', (done) => {
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

    it('expect GET / to return 200', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if  (err){
                    return done(err);
                }

                return done();
            });
    })
});
