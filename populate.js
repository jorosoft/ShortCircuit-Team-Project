const constants = require('./common/constants');
const validator = require('./common/validator');
const repository = require('./data/repository')(constants);
const models = require('./models')(constants, validator);
const data = require('./data')(repository, models);


let user = models.getUser('pesho', '1234', 'Петър', 'Стоянов', 'doctorType');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '12345', 'хирург', 'МЦ Капана', 'Пловдив', false);
        data.addDoctor(doctor);
    });

user = models.getUser('stamat', '7777', 'Стамат', 'Киров', 'doctorType');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '56567', 'невролог', 'МЦ Тракия', 'Стара Загора', true);
        data.addDoctor(doctor);
    });

user = models.getUser('pena', '0000', 'Пенка', 'Страхилова', 'doctorType');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(userId, '98765', 'дерматолог', 'Военна болница', 'София', false);
        data.addDoctor(doctor);
    });


// /////////////////////////////////////////////////////////

user = models.getUser('gosho', '1111', 'Георги', 'Димитров', 'patientType');

data.addUser(user)
    .then((userId) => {
        const patient = models.getPatient(userId, '1212121212');
        data.addPatient(patient);
    });

user = models.getUser('lalo', '1010', 'Лало', 'Костов', 'patientType');

data.addUser(user)
    .then((userId) => {
        const patient = models.getPatient(userId, '9999999999');
        data.addPatient(patient);
    });


// ////////////////////////////////////////////////

console.log('DATA POPULATED!!!');