const { createNewCollection, insertInCollection, findInCollection, updateInCollection, findFieldInItemByFieldName, removeFromCollection, convertToObjectId } = require("../6_Storage/myMongo")

class GenericModel {

    coll // Collection name
    item_label // Model label (ex: product, category, etc.)
    static created_collections = []

    constructor(coll, item_label) {

        this.coll = coll
        this.item_label = item_label

        if (!GenericModel.created_collections.includes(this.coll)) {

            createNewCollection(this.coll)
            GenericModel.created_collections.push(this.coll)

        }

    }

    async getItemsArr(query = {}, options = {}) {

        return await findInCollection(this.coll, query, options)

    }

    async addItem(itemToAdd) {

        if (itemToAdd) { return await insertInCollection(this.coll, itemToAdd) }
        else { throw `Couldn't add ${this.item_label}; invalid ${this.item_label} data provided` }

    }

    async getItemByID(ID) {

        let item = await findInCollection(this.coll, { _id: convertToObjectId(ID) })
        if (item.length != 0) { return item[0] }
        else { throw `Couldn't get ${this.item_label} with ID ${ID}; ${this.item_label} not found` }

    }

    async updateItemByID(ID, updateSet, removeSet) {

        let matchedCount = await updateInCollection(this.coll, { _id: convertToObjectId(ID) }, updateSet, removeSet)
        if (matchedCount != 0) { return ID }
        else { throw `Couldn't update ${this.item_label} with ID ${ID}; ${this.item_label} not found` }

    }

    async getValueByIDandFieldName(ID, fieldName) {

        let fieldValue = await findFieldInItemByFieldName(this.coll, { _id: convertToObjectId(ID) }, fieldName)
        if (fieldValue != null) { return fieldValue }
        else { throw `Couldn't find requested field (${fieldName}) in ${this.item_label} with ID ${ID}` }

    }

    async deleteItemByID(ID) {

        let deletedCount = await removeFromCollection(this.coll, { _id: convertToObjectId(ID) })
        if (deletedCount != 0) { return ID }
        else { throw `Couldn't delete ${this.item_label} with ID ${ID}; ${this.item_label} not found` }

    }

}

module.exports = { GenericModel }