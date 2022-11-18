const VIEW_COUNT_MAX_LIMIT = 3
const VIEW_COUNT_COOLDOWN_PERIOD_MS = 10000 // 10 seconds

userViewCountMap = {}

// View limit has a cooldown period (can't view user(s) more than 3 times within period)
function scheduleViewCountDecrement(id) {
    
    setTimeout(() => {
                
        console.log("\nHR Department userViewCountMap cooldown kicking in...")
        userViewCountMap[id]--
        console.log(userViewCountMap)
        console.log('')
        if (userViewCountMap[id] == 0) delete userViewCountMap[id]
        
    }, VIEW_COUNT_COOLDOWN_PERIOD_MS);

}

function userViewsLimitGuard(req, res, next) {

    id = req.params['id']
    if (id == null) id = "global"
    if (id in userViewCountMap) {

        if (userViewCountMap[id] >= VIEW_COUNT_MAX_LIMIT) {

            if (id === "global") { return res.status(403).json({ message: `HR Department global user view count limit reached` }) }
            else { return res.status(403).json({ message: `HR Department user view count limit reached for user with ID ${id}` }) }

        }
        else {
            
            // Increment view count
            userViewCountMap[id]++

            // After a few seconds, the value will be decremented
            scheduleViewCountDecrement(id)
        
        }

    } else {

        userViewCountMap[id] = 1
        scheduleViewCountDecrement(id)

    }
    console.log('\nHR Department userViewCountMap has been updated:')
    console.log(userViewCountMap)
    console.log('')
    next()

}

module.exports = { userViewsLimitGuard }