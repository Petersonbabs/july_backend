const express = require("express")
const cartRouter = express.Router()

cartRouter.delete("/:id", (req, res) => {
    return res.status(200).json({
        status: "success",
        messae: "Cart item has been deleted"
    })
})

module.exports = cartRouter