// Model used
const { userModel } = require("../5_Models/userModel")

// Encryption/decryption and JWT access token libraries
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createNewUser(username, password_hash) {

    return userModel.addItem({ username, password_hash, isAdmin: true })

}

function hashPassword(password) {

    saltRounds = 10
    return bcrypt.hashSync(password, saltRounds)

}

async function registerNewUser(username, password) {

    // It will throw internally if user is not found, so we put the user creation code in the catch
    try { await userModel.getUserByUsername(username) }
    catch (_) { return createNewUser(username, hashPassword(password)) }

    // Otherwise, throw
    throw `Username "${username}" is already taken, please choose another`

}

async function loginUser(username, password) {

    try {

        user = await userModel.getUserByUsername(username)

        // Validate credentials
        if (bcrypt.compareSync(password, user.password_hash)) {

            return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, '0') // Access Token

        } else { throw `Invalid credentials` } // Wrong password for provided username

    } catch (err) {

        throw `Invalid credentials` // Username not found

    }

}

function extractTokenDetails(token) {

    try { return jwt.verify(token, '0') }
    catch (error) { console.log(error) }
    return -1

}

module.exports = { registerNewUser, loginUser, extractTokenDetails }