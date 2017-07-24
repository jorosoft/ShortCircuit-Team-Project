const constants = require('./common/constants');
const validator = require('./common/validator');
const repository = require('./data/repository')(constants);
const models = require('./models')(constants, validator);
const data = require('./data')(repository, models);


Promise.all([data.getPatient({ _pin: '7777777777' }),
data.getDoctor({ _regNumber: '12345' }),
])
    .then(([pat, doc]) => {
        const result = models.getResult(
           doc._id, pat._id, 'test content ', new Date(Date.now()));

data.addResult(result);
    });

console.log('bla bla');

