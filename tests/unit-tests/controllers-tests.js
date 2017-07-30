const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const data = require('../../data')();
const dataGetPatientStub = sinon.stub(data, 'getPatient').resolves({});
const dataGetDoctorStub = sinon.stub(data, 'getDoctor').resolves({});
const dataGetDoctorsStub = sinon.stub(data, 'getDoctors').resolves({});
const dataStub = sinon.stub().returns({
    getPatient: dataGetPatientStub,
    getDoctor: dataGetDoctorStub,
    getDoctors: dataGetDoctorsStub,
});
const cStub = sinon.stub().returns({
    RULES_PIN: '',
    RULES_USERNAME: '',
    RULES_PASSWORD: '',
    RULES_FIRSTNAME: '',
    RULES_LASTNAME: '',
    RULES_OPTRADIO: '',
    RULES_REGNUMBER: '',
    RULES_SPECIALITY: '',
    RULES_CENTER: '',
    RULES_CITYNAME: '',
    RULES_CONTENT: '',
});

const authController =
    require('../../controllers/auth-controller')(dataStub(), null, cStub());
const homeController =
    require('../../controllers/home-controller')(dataStub(), null, cStub());
const patientController =
    require('../../controllers/patient-controller')(dataStub(), null, cStub());
const doctorController =
    require('../../controllers/doctor-controller')(dataStub(), null, cStub());

let reqStubIsAuthenticated;
let resStubRender;
let resStubRedirect;
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
            redirect: () => {},
        });
        reqStubIsAuthenticated = sinon.stub(reqStub(), 'isAuthenticated')
            .returns(true);
        resStubRender = sinon.stub(resStub(), 'render');
        resStubRedirect = sinon.stub(resStub(), 'redirect');
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

        it('expect getChangeProfileForm() to call render with correct param',
            () => {
                authController.getChangeProfileForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('auth/profile-change-view');
            });

        it('expect getProfile() to call data.getPatient() when user is patient',
            () => {
                reqStub.returns({
                    isAuthenticated: () => {},
                    user: {
                        username: '',
                        password: '',
                        _userType: 'patientType',
                    },
                });

                authController.getProfile(reqStub(), resStub());

                expect(dataGetPatientStub).to.have.been
                    .calledWith();
            });

        it('expect getProfile() to call data.getDoctor() when user is doctor',
            () => {
                reqStub.returns({
                    isAuthenticated: () => {},
                    user: {
                        username: '',
                        password: '',
                        _userType: 'doctorType',
                    },
                });

                authController.getProfile(reqStub(), resStub());

                expect(dataGetDoctorStub).to.have.been
                    .calledWith();
            });

        it('expect unauthorized() to call render with correct view param',
            () => {
                authController.unauthorized(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('auth/unauthorized-view');
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

        it('expect getRecipesSearchView() to call render with correct param',
            () => {
                homeController.getRecipesSearchView(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('home/recipes-search-view');
            });
    });
    describe('Patient Controller Tests', () => {
        it('expect getReservationForm() to call redirect to correct route',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                patientController.getReservationForm(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getReservationForm() to call render with correct view param',
            () => {
                patientController.getReservationForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('patient/reservation-view');
            });

        it('expect getResults() to call redirect to correct route',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                patientController.getResults(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getResults() to call render with correct view param',
            () => {
                patientController.getResults(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('patient/results-view');
            });
    });
    describe('Doctor Controller Tests', () => {
        it('expect addPatient() to call self view when have validation errors',
            () => {
                reqStub = sinon.stub().returns({
                    isAuthenticated: () => {},
                    user: {
                        username: '',
                        password: '',
                        _userType: '',
                    },
                    sanitize: () => 'some',
                    checkBody: () => {},
                    validationErrors: () => [{}],
                });

                doctorController.addPatient(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-patient-view');
            });

        it('expect addRecipe() to call self view when have validation errors',
            () => {
                reqStub = sinon.stub().returns({
                    isAuthenticated: () => {},
                    user: {
                        username: '',
                        password: '',
                        _userType: '',
                    },
                    sanitize: () => 'some',
                    checkBody: () => {},
                    validationErrors: () => [{}],
                });

                doctorController.addRecipe(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-recipe-view');
            });

        it('expect addResult() to call self view when have validation errors',
            () => {
                reqStub = sinon.stub().returns({
                    isAuthenticated: () => {},
                    user: {
                        username: '',
                        password: '',
                        _userType: '',
                    },
                    sanitize: () => 'some',
                    checkBody: () => {},
                    validationErrors: () => [{}],
                });

                doctorController.addResult(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-result-view');
            });

        it('expect getAddPatientForm() redirect to correct route when no auth',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                doctorController.getAddPatientForm(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getAddPatientForm() to call render with correct view param',
            () => {
                doctorController.getAddPatientForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-patient-view');
            });

        it('expect getAddResultForm() redirect to correct route when no auth',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                doctorController.getAddResultForm(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getAddResultForm() to call render with correct view param',
            () => {
                doctorController.getAddResultForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-result-view');
            });

        it('expect getAddRecipeForm() redirect to correct route when no auth',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                doctorController.getAddRecipeForm(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getAddRecipeForm() to call render with correct view param',
            () => {
                doctorController.getAddRecipeForm(reqStub(), resStub());

                expect(resStubRender).to.have.been
                    .calledWith('doctor/add-recipe-view');
            });

        it('expect getSchedule() redirect to correct route when no auth',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                doctorController.getSchedule(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });

        it('expect getPatientsList() redirect to correct route when no auth',
            () => {
                reqStubIsAuthenticated.restore();
                reqStubIsAuthenticated = sinon
                    .stub(reqStub(), 'isAuthenticated')
                    .returns(false);

                doctorController.getPatientsList(reqStub(), resStub());

                expect(resStubRedirect).to.have.been
                    .calledWith('/unauthorized');
            });
    });
});
