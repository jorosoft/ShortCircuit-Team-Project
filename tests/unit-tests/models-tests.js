const { expect } = require('chai');

const models = require('../../models')(null, null);

describe('Models Tests', () => {
    describe('BaseUser Model Tests', () => {
        it('Constructor should create proper BaseUser', () => {
            const userName = 'jorkata';
            const passWord = '12345';

            let baseUser = models.getBaseUser(userName, passWord);

        });
    });
    describe('User Model Tests', () => {

    });
    describe('Patient Model Tests', () => {
        it('Constructor should create object with correct properties', () => {
            const userId = '12345';
            const pin = '1234567890';
            const doctorId = '666';

            const sut = models.getPatient(userId, pin, doctorId);

            expect(sut.userId).to.be.eq(userId);
            expect(sut.pin).to.be.eq(pin);
            expect(sut.doctorId).to.be.eq(doctorId);
        });


    });
    describe('Doctor Model Tests', () => {
        let doctor, userId, regNum, specialty, medCenter, city;

        beforeEach(() => {
             userId = '12345';
             regNum = '77777';
             specialty = 'Neuro-Surgeon';
             medCenter = 'KR-Med';
             city = 'SofLeto';

            doctor = models.getDoctor(userId, regNum, specialty, medCenter, city, false);
        });

        it('Doctor constructor should create object with correct properties', () => {
            expect(doctor.userId).to.eql(userId);
            expect(doctor.regNumber).to.eql(regNum);
            expect(doctor.speciality).to.eql(specialty);
            expect(doctor.medCenter).to.eql(medCenter);
            expect(doctor.city).to.eql(city);
        });

        it('Doctor setters should set correct values', () => {
            doctor.userId(5);

        })
    });
    describe('Recipe Model Tests', () => {
        it('Recipe constructor should create object with correct properties', () => {
            const doctorId = '777';
            const patientId = '999';
            const expDate = new Date(96, 7, 23);
            const content = 'All-Good';

            const recipe = models.getRecipe(doctorId, patientId, expDate, content);

            expect(recipe.doctorId).to.eql(doctorId);
            expect(recipe.patientId).to.eql(patientId);
            expect(recipe.expirationDate).to.eql(expDate);
            expect(recipe.content).to.eql(content);
        })
    });
    describe('Result Model Tests', () => {
        it('Result constructor should create object with correct properties', () => {
            const doctorId = '777';
            const patientId = '999';
            const content = 'All-Fine';
            const date = new Date(97, 12, 7);

            const result = models.getResult(doctorId, patientId, content, date);

            expect(result._doctorId).to.eql(doctorId);
            expect(result._patientId).to.eql(patientId);
            expect(result._content).to.eql(content);
            expect(result._date).to.eql(date);
        })
    });
});
