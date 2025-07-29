const express = require("express")
const productRouter = express.Router()

productRouter.get("/", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "all products fetched!"
    })
})

productRouter.patch("/:id/pol", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "all products fetched updatedsgsgsgsg!"
    })
})

module.exports = productRouter