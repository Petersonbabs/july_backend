const express = require("express")
const { signUpHandler, getUsersHandler, login, logout } = require("../controllers/userController")
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

userRouter.get("/verify-token", async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(403).json({
            status: "error",
            message: "No token was provided"
        })
    }
    const { userId, email } = await jwt.verify(token, process.env.JWT_SECRET)

    const tokenIsBlacklisted = await blacklistedTokenModel.findOne({ token })
    if (tokenIsBlacklisted) {
        return res.status(403).json({
            status: "error",
            message: "This token has been black listed"
        })
    }
    const user = await userModel.findOne({ email })

    res.status(200).json({
        status: "success",
        user
    })
})

module.exports = userRouter