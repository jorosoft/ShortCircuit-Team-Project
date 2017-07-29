const { expect } = require('chai');

const validator = require('../../common/validator');

describe('Common Tests', () => {
    describe('Validator Tests', () => {
        it('expect validatePin() return false with invalid length pin', () => {
            const pin = '123';

            const result = validator.validatePin(pin);

            expect(result).to.be.false;
        });

        it('expect validatePin() return false with invalid symbols pin', () => {
            const pin = 'abc1234567';

            const result = validator.validatePin(pin);

            expect(result).to.be.false;
        });

        it('expect validatePin() return false with invalid date', () => {
            const pinY = '0010126666';
            const pinM = '7788126666';
            const pinMM = '7733126666';
            const pinD = '7710886666';

            const resultY = validator.validatePin(pinY);
            const resultM = validator.validatePin(pinM);
            const resultMM = validator.validatePin(pinMM);
            const resultD = validator.validatePin(pinD);

            expect(resultY).to.be.false;
            expect(resultM).to.be.false;
            expect(resultMM).to.be.false;
            expect(resultD).to.be.false;
        });
    });
});
