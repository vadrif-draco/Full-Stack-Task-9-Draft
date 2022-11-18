const { indexController } = require("./3_Controllers/indexControllers")
const { loginController, signUpController } = require("./3_Controllers/authControllers")
const { getUsersController, addUserController, getUserByIDController, deleteUserByIDController } = require("./3_Controllers/usersControllers")
const { getProductsController, addProductController, getProductByIDController, getProductsByCategoryIDController, updateProductByIDController, deleteProductByIDController } = require("./3_Controllers/productsControllers")
const { getCategoriesController, addCategoryController, getCategoryByIDController, updateCategoryByIDController, deleteCategoryByIDController, changeCategoryStatusByIDController } = require("./3_Controllers/categoriesControllers")

const { adminAuthGuard } = require("./3_Middlewares/adminAuthGuard")
const { userViewsLimitGuard } = require("./3_Middlewares/userViewsLimitGuard")

function loadRootRoutes(root) {

    // The root path just sends a dummy random greeting defined in indexController
    root.get('/', indexController)

}

function loadAdminAuthRoutes(admin_auth) {

    // Admin authorization routes provide login and signup
    admin_auth.post("/login/", loginController)
    admin_auth.post("/signup/", signUpController)

}

function loadAdminRoutes(admin, admin_auth) {

    // For '/admin/auth'
    loadAdminAuthRoutes(admin_auth)
    admin.use("/auth/", admin_auth)

    // Once authorized, admins can do everything, so must pass by the authorization guard
    // Middlewares apply in sequence, i.e., this guard will only apply to routes coming after
    // i.e., the paths loaded by loadAdminAuthRoutes are NOT guarded
    admin.use(adminAuthGuard)
    admin.get("/users/", getUsersController)
    admin.post("/users/", addUserController)
    admin.get("/users/:id", getUserByIDController)
    admin.delete("/users/:id", deleteUserByIDController)

    // There are also products which we want to CRUD
    admin.get("/products/", getProductsController)
    admin.post("/products/", addProductController)
    admin.get("/products/:id", getProductByIDController)
    admin.put("/products/:id", updateProductByIDController)
    admin.delete("/products/:id", deleteProductByIDController)
    admin.get("/products/category/:id", getProductsByCategoryIDController)

    // There are also categories which we want to CRUD
    admin.get("/categories/", getCategoriesController)
    admin.post("/categories/", addCategoryController)
    admin.get("/categories/:id", getCategoryByIDController)
    admin.put("/categories/:id", updateCategoryByIDController)
    admin.delete("/categories/:id", deleteCategoryByIDController)
    admin.put("/categories/:id/change-status", changeCategoryStatusByIDController)

}

function loadHRDeptRoutes(hrdept) {

    // The HR department can only GET all users, or a specific user by ID
    hrdept.get("/users/", userViewsLimitGuard, getUsersController)
    hrdept.get("/users/:id", userViewsLimitGuard, getUserByIDController)

    // Likewise for products
    hrdept.get("/products/", getProductsController)
    hrdept.get("/products/:id", getProductByIDController)
    hrdept.get("/products/category/:id", getProductsByCategoryIDController)

    // Likewise for categories
    hrdept.get("/categories/", getCategoriesController)
    hrdept.get("/categories/:id", getCategoryByIDController)

}

module.exports = { loadRootRoutes, loadAdminRoutes, loadHRDeptRoutes }