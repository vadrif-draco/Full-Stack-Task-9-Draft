const { indexController, getUsersController, addUserController, getUserByIDController, deleteUserByIDController } = require('./myControllers')

function loadRoutes(app) {

    app.get('/', indexController)

    app.get("/users", getUsersController)
    app.post("/users/", addUserController)

    app.get("/users/:id", getUserByIDController)
    app.delete("/users/:id", deleteUserByIDController)

}

module.exports = { loadRoutes }