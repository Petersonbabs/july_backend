const express = require("express")
const productRouter = express.Router()
const { addProductHandler, getProductsHandler, getSingleProduct, updateProduct, deleteProduct, searchSortFilterProducts } = require("../controllers/productControllers")

productRouter.post("/", addProductHandler)
productRouter.get("/", getProductsHandler)
productRouter.get("/search", searchSortFilterProducts)
productRouter.get("/:productId", getSingleProduct)
productRouter.patch("/:productId", updateProduct)
productRouter.delete("/:productId", deleteProduct)

module.exports = productRouter