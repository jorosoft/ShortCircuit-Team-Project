const request = require('supertest');
const constants = require('../../common/constants');
const models = require('../../models')();
const repository = require('../../data/repository')(constants);
const data = require('../../data')(repository, models);
const app = require('../../config/app-config')(data);


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
});
