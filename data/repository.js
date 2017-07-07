const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = function(constants) {
    return {
        findOne(collection, filter) {
            if (typeof filter !== 'object') {
                filter = { _id: new ObjectId(filter) };
            }

            return new Promise((resolve, reject) => {
                MongoClient.connect(constants.DB_URL)
                    .then((db) => {
                        const entity = db.collection(collection)
                            .findOne(filter);

                        db.close();

                        return entity;
                    })
                    .then((entity) => {
                        resolve(entity || null);
                    });
            });
        },
        find(collection, filter) {
            return new Promise((resolve, reject) => {
                MongoClient.connect(constants.DB_URL)
                    .then((db) => {
                        const entities = db.collection(collection)
                            .find(filter).toArray();

                        db.close();

                        return entities;
                    })
                    .then((entities) => {
                        resolve(entities || null);
                    });
            });
        },
        add(collection, entity) {
            return new Promise((resolve, reject) => {
                MongoClient.connect(constants.DB_URL)
                    .then((db) => {
                        db.collection(collection).insertOne(entity);

                        db.close();

                        return entity._id;
                    })
                    .then(resolve);
            });
        },
        update(collection, entity) {
            return new Promise((resolve, reject) => {
                MongoClient.connect(constants.DB_URL)
                    .then((db) => {
                        db.collection(collection)
                            .update({ _id: entity._id },
                                entity, { upsert: true });

                        db.close();
                    })
                    .then(resolve);
            });
        },
    };
};