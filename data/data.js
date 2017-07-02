const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto-js');
const constants = require('../common/constants');
const userModel = require('../models/user-model');

module.exports = {
    findUserById(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('users')
                        .findOne({ _id: new ObjectId(id) })
                        .then((user) => {
                            resolve(user || null);
                        });

                    db.close();
                });
        });
    },
    findUserByCredentials(username, password) {
        const searchedUser = userModel.getUser(username, password);

        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('users')
                        .findOne({
                            username: searchedUser.username,
                            password: searchedUser.password,
                        })
                        .then((user) => {
                            resolve(user || null);
                        });

                    db.close();
                });
        });
    },
    addUser(user) {
        MongoClient.connect(constants.DB_URL, function(err, db) {
            db.collection('users').insertOne({
                username: user.username,
                password: user.password,
            });

            db.close();
        });
    },
};
