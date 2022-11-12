// const { read, write } = require("./6_myFS");
const {
    createNewCollection,
    insertInCollection,
    findInCollection,
    removeFromCollection,
    convertToObjectId
} = require("./6_myMongo")

const coll = "myUsers"
createNewCollection(coll)

// async function getUsers() {
//     return read("users.json")
// }

async function getUsersArr(query = {}) {
    // return JSON.parse(await getUsers() || "[]")
    return await findInCollection(coll, query)
}

// async function saveUsersArr(usersArr) {
//     await write("users.json", JSON.stringify(usersArr))
// }

async function addUser(newUser) {

    if (newUser) {
        // usersArr = await getUsersArr()
        // newUser.id = 1 + Math.max(0, ...usersArr.map((user) => { return user.id }));
        // usersArr.push(newUser)
        // await saveUsersArr(usersArr)
        // return newUser.id
        return await insertInCollection(coll, newUser)
    }
    else {
        throw `Couldn't add user; invalid user data provided`
    }

}

async function getUserByID(ID) {

    // usersArr = await getUsersArr()
    // let user = usersArr.find((user) => { return user.id == ID })
    let user = await findInCollection(coll, { _id: convertToObjectId(ID) })
    // if (user) {
    if (user.length != 0) {
        return user[0]
    }
    else {
        throw `Couldn't get user with ID ${ID}; user not found`
    }

}

async function getUserByUsername(USERNAME) {

    // usersArr = await getUsersArr()
    // let user = usersArr.find((user) => { return user.name == USERNAME })
    let user = await findInCollection(coll, { name: USERNAME })
    // if (user) {
    if (user.length != 0) {
        return user[0]
    }
    else {
        throw `Couldn't get user with username "${USERNAME}"; user not found`
    }

}

async function deleteUserByID(ID) {

    // usersArr = await getUsersArr()
    // let index = usersArr.findIndex((user) => { return user.id == ID })
    let deletedCount = await removeFromCollection(coll, { _id: convertToObjectId(ID) })
    // if (index != -1) {
    if (deletedCount != 0) {
        // // Remove user by id
        // usersArr.splice(index, 1)
        // await saveUsersArr(usersArr)
        return ID
    } else {
        throw `Couldn't delete user with ID ${ID}; user not found`
    }

}

module.exports = { getUsersArr, addUser, getUserByID, getUserByUsername, deleteUserByID }