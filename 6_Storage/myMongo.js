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

async function findInCollection(collectionName, query, options = {}) {

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).find(query, { projection: options }).toArray((err, result) => {

                if (err) { console.log(`Error querying collection "${collectionName}": ${err}`) }
                else { console.log(`Query into collection "${collectionName}" succeeded`) }
                resolve(result)

            })

        } catch (err) { console.log(err) }

    })

}

async function updateInCollection(collectionName, query = {}, updateSet, removeSet = {}, options = {}) {

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).updateOne(query, { $set: updateSet, $unset: removeSet }, { projection: options }, (err, result) => {

                if (err) { console.log(`Error updating item in collection "${collectionName}": ${err}`) }
                else if (result.matchedCount == 0) { console.log(`Item not found in "${collectionName}"`) }
                else { console.log(`Item updated in collection "${collectionName}" successfully`) }
                resolve(result.matchedCount)

            })

        } catch (err) { console.log(err) }

    })

}

async function findFieldInItemByFieldName(collectionName, query = {}, fieldName) {

    lookupSet = {}
    lookupSet[fieldName] = 1 // Only include the field we're look up
    lookupSet["_id"] = 0 // Have to manually exclude _id because it is always returned by default

    return new Promise(async (resolve, reject) => {

        try {

            instance = await _connect()
            instance.dbObj.collection(collectionName).findOne(query, { projection: lookupSet }, (err, result) => {

                if (err) { console.log(`Error finding field/item from collection "${collectionName}": ${err}`) }
                else if (result.matchedCount == 0) { console.log(`Field/item not found in "${collectionName}"`) }
                else { console.log(`Item field retrieved from collection "${collectionName}" successfully`) }
                resolve(result[fieldName])

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

function convertFromObjectId(ObjectId) { return ObjectId.toString() }

module.exports = { createNewCollection, insertInCollection, findInCollection, updateInCollection, findFieldInItemByFieldName, removeFromCollection, convertToObjectId, convertFromObjectId }
