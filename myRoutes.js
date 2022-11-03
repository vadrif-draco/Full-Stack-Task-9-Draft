const { indexController, getUsersController, addUserController, getUserByIDController, deleteUserByIDController } = require('./myControllers')
const { userViewsLimitGuard, adminAuthGuard } = require('./myGuards')

function loadAdminRoutes(admin) {
    
    // Admins can do everything
    admin.get("/users/", getUsersController)
    admin.post("/users/", addUserController)
    admin.get("/users/:id", getUserByIDController)
    admin.delete("/users/:id", deleteUserByIDController)

}

function loadHRDeptRoutes(hrdept) {

    // The HR department can only GET all users or a specific user by ID
    hrdept.get("/users/", getUsersController)
    hrdept.get("/users/:id", userViewsLimitGuard, getUserByIDController)

}

function loadRoutes(root, admin, hrdept) {

    // The root app users can only GET the root '/' path (for demo purposes)
    root.get('/', indexController)
    
    // For '/admin/' prefixed paths, use the admin app as defined above
    loadAdminRoutes(admin)
    root.use("/admin/", adminAuthGuard, admin)
    
    // For '/hr/' prefixed paths, use the HR Dept. app as defined above
    loadHRDeptRoutes(hrdept)
    root.use("/hr/", hrdept)

}

module.exports = { loadRoutes }