const { Router } = require("express");

const UserController = require("../controller/userController");

const userController = new UserController();
const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.put('/', userController.update);
userRouter.delete('/', userController.delete);
userRouter.get('/', userController.show);

module.exports = userRouter