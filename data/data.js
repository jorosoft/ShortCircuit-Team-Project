// data layer

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const constants = require('../common/constants');

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
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('users')
                        .findOne({ username: username, password: password })
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
