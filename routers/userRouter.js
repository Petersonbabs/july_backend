const express = require("express")
const { addUserHandler } = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post("/", addUserHandler)

module.exports = userRouter