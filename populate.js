const constants = require('./common/constants');
const validator = require('./common/validator');
const repository = require('./data/repository')(constants);
const models = require('./models')(constants, validator);
const data = require('./data')(repository, models);


let user = models.getUser('pesho', '1234', 'Петър', 'Стоянов', 'doctorType');
let doctorId;
let patientId;

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(
            userId, '12345', 'хирург', 'МЦ Капана', 'Пловдив', false);
        return data.addDoctor(doctor);
    })
    .then((docId) => {
        doctorId = docId;
    });

user = models.getUser('stamat', '7777', 'Стамат', 'Киров', 'doctorType');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(
            userId, '56567', 'невролог', 'МЦ Тракия', 'Стара Загора', true);
        data.addDoctor(doctor);
    });

user = models.getUser('pena', '0000', 'Пенка', 'Страхилова', 'doctorType');

data.addUser(user)
    .then((userId) => {
        const doctor = models.getDoctor(
            userId, '98765', 'дерматолог', 'Военна болница', 'София', false);
        data.addDoctor(doctor);
    });


// /////////////////////////////////////////////////////////

user = models.getUser('joro', '1234', 'Живко', 'Иванов', 'patientType');

data.addUser(user)
    .then((userId) => {
        const patient = models.getPatient(userId, '7777777777');
        data.addPatient(patient);
    });

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
        return data.addPatient(patient);
    })
    .then((patId) => {
        patientId = patId;
        const recipe = models.getRecipe(
            doctorId, patientId, new Date('2017-12-12'), 'content....... ');

        data.addRecipe(recipe);
    })
    .then(() => {
        return data.getUsers({ username: 'pena' });
    })
    .then((usr) => {
        return Promise.all([data.getDoctors({ _userId: usr[0]._id }),
            data.getPatient({ _pin: '1212121212' }),
            data.getPatient({ _pin: '7777777777' }),
        ]);
    })
    .then(([doc, pat1, pat2]) => {
        pat1._doctorId = doc[0]._id;
        pat2._doctorId = doc[0]._id;
        data.updatePatient(pat1);
        data.updatePatient(pat2);
    });

// ////////////////////////////////////////////////

console.log('DATA POPULATED!!!');
