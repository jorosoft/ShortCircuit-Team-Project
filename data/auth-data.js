const models = require('../models')();

module.exports = function(repository) {
    return {
        findUserById(id) {
            return repository.findOne('users', id);
        },
        findUserByCredentials(username, password) {
            const searchedUser = models.getBaseUser(username, password);

            return repository.findOne('users', searchedUser);
        },
        addUser(user) {
            repository.add('users', user);
        },
    };
};
