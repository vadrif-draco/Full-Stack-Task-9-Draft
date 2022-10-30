const { Greet } = require('./myIndex')
const { getUsers, addUser, getUserByID, deleteUserByID } = require('./myDBFunctions')

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
    res.send(Greet('Guest'));
}

function getUsersController(req, res) {
    getUsers().then(
        (value) => res.json(JSON.parse(value || "[]")),
        (error) => res.status(400).send(`${ERRORTEXTHTML} ${error}`)
    )
}

function addUserController(req, res) {
    addUser(req.body).then(
        (value) => res.send(`${SUCCESSTEXTHTML} User added successfully with ID ${value}`),
        (error) => res.status(400).send(`${ERRORTEXTHTML} ${error}`)
    )
}

function getUserByIDController(req, res) {
    getUserByID(req.params['id']).then(
        (value) => res.json(JSON.parse(value)),
        (error) => res.status(400).send(`${ERRORTEXTHTML} ${error}`)
    )
}

function deleteUserByIDController(req, res) {
    deleteUserByID(req.params['id']).then(
        (value) => res.send(`${SUCCESSTEXTHTML} User with ID ${value} deleted successfully`),
        (error) => res.status(400).send(`${ERRORTEXTHTML} ${error}`)
    )
}

module.exports = { indexController, getUsersController, addUserController, getUserByIDController, deleteUserByIDController }