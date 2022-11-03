const { read, write } = require("./myStorage");

async function getUsers() {
    return read("users.json")
}

async function getUsersArr() {
    return JSON.parse(await getUsers() || "[]")
}

async function saveUsersArr(usersArr) {
    await write("users.json", JSON.stringify(usersArr))
}

async function addUser(newUser) {

    if (newUser) {
        usersArr = await getUsersArr()
        newUser.id = 1 + Math.max(0, ...usersArr.map((user) => { return user.id }));
        usersArr.push(newUser)
        await saveUsersArr(usersArr)
        // No better way to append to JSON file instead of re-writing every time?

        return newUser.id
    }
    else {
        throw `Couldn't add user; invalid user data provided`
    }

}

async function getUserByID(ID) {

    usersArr = await getUsersArr()
    let user = usersArr.find((user) => { return user.id == ID })
    if (user) {
        return JSON.stringify(user)
    }
    else {
        throw `Couldn't get user with ID ${ID}; user not found`
    }

}

async function deleteUserByID(ID) {

    usersArr = await getUsersArr()
    let index = usersArr.findIndex((user) => { return user.id == ID })
    if (index != -1) {
        // Remove user by id
        usersArr.splice(index, 1)
        await saveUsersArr(usersArr)
        // No better way to delete item from JSON file instead of re-writing every time?

        return ID
    } else {
        throw `Couldn't delete user with ID ${ID}; user not found`
    }

}

module.exports = { getUsers, getUsersArr, saveUsersArr, addUser, getUserByID, deleteUserByID }