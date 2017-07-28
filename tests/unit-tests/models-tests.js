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

    });
    describe('Recipe Model Tests', () => {

    });
    describe('Result Model Tests', () => {

    });
});