const express = require("express")
const { addUserHandler, getUsersHandler } = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post("/", addUserHandler)
userRouter.get("/", getUsersHandler)

module.exports = userRouter