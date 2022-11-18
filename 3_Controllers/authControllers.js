const { ERRORTEXTHTML, SUCCESSTEXTHTML } = require('./_constants')
const { registerNewUser, loginUser } = require('../4_Services/authServices');

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

module.exports = { loginController, signUpController }