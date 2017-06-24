// data layer

const data = {
    users: [
        { _id: 1, username: 'Joro', password: '1234' },
    ],
};

module.exports = {
    findUserById(id) {
        const user = data.users.find((u) => u._id === id);

        return Promise.resolve(user || null);
    },
    findUserByCredentials(username, password) {
        const user = data.users
            .find((u) => u.username === username && u.password === password);
        console.log(user);
        return Promise.resolve(user || null);
    },
};
