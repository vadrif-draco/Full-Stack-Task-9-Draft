const { findInCollection } = require("../6_Storage/myMongo");
const { GenericModel } = require("./genericModel");

class User extends GenericModel {

    constructor() { super("myUsers", "user") }

    async getUserByUsername(USERNAME) {

        let user = await findInCollection(this.coll, { username: USERNAME })
        if (user.length != 0) { return user[0] }
        else { throw `Couldn't get user with username "${USERNAME}"; user not found` }
    
    }

}

const userModel = new User

module.exports = { userModel }