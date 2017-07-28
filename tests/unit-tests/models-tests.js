const { expect } = require('chai');

const models = require('../../models')(null, null);

describe('Models Tests', () => {
    describe('BaseUser Model Tests', () => {

    });
    describe('User Model Tests', () => {

    });
    describe('Patient Model Tests', () => {
        it('Constructor should create object with correct properties', () => {
            const userId = '12345';
            const pin = '1234567890';
            const doctorId = '666';

            const sut = models.getPatient(userId, pin, doctorId);

            expect(sut._userId).to.be.eq(userId);
            expect(sut._pin).to.be.eq(pin);
            expect(sut._doctorId).to.be.eq(doctorId);
        });
    });
    describe('Doctor Model Tests', () => {
        it('Doctor constructor should create object with correct properties', () => {
            const userId = '12345';
            const regNum = '77777';
            const specialty = 'Neuro-Surgeon';
            const medCenter = 'KR-Med';
            const city = 'SofLeto';

            const doctor = models.getDoctor(userId, regNum, specialty, medCenter, city, false);

            expect(doctor._userId).to.eql(userId);
            expect(doctor._regNumber).to.eql(regNum);
            expect(doctor._speciality).to.eql(specialty);
            expect(doctor._medCenter).to.eql(medCenter);
            expect(doctor._city).to.eql(city);
        })
    });
    describe('Recipe Model Tests', () => {
        it('Recipe constructor should create object with correct properties', () => {
            const doctorId = '777';
            const patientId = '999';
            const expDate = new Date(96, 7, 23);
            const content = 'All-Good';

            const recipe = models.getRecipe(doctorId, patientId, expDate, content);

            expect(recipe._doctorId).to.eql(doctorId);
            expect(recipe._patientId).to.eql(patientId);
            expect(recipe._expirationDate).to.eql(expDate);
            expect(recipe._content).to.eql(content);
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