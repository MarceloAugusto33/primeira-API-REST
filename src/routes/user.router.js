const { Router } = require("express");

const UserController = require("../controller/userController");
const SessionController = require("../controller/SessionController")

const sessionController = new SessionController();
const userController = new UserController();
const userRouter = Router()

userRouter.get('/', sessionController.get)
userRouter.post('/', userController.create)

module.exports = userRouter