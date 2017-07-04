const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const constants = require('../common/constants');
const userModel = require('../models/user-model');

module.exports = {
    findUserById(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    const user = db.collection('users')
                        .findOne({ _id: new ObjectId(id) });

                    db.close();

                    return user;
                })
                .then((user) => {
                    resolve(user || null);
                });
        });
    },
    findUserByCredentials(username, password) {
        const searchedUser = userModel.getUser(username, password);

        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    const user = db.collection('users')
                        .findOne({
                            username: searchedUser.username,
                            password: searchedUser.password,
                        });

                    db.close();

                    return user;
                })
                .then((user) => {
                    resolve(user || null);
                });
        });
    },
    addUser(user) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('users').insertOne({
                        username: user.username,
                        password: user.password,
                    });

                    db.close();
                });
        });
    },
};
