const { ERRORTEXTHTML, SUCCESSTEXTHTML } = require('./_constants')
const { addProductService } = require('../4_Services/productsServices');
const { productModel } = require('../5_Models/productModel');

async function getProductsController(req, res) {
    res.status(200).json({ products: await productModel.getItemsArr() })
}

function addProductController(req, res) {
    addProductService(req.body).then(
        (value) => res.status(201).json({ message: `${SUCCESSTEXTHTML} Product added successfully with ID ${value}`, id: value }),
        (error) => res.status(400).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function getProductByIDController(req, res) {
    productModel.getItemByID(req.params['id']).then(
        (value) => res.status(200).json({ product: value }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function getProductsByCategoryIDController(req, res) {
    productModel.getProductsByCategoryID(req.params['id']).then(
        (value) => res.status(200).json({ products: value }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function updateProductByIDController(req, res) {
    let { updateSet, removeSet } = req.body
    productModel.updateItemByID(req.params['id'], updateSet, removeSet).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Category with ID ${value} updated successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

function deleteProductByIDController(req, res) {
    productModel.deleteItemByID(req.params['id']).then(
        (value) => res.status(200).json({ message: `${SUCCESSTEXTHTML} Product with ID ${value} deleted successfully` }),
        (error) => res.status(404).json({ message: `${ERRORTEXTHTML} ${error}` })
    )
}

module.exports = { getProductsController, addProductController, getProductByIDController, getProductsByCategoryIDController, updateProductByIDController, deleteProductByIDController }