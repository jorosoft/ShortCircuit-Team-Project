const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const authController = require('../../controllers/auth-controller')();
const homeController = require('../../controllers/home-controller')();
const patientController = require('../../controllers/patient-controller')();
const doctorController = require('../../controllers/doctor-controller')();

let reqStubIsAuthenticated;
let resStubRender;
let reqStub;
let resStub;

describe('Controllers Tests', () => {
    beforeEach(() => {
        reqStub = sinon.stub().returns({
            isAuthenticated: () => {},
            user: {
                username: '',
                password: '',
                _userType: '',
            },
        });

        resStub = sinon.stub().returns({
            render: () => {},
        });
        reqStubIsAuthenticated = sinon.stub(reqStub(), 'isAuthenticated')
            .returns(true);
        resStubRender = sinon.stub(resStub(), 'render');
    });

    afterEach(() => {
        reqStubIsAuthenticated.restore();
        resStubRender.restore();
    });

    describe('Auth Controller Tests', () => {

    });
    describe('Home Controller Tests', () => {
        it('expect getHome() to call render with correct view param',
            () => {
                homeController.getHome(reqStub(), resStub());

                expect(resStubRender).to.have.been.calledWith('home/home-view');
            });
        it('expect getPersonalDoctorsView() to call render with correct data',
            () => {
                homeController.getPersonalDoctorsView(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('home/personal-doctors-view');
            });
        it('expect getDoctorsView() to call render with correct view param',
            () => {
                homeController.getDoctorsView(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('home/doctors-view');
            });
    });
    describe('Patient Controller Tests', () => {

    });
    describe('Doctor Controller Tests', () => {

    });
});
