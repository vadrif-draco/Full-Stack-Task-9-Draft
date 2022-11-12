const {
    indexController,
    getUsersController,
    addUserController,
    getUserByIDController,
    deleteUserByIDController,
    loginController,
    signUpController,
} = require("./3_myControllers")

const {
    userViewsLimitGuard,
    adminAuthGuard
} = require('./3_myMiddlewares')

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

}

function loadHRDeptRoutes(hrdept) {

    // The HR department can only GET all users, or a specific user by ID
    hrdept.get("/users/", getUsersController)
    hrdept.get("/users/:id", userViewsLimitGuard, getUserByIDController)

}

module.exports = { loadRootRoutes, loadAdminRoutes, loadHRDeptRoutes }