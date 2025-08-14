const express = require("express")
const { signUpHandler, getUsersHandler, login, logout } = require("../controllers/userController")
const middleware1 = require("../middlewares/middleware1")
const middleware2 = require("../middlewares/middleware2")
const userRouter = express.Router()

userRouter.post("/", signUpHandler)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/", middleware1, middleware2, getUsersHandler)

module.exports = userRouter