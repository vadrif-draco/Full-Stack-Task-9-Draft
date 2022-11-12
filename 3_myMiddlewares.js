const { extractTokenDetails } = require("./4_myServices")
const { getUserByID } = require("./5_myDBFunctions")

const VIEW_COUNT_LIMIT = 3

userViewCountMap = {}

function userViewsLimitGuard(req, res, next) {

    id = req.params['id']
    if (id in userViewCountMap) {

        if (userViewCountMap[id] >= VIEW_COUNT_LIMIT) {

            return res.status(403).json({ message: `View count limit reached for user with ID ${id}` })

        }
        else { userViewCountMap[id]++ }

    } else {

        userViewCountMap[id] = 1

    }
    next()

}

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
    getUserByID(details._id).then(
        (value) => {

            if (details.isAdmin == false) {
                return res.status(403).json({ message: `Unauthorized access to admin-only request` })
            }
            next()

        },
        (error) => { return res.status(404).json({ message: `Invalid authorized user token` }) }
    )

}

module.exports = { userViewsLimitGuard, adminAuthGuard }