const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const blacklistedTokenModel = require("../models/blacklistedToken")
const generateRandomString = require("../utils/generateRandomString")
const sendEmail = require("../utils/sendEmail")

const signUpHandler = async (req, res) => {
    const { password } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        // hashedPass
        const hashedPassword = await bcrypt.hash(password, salt)
        // generate random token
        const verificationToken = generateRandomString()
        // generate verification expiration
        const verificationExp = Date.now() + 3600000 // the next 1 hr
        // save user to DB
        const user = await userModel.create({ ...req.body, password: hashedPassword, verificationExp, verificationToken })
        // send verification email to user
        sendEmail(user.email, user.name, verificationToken)


        const result = {
            name: user.name,
            email: user.email,
            companyName: user.companyName
        }
        if (!user) {
            return res.staus(400).json({
                status: "error",
                message: "Unable to create user"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: result
        })
    } catch (error) {
        console.log(error)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // VERIFY THE EMAIL
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        // VERIFY THE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        // GENERTE ACCESS TOKEN
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXP
        })

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token
        })

    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({
            status: "error",
            message: "Token is required"
        })
    }
    try {
        await blacklistedTokenModel.create({ token })
        return res.status(200).json({
            status: "success",
            message: "Logged out successfully!"
        })
    } catch (error) {
        console.log(error)
    }
}

// GET ALL USERS
const getUsersHandler = async (req, res) => {
    console.log(req.middleware1)
    try {
        const users = await userModel.find()
        if (!users) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch users"
            })
        }

        res.status(200).json({
            status: "success",
            message: "all users fetched",
            users
        })

    } catch (error) {
        console.log(error)
    }
}

// VERIFY ACCOUNT
const verifyyAccount = async (req, res) => {
    // collect the token
    const { token } = req.params
    try {
        // find the user with the token
        const user = await userModel.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "This token is either invalid or has been verified"
            })
        }

        // check expiration
        if (user.verificationExp < Date.now()) {
            return res.status(400).json({
                status: "error",
                message: "Token has expired. Kindly request for verification again"
            })
        }

        // update the user token and exp to null
        await userModel.findOneAndUpdate(user._id, { verificationExp: null, verificationToken: null, verified: true })
        res.status(200).json({
            status: "success",
            message: "Account verified successfully"
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    signUpHandler,
    login,
    getUsersHandler,
    logout,
    verifyyAccount
}