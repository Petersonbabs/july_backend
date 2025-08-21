const express = require("express")
const { signUpHandler, getUsersHandler, login, logout, verifyyAccount } = require("../controllers/userController")
const middleware1 = require("../middlewares/middleware1")
const middleware2 = require("../middlewares/middleware2")
const jwt = require("jsonwebtoken");
const blacklistedTokenModel = require("../models/blacklistedToken");
const userModel = require("../models/userModel");
const userRouter = express.Router()

userRouter.post("/", signUpHandler)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/", middleware1, middleware2, getUsersHandler)

userRouter.post("/verify-account/:token", verifyyAccount)

module.exports = userRouter