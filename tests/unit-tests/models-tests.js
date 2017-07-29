const { expect } = require('chai');
const crypto = require('crypto-js');

const models = require('../../models')(null, null);

describe('Models Tests', () => {
    describe('BaseUser Model Tests', () => {
        it('Constructor should create proper BaseUser', () => {
            const userName = 'jorkata';
            const passWord = '12345';

            const baseUser = models.getBaseUser(userName, passWord);

            expect(baseUser.user).to.eql(userName);
            expect(baseUser.pass).to
                .eql(new crypto.SHA1(passWord.trim()).toString());
        });
        it('Setters should set correct values', () => {
            const userName = 'jorkata';
            const passWord = '12345';

            const baseUser = models.getBaseUser(userName, passWord);

            baseUser.user = 'pesho';
            baseUser.pass = 'XXL';

            expect(baseUser.user).to.eql('pesho');
            expect(baseUser.pass).to
                .eql(new crypto.SHA1('XXL'.trim()).toString());
        });
    });
    describe('User Model Tests', () => {
        it('Constructor should create proper BaseUser', () => {
            const userName = 'jorkata';
            const passWord = '12345';
            const firstName = 'Георги';
            const lastName = 'Иванов';
            const userType = 'doctor';

            const user = models
                .getUser(userName, passWord, firstName, lastName, userType);

            expect(user.username).to.eql(userName);
            expect(user.password).to
                .eql(new crypto.SHA1(passWord.trim()).toString());
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.userType).to.eql(userType);
        });
    });
    describe('Patient Model Tests', () => {
        let userId;
        let pin;
        let doctorId;
        let patient;

        beforeEach(() => {
            userId = '12345';
            pin = '1234567890';
            doctorId = '666';
            patient = models.getPatient(userId, pin, doctorId);
        });

        it('Constructor should create object with correct properties', () => {
            expect(patient.userId).to.be.eq(userId);
            expect(patient.pin).to.be.eq(pin);
            expect(patient.doctorId).to.be.eq(doctorId);
        });

        it('Setters should set correct values', () => {
            patient.userId = '54321';
            patient.pin = '0987654321';
            patient.doctorId = '777';

            expect(patient.userId).to.eql('54321');
            expect(patient.pin).to.eql('0987654321');
            expect(patient.doctorId).to.eql('777');
        });
    });
    describe('Doctor Model Tests', () => {
        let doctor;
        let userId;
        let regNum;
        let specialty;
        let medCenter;
        let city;

        beforeEach(() => {
            userId = '12345';
            regNum = '77777';
            specialty = 'Neuro-Surgeon';
            medCenter = 'KR-Med';
            city = 'SofLeto';

            doctor = models
                .getDoctor(userId, regNum, specialty, medCenter, city, false);
        });

        it('Doctor constructor should create object with correct properties',
            () => {
                expect(doctor.userId).to.eql(userId);
                expect(doctor.regNumber).to.eql(regNum);
                expect(doctor.speciality).to.eql(specialty);
                expect(doctor.medCenter).to.eql(medCenter);
                expect(doctor.hasPatients).to.eql(false);
                expect(doctor.city).to.eql(city);
            });

        it('Doctor setters should set correct values', () => {
            doctor.userId = '54321';
            doctor.regNum = '99999';
            doctor.speciality = 'Surgeon';
            doctor.medCenter = 'Pul-Med';
            doctor.city = 'Plovdiv';


            expect(doctor.userId).to.eql('54321');
            expect(doctor.regNum).to.eql('99999');
            expect(doctor.speciality).to.eql('Surgeon');
            expect(doctor.medCenter).to.eql('Pul-Med');
            expect(doctor.city).to.eql('Plovdiv');
        });
    });
    describe('Recipe Model Tests', () => {
        let recipe;
        let doctorId;
        let patientId;
        let expDate;
        let content;

        beforeEach(() => {
            doctorId = '777';
            patientId = '999';
            expDate = new Date(96, 7, 23);
            content = 'All-Good';

            recipe = models.getRecipe(doctorId, patientId, expDate, content);
        });

        it('Recipe constructor should create object with correct properties',
            () => {
                expect(recipe.doctorId).to.eql(doctorId);
                expect(recipe.patientId).to.eql(patientId);
                expect(recipe.expirationDate).to.eql(expDate);
                expect(recipe.content).to.eql(content);
            });

        it('Recipe setters should set correct values', () => {
            recipe.doctorId = '333';
            recipe.patientId = '555';
            recipe.expirationDate = new Date(94, 5, 21);
            recipe.content = 'Its good';

            expect(recipe.doctorId).to.eql('333');
            expect(recipe.patientId).to.eql('555');
            expect(recipe.expirationDate).to.eql(new Date(94, 5, 21));
            expect(recipe.content).to.eql('Its good');
        });
    });
    describe('Result Model Tests', () => {
        let doctorId;
        let patientId;
        let content;
        let date;
        let result;

        beforeEach(() => {
            doctorId = '777';
            patientId = '999';
            content = 'All-Fine';
            date = new Date(97, 12, 7);
            result = models.getResult(doctorId, patientId, content, date);
        });

        it('Result constructor should create object with correct properties',
            () => {
                expect(result.doctorId).to.eql(doctorId);
                expect(result.patientId).to.eql(patientId);
                expect(result.content).to.eql(content);
                expect(result.date).to.eql(date);
            });

        it('Result setters should set correct values', () => {
            result.doctorId = '444';
            result.patientId = '555';
            result.content = 'Its fine';
            result.date = new Date(94, 11, 9);

            expect(result.doctorId).to.eql('444');
            expect(result.patientId).to.eql('555');
            expect(result.content).to.eql('Its fine');
            expect(result.date).to.eql(new Date(94, 11, 9));
        });
    });
});
