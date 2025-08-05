const userModel = require("../models/userModel")

const addUserHandler = async (req, res) => {
    // console.log(req.body)
    try {
        const user = await userModel.create(req.body)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not created"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "user added successfully",
            user
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addUserHandler
}