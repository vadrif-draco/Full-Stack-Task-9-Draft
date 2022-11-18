const { GenericModel } = require("./genericModel");

class Category extends GenericModel {

    constructor() { super("myCategories", "category") }

}

const categoryModel = new Category

module.exports = { categoryModel }