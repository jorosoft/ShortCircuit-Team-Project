const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const repository = require('../../data/repository')();
let repositoryStub;
let repositoryStubAdd;
let repositoryStubFindOne;
let repositoryStubFind;
let repositoryStubUpdate;
let modelsStub;

describe('Data Tests', () => {
    beforeEach(() => {
        repositoryStubAdd = sinon.stub(repository, 'add');
        repositoryStubFindOne = sinon.stub(repository, 'findOne');
        repositoryStubFind = sinon.stub(repository, 'find');
        repositoryStubUpdate = sinon.stub(repository, 'update');
        repositoryStub = sinon.stub().returns({
            add: repositoryStubAdd,
            findOne: repositoryStubFindOne,
            find: repositoryStubFind,
            update: repositoryStubUpdate,
        });
        modelsStub = sinon.stub().returns({
            getBaseUser: (user, pass) => {
                return { username: user, password: pass };
            },
        });
    });

    afterEach(() => {
        repositoryStubAdd.restore();
        repositoryStubFindOne.restore();
        repositoryStubFind.restore();
        repositoryStubUpdate.restore();
    });

    describe('Auth Data Tests', () => {
        it('expect findUserById() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.findUserById('666');

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('users', '666');
            });

        it('expect findUserByCredentials() to call repo.add() with params',
            () => {
                const data =
                    require('../../data')(repositoryStub(), modelsStub());

                data.findUserByCredentials('pesho', '111');

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('users', {
                        username: 'pesho',
                        password: '111',
                    });
            });

        it('expect getUsers() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getUsers({ _id: 1234 });

                expect(repositoryStubFind).to.have.been
                    .calledWith('users', { _id: 1234 });
            });

        it('expect updateUser() to call repo.update() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updateUser({ _id: 1234 });

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('users', { _id: 1234 });
            });
    });

    describe('Patient Data Tests', () => {
        it('expect addPatient() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.addPatient({ pin: 1234 });

                expect(repositoryStubAdd).to.have.been
                    .calledWith('patients', { pin: 1234 });
            });

        it('expect getPatient() to call repo.findOne() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getPatient({ pin: 1234 });

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('patients', { pin: 1234 });
            });

        it('expect getPatients() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getPatients({ pin: 1234 });

                expect(repositoryStubFind).to.have.been
                    .calledWith('patients', { pin: 1234 });
            });

        it('expect updatePatient() to call repo.update() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updatePatient({ pin: 1234 });

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('patients', { pin: 1234 });
            });
    });

    describe('Doctor Data Tests', () => {
        it('expect addDoctor() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.addDoctor({ speciality: 'хирург' });

                expect(repositoryStubAdd).to.have.been
                    .calledWith('doctors', { speciality: 'хирург' });
            });

        it('expect getDoctor() to call repo.findOne() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getDoctor({ speciality: 'хирург' });

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('doctors', { speciality: 'хирург' });
            });

        it('expect getDoctors() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getDoctors({ speciality: 'хирург' });

                expect(repositoryStubFind).to.have.been
                    .calledWith('doctors', { speciality: 'хирург' });
            });

        it('expect updateDoctor() to call repo.update() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updateDoctor({ speciality: 'хирург' });

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('doctors', { speciality: 'хирург' });
            });
    });

    describe('Recipe Data Tests', () => {
        it('expect addRecipe() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.addRecipe({ content: '123' });

                expect(repositoryStubAdd).to.have.been
                    .calledWith('recipes', { content: '123' });
            });

        it('expect getRecipe() to call repo.findOne() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getRecipe({ content: '123' });

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('recipes', { content: '123' });
            });

        it('expect getRecipes() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getRecipes({ content: '123' });

                expect(repositoryStubFind).to.have.been
                    .calledWith('recipes', { content: '123' });
            });

        it('expect updateRecipe() to call repo.update() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updateRecipe({ content: '123' });

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('recipes', { content: '123' });
            });
    });

    describe('Result Data Tests', () => {
        it('expect addResult() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.addResult({ content: '1234' });

                expect(repositoryStubAdd).to.have.been
                    .calledWith('results', { content: '1234' });
            });

        it('expect getResult() to call repo.findOne() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getResult({ content: '1234' });

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('results', { content: '1234' });
            });

        it('expect getResults() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getResults({ content: '1234' });

                expect(repositoryStubFind).to.have.been
                    .calledWith('results', { content: '1234' });
            });

        it('expect updateResult() to call repo.update() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updateResult({ content: '1234' });

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('results', { content: '1234' });
            });
    });

    describe('Reservation Data Tests', () => {
        it('expect addReservation() to call repo.add() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.addReservation({});

                expect(repositoryStubAdd).to.have.been
                    .calledWith('reservations', {});
            });

        it('expect getReservation() to call repo.findOne() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getReservation({});

                expect(repositoryStubFindOne).to.have.been
                    .calledWith('reservations', {});
            });

        it('expect getReservations() to call repo.find() with correct params',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.getReservations({});

                expect(repositoryStubFind).to.have.been
                    .calledWith('reservations', {});
            });

        it('expect updateReservation() to call repo.update() with correct data',
            () => {
                const data = require('../../data')(repositoryStub(), null);

                data.updateReservation({});

                expect(repositoryStubUpdate).to.have.been
                    .calledWith('reservations', {});
            });
    });
});
