const { Greet } = require('./myIndex')
const { getUsersArr, addUser, getUserByID, deleteUserByID } = require('./5_myDBFunctions');
const { registerNewUser, loginUser } = require('./4_myServices');

const ERRORTEXTHTML = `
<div style="color: red; font-family: Calibri, Arial, Helvetica, sans-serif;">
    <strong>An error has occurred:</strong>
    <br>
</div>
<div style="font-family: Calibri, Arial, Helvetica, sans-serif;">
`

const SUCCESSTEXTHTML = `
<div style="font-family: Calibri, Arial, Helvetica, sans-serif;">
`

function indexController(req, res) {
    res.status(200).json({ message: Greet('Guest') });
}

async function getUsersController(req, res) {
    res.status(200).json({ users: await getUsersArr() })
}

function addUserController(req, res) {
    addUser(req.body).then(
        (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} User added successfully with ID ${value}`, id: value }),
        (error) => res.status(400).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function getUserByIDController(req, res) {
    getUserByID(req.params['id']).then(
        (value) => res.status(200).json({ user: value }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function deleteUserByIDController(req, res) {
    deleteUserByID(req.params['id']).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} User with ID ${value} deleted successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function loginController(req, res) {
    let { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({ message: `${ERRORTEXTHTML} Username or password empty` })
    }
    else {
        loginUser(username, password).then(
            (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} Admin logged in successfully`, token: value }),
            (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
        )
    }
}

function signUpController(req, res) {
    let { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({ message: `${ERRORTEXTHTML} Username or password empty` })
    }
    else {
        registerNewUser(username, password).then(
            (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} Admin added successfully with ID ${value}`, id: value }),
            (error) => res.status(400).json({ message: `${ERRORTEXTHTML} ${error}` })
        )
    }
}

module.exports = {
    indexController,
    getUsersController,
    addUserController,
    getUserByIDController,
    deleteUserByIDController,
    loginController,
    signUpController
}