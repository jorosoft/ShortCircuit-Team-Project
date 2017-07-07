const constants = require('./common/constants');
const repository = require('./data/repository')(constants);
const data = require('./data')(repository);
const models = require('./models')();

let user = models.getUser('pesho', '1234', 'Петър', 'Стоянов');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '12345', 'хирург', 'МЦ Капана', false);
        data.addDoctor(doctor);
    });

user = models.getUser('stamat', '7777', 'Стамат', 'Киров');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '56567', 'невролог', 'МЦ Тракия', true);
        data.addDoctor(doctor);
    });

user = models.getUser('pena', '0000', 'Пенка', 'Страхилова');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '98765', 'дерматолог', 'Военна болница', false);
        data.addDoctor(doctor);
    });


// /////////////////////////////////////////////////////////

user = models.getUser('gosho', '1111', 'Георги', 'Димитров');

data.addUser(user)
    .then((userId) => {
        const patient = models.getPatient(userId, '1212121212');
        data.addPatient(patient);
    });

user = models.getUser('lalo', '1010', 'Лало', 'Костов');

data.addUser(user)
    .then((userId) => {
        const patient = models.getPatient(userId, '9999999999');
        data.addPatient(patient);
    });


// ////////////////////////////////////////////////

console.log('DATA POPULATED!!!');
