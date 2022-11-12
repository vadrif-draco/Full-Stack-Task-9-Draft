// npm install mongodb
const mongo = require("mongodb")

const databaseUri = "mongodb://localhost:27017"
const mainDatabaseName = "myDatabase"

function _connect(databaseName = mainDatabaseName) {

    return new Promise((resolve, reject) => {

        mongo.MongoClient.connect(databaseUri, (err, dbconn) => {

            if (err) { reject(err) }
            else { resolve({ connObj: dbconn, dbObj: dbconn.db(databaseName) }) }

        })

    })

}

async function _collectionExists(collectionName) {

    try {

        instance = await _connect()
        return (await instance.dbObj.listCollections({ name: collectionName }).toArray()).length > 0

    } catch (err) { console.log(err) }

}

async function createNewCollection(collectionName) {

    return new Promise(async (resolve, reject) => {

        try {

            if (await _collectionExists(collectionName)) {

                console.log(`Collection "${collectionName}" already exists, nothing to do`)
                resolve()

            } else {

                instance = await _connect()
                instance.dbObj.createCollection(collectionName, (err, result) => {

                    if (err) { console.log(`Error creating collection "${collectionName}": ${err}`) }
                    else { console.log(`Collection "${collectionName}" created`) }
                    resolve()
                    // instance.connObj.close()

                })

            }

        } catch (err) { console.log(err) }

    })

}

async function insertInCollection(collectionName, item) {

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).insertOne(item, (err, result) => {

                if (err) { console.log(`Error inserting item in collection "${collectionName}": ${err}`) }
                else { console.log(`Item inserted into collection "${collectionName}" successfully`) }
                resolve(item._id || null)

            })

        } catch (err) { console.log(err) }

    })

}

async function findInCollection(collectionName, query) {

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).find(query).toArray((err, result) => {

                if (err) { console.log(`Error querying collection "${collectionName}": ${err}`) }
                else { console.log(`Query into collection "${collectionName}" succeeded`) }
                resolve(result)

            })

        } catch (err) { console.log(err) }

    })

}

async function removeFromCollection(collectionName, query = {}) {

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).deleteOne(query, (err, result) => {

                if (err) { console.log(`Error removing item from collection "${collectionName}": ${err}`) }
                else if (result.deletedCount == 0) { console.log(`Item not found in "${collectionName}"`) }
                else { console.log(`Item removed from collection "${collectionName}" successfully`) }
                resolve(result.deletedCount)

            })

        } catch (err) { console.log(err) }

    })

}

function convertToObjectId(ID) { return mongo.ObjectId(ID) }

module.exports = { createNewCollection, insertInCollection, findInCollection, removeFromCollection, convertToObjectId }
