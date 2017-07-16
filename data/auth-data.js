module.exports = function(repository, models) {
    function checkIfUsernameUsed(username) {
        return repository.findOne('users', { username: username });
    }

    return {
        findUserById(id) {
            return repository.findOne('users', id);
        },
        findUserByCredentials(username, password) {
            const searchedUser = models.getBaseUser(username, password);

            return repository.findOne('users', searchedUser);
        },
        addUser(user) {
            return checkIfUsernameUsed(user.user)
                .then((found) => {
                    if (found) {
                        return Promise.reject('Username already taken!');
                    }

                    return repository.add('users', user);
                });
        },
        getUsers() {
            return repository.find('users', {});
        },
    };
};
