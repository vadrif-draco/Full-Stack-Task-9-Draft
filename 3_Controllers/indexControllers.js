const { Greet } = require('../myIndex')

function indexController(req, res) {
    res.status(200).json({ message: Greet('Guest') });
}

module.exports = { indexController }