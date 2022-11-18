// Fellow services used
const { validateCategoryData } = require("./categoriesService")

// Models used
const { categoryModel } = require("../5_Models/categoryModel")
const { productModel } = require("../5_Models/productModel")

// Storage functionality used
const { convertFromObjectId } = require("../6_Storage/myMongo")

function validateProductData(productData) {

    let { name, description, count, category } = productData

    if (name == null)           return { status: false, message: "missing product name" }
    if (description == null)    return { status: false, message: "missing product description" }
    if (count == null)          return { status: false, message: "missing product count" }
    if (parseInt(count) === 0)  return { status: false, message: "product count cannot be 0" }
    
    categoryValidation = validateCategoryData(category)
    
    if (categoryValidation.status == false) return { status: false, message: `invalid product category data; ${categoryValidation.message}`}

    return {
        
        status: true,
        productData: {
            
            name: productData.name,
            description: productData.description,
            count: productData.count
        
        },
        categoryData: categoryValidation.categoryData
    
    }

}

async function addProductService(newProduct) {

    if (newProduct) {

        productValidation = validateProductData(newProduct)
        if (productValidation.status == true) {

            if (newProduct.category.type == "old") {
                
                newProduct.category = newProduct.category.id
                return await productModel.addItem(newProduct)
            
            }
            else {

                addedCategoryID = await categoryModel.addItem(productValidation.categoryData)
                productValidation.productData.category = convertFromObjectId(addedCategoryID)
                return await productModel.addItem(productValidation.productData)

            }

        } else { throw `Couldn't add product; ${productValidation.message}` }

    } else { throw `Couldn't add product; invalid product data provided` }

}

module.exports = { validateProductData, addProductService }