const express = require("express")
const productRouter = express.Router()
const { addProductHandler, getProductsHandler, getSingleProduct, updateProduct, deleteProduct, searchSortFilterProducts } = require("../controllers/productControllers")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")
const productImageUpload = require("../middlewares/productMedia")


productRouter.post("/", isLoggedIn, productImageUpload.single("image"), addProductHandler)

productRouter.get("/", getProductsHandler)
productRouter.get("/search", searchSortFilterProducts)
productRouter.get("/:productId", getSingleProduct)
productRouter.patch("/:productId", updateProduct)
productRouter.delete("/:productId", deleteProduct)

module.exports = productRouter