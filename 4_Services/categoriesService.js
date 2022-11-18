function validateCategoryData(categoryData) {

    if (categoryData == null)                                            return { status: false, message: "missing category" }
    if (categoryData.type == null)                                       return { status: false, message: "missing category type" }
    if (!["new", "old"].includes(categoryData.type))                     return { status: false, message: "invalid category type, it can only be \"new\" or \"old\"" }
    if (categoryData.type === "old" && categoryData.id == null)          return { status: false, message: "missing old category id" }
    if (categoryData.type === "new") {
        
        if (categoryData.name == null)                                   return { status: false, message: "missing new category name" }
        if (categoryData.status == null)                                 return { status: false, message: "missing new category status" }
        if (categoryData.description == null)                            return { status: false, message: "missing new category description" }

    } 

    return {
        
        status: true,
        categoryData: {

            name: categoryData.name,
            status: categoryData.status,
            description: categoryData.description

        }
    
    }

}

module.exports = { validateCategoryData }