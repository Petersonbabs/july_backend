const express = require("express")
const { signUpHandler, getUsersHandler, login } = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post("/", signUpHandler)
userRouter.post("/login", login)
userRouter.get("/", getUsersHandler)

module.exports = userRouter