const { extractTokenDetails } = require("../4_Services/authServices")
const { userModel } = require("../5_Models/userModel")

function adminAuthGuard(req, res, next) {

    adminAuthToken = req.headers['authorization'] // Has to be in lower case!
    details = extractTokenDetails(adminAuthToken)

    // Of course, the client will be the one responsible for storing the access token and using it in requests
    // The entire purpose of these access token is to allow clients to "stay logged in" independent of servers
    // i.e., the server doesn't need to keep track of who's logged in and who's not, it just verifies tokens
    // Tokens most likely also contain token timeout info., so no server-side time-tracking is needed either
    if (details == -1) {
        return res.status(404).json({ message: `Invalid authorization token provided` })
    }
    userModel.getItemByID(details._id).then(
        (value) => {

            if (details.isAdmin == false) {
                return res.status(403).json({ message: `Unauthorized access to admin-only request` })
            }
            next()

        },
        (error) => { return res.status(404).json({ message: `Invalid authorized user token` }) }
    )

}

module.exports = { adminAuthGuard }