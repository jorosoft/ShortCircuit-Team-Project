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

        },
        add(collection, entity) {
            return new Promise((resolve, reject) => {
                MongoClient.connect(constants.DB_URL)
                    .then((db) => {
                        db.collection(collection).insertOne(entity);

                        db.close();
                    })
                    .then(resolve);
            });
        },
        update(collection, entity) {

        },
    };
};
