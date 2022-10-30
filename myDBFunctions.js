const { read, write } = require("./myStorage");

function getUsers() {
    return read("users.json")
}

function addUser(newUser) {
    return new Promise((resolve, reject) => {

        if (newUser) {
            getUsers().then((users) => {
                users = JSON.parse(users || "[]")
                newUser.id = 1 + Math.max(0, ...users.map((user) => { return user.id }));
                users.push(newUser)
                write("users.json", JSON.stringify(users))
                // No better way to append to JSON file instead of re-writing every time?

                resolve(newUser.id)
            })
        }
        else {
            reject(`Invalid user data provided`)
        }

    })
}

function getUserByID(ID) {
    return new Promise((resolve, reject) => {

        getUsers().then((users) => {
            users = JSON.parse(users || "[]")
            let user = users.find((user) => { return user.id == ID })
            if (user) {
                resolve(JSON.stringify(user))
            }
            else {
                reject(`User with ID ${ID} was not found`)
            }
        })

    })
}

function deleteUserByID(ID) {
    return new Promise((resolve, reject) => {

        getUsers().then((users) => {
            users = JSON.parse(users || "[]")
            let index = users.findIndex((user) => { return user.id == ID })
            if (index != -1) {
                // Remove user by id
                users.splice(index, 1)
                write("users.json", JSON.stringify(users))
                resolve(ID)
            } else {
                reject(`No user with an ID ${ID} exists`)
            }
        })

    })
}

module.exports = { getUsers, addUser, getUserByID, deleteUserByID }