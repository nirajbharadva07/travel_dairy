const routes = require("express").Router();
const roleController = require("../controllers/Role_Controller.js")

routes.get("/roles",roleController.getAllRoles)

routes.post("/role",roleController.createAllRoles)

routes.delete("/role/:id",roleController.deleteRole)

routes.get("/roles/:id",roleController.getRoleByid)

module.exports = routes 