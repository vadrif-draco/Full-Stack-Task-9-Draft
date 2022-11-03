const VIEW_COUNT_LIMIT = 3

userViewCountMap = {}

function userViewsLimitGuard(req, res, next) {

    id = req.params['id']
    if (id in userViewCountMap) {

        if (userViewCountMap[id] >= VIEW_COUNT_LIMIT) {
            
            return res.status(403).json({ message: `View count limit reached for user with ID ${id}` })
        
        }
        userViewCountMap[id]++

    } else {

        userViewCountMap[id] = 1

    }
    console.log(userViewCountMap)
    next()

}

function adminAuthGuard(req, res, next) {

    adminAuthToken = req.headers['token']
    if ('dummydummy' != adminAuthToken) {
        return res.status(403).json({ message: `Unauthorized access to admin-only request` })
    }
    next()

}

module.exports = { userViewsLimitGuard, adminAuthGuard }