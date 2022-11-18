const { ERRORTEXTHTML, SUCCESSTEXTHTML } = require('./_constants')
const { userModel } = require('../5_models/userModel');

async function getUsersController(req, res) {

    // Removing the password_hash attribute -- the slow algorithm
    // let users = await getUsersARr()
    // users.map(user => delete user.password_hash)
    // res.status(200).json({ users: users })

    // The faster algorithm:
    res.status(200).json({ users: await userModel.getItemsArr({}, { password_hash: 0 }) })

}

function addUserController(req, res) {
    userModel.getUserByUsername(req.body.username).then(
        (value) => { res.status(400).json({ message: `${ERRORTEXTHTML} User with username "${req.body.username}" already exists` }) },
        (error) => {

            // If error is returned, that means user was not found, which is what we actually want
            req.body.isAdmin = false
            userModel.addItem(req.body).then(
                (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} User added successfully with ID ${value}`, id: value }),
                (error) => res.status(400).json({ message: `${ERRORTEXTHTML} ${error}` })
            )

        }
    )
}

function getUserByIDController(req, res) {
    userModel.getItemByID(req.params['id']).then(
        (value) => res.status(200).json({ user: value }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function deleteUserByIDController(req, res) {
    userModel.deleteItemByID(req.params['id']).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} User with ID ${value} deleted successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

module.exports = { getUsersController, addUserController, getUserByIDController, deleteUserByIDController }