const usercontroller = require("../controllers/User_Controller")

const routes = require("express").Router()

routes.get("/user",usercontroller.getAllUsers)

routes.post("/user",usercontroller.createAllUser)

routes.delete("/user/:id",usercontroller.deleteUser)

routes.get("/user/:id",usercontroller.getUserById)

routes.post("/signup",usercontroller.signup)

routes.post("/login",usercontroller.login)

routes.post("/signup/forgotpassword",usercontroller.forgotPassword)

routes.post("/signup/resetpassword",usercontroller.resetPassword)



module.exports = routes
