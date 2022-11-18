const { findInCollection } = require("../6_Storage/myMongo");
const { GenericModel } = require("./genericModel");

class Product extends GenericModel {

    constructor() { super("myProducts", "product") }
    
    async getProductsByCategoryID(ID) {

        let items = await findInCollection(this.coll, { category: ID })
        if (items.length != 0) { return items }
        else { throw `Category with ID ${ID} has no products associated with it yet` }

    }

}

const productModel = new Product

module.exports = { productModel }