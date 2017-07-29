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
        it('expect getLoginForm() to call render with correct view param',
            () => {
                authController.getLoginForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('auth/login-view');
            });

        it('expect getRegisterForm() to call render with correct view param',
            () => {
                authController.getRegisterForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('auth/register-view');
            });

        it('expect getChangeProfileForm() to call render with correct view param',
            () => {
                authController.getChangeProfileForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('auth/profile-change-view');
            });
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

        it('expect getRecipesSearchView() to call render with correct view param',
            () => {
                homeController.getRecipesSearchView(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('home/recipes-search-view');
            });
    });
    describe('Patient Controller Tests', () => {
        it('expect getReservationForm() to call render with correct view param',
            () => {
                patientController.getReservationForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('patient/reservation-view');
            });

        it('expect getResults() to call render with correct view param',
            () => {
                patientController.getResults(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('patient/results-view');
            });
    });
    describe('Doctor Controller Tests', () => {
        it('expect getAddPatientForm() to call render with correct view param',
            () => {
                doctorController.getAddPatientForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-patient-view');
            });

        it('expect getAddResultForm() to call render with correct view param',
            () => {
                doctorController.getAddResultForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-result-view');
            });

        it('expect getAddRecipeForm() to call render with correct view param',
            () => {
                doctorController.getAddRecipeForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-recipe-view');
            });
    });
});
