const { ERRORTEXTHTML, SUCCESSTEXTHTML } = require('./_constants')
const { categoryModel } = require('../5_Models/categoryModel');

async function getCategoriesController(req, res) {

    res.status(200).json({ categories: await categoryModel.getItemsArr() })

}

function addCategoryController(req, res) {

    let { name, description } = req.body
    if (!name || !description) { res.status(400).json({ message: `${ERRORTEXTHTML} Malformed input` }) }
    else {

        categoryModel.addItem(req.body).then(
            (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} Category added successfully with ID ${value}`, id: value }),
            (error) => res.status(400).json({ message: `${ERRORTEXTHTML} ${error}` })
        )

    }

}

function getCategoryByIDController(req, res) {
    categoryModel.getItemByID(req.params['id']).then(
        (value) => res.status(200).json({ category: value }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function updateCategoryByIDController(req, res) {
    let { updateSet, removeSet } = req.body
    categoryModel.updateItemByID(req.params['id'], updateSet, removeSet).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Category with ID ${value} updated successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function deleteCategoryByIDController(req, res) {
    categoryModel.deleteItemByID(req.params['id']).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Category with ID ${value} deleted successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function changeCategoryStatusByIDController(req, res) {
    newStatus = req.body['status']
    if (newStatus) {

        categoryModel.updateItemByID(req.params['id'], { status: newStatus }).then(
            (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Status of category with ID ${value} updated successfully` }),
            (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
        )

    } else {

        categoryModel.getValueByIDandFieldName(req.params['id'], 'status').then(

            (oldStatusValue) => {

                categoryModel.updateItemByID(req.params['id'], { status: oldStatusValue == "active" ? "inactive" : "active" }).then(
                    (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Status of category with ID ${value} updated successfully` }),
                    (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
                )

            },
            (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })

        )

    }
}

module.exports = { getCategoriesController, addCategoryController, getCategoryByIDController, updateCategoryByIDController, deleteCategoryByIDController, changeCategoryStatusByIDController }