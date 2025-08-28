const productModel = require("../models/productModel")

const addProductHandler = async (req, res) => {
    // console.log(req.body)
    const userId = req.user._id
    const file = req.file
    if (!file) {
        return res.status(400).json({
            status: "error",
            message: "file not found"
        })
    }
    try {
        const product = await productModel.create({ ...req.body, seller: userId, image: file.path })
        if (!product) {
            return res.status(400).json({
                status: "error",
                message: "Product not created"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Product added successfully",
            product
        })

    } catch (error) {
        console.log(error)
    }
}

// GET ALL PRODUCTS
const getProductsHandler = async (req, res, next) => {
    try {
        const products = await productModel.find()
        if (!products) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch products"
            })
        }

        res.status(200).json({
            status: "success",
            message: "all products fetched",
            products
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

const searchSortFilterProducts = async (req, res) => {
    try {
        const { search, minPrice, maxPrice } = req.query

        const query = {}
        if (search) {
            query.$or = [
                { name: new RegExp(search) }, // Nike Shoe // NIKE SHIE
                { description: new RegExp(search) }
            ]
        }

        if (minPrice) {
            query.price = {
                $gte: minPrice
            }
        }

        if (maxPrice) {
            query.price = {
                $lte: maxPrice
            }
        }

        const products = await productModel.find(query)
        if (!products) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch products"
            })
        }

        res.status(200).json({
            status: "success",
            message: "all products fetched",
            count: products.length,
            products
        })

    } catch (error) {
        console.log(error)
    }
}

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        // const product = await productModel.findById(productId).populate("seller", "name email companyName").select(["inStock"])
        const product = await productModel.findById(productId).populate("seller", "name email companyName").select("+inStock -category")

        if (!product) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "all product fetched",
            product
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    const { productId } = req.params
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body)
        if (!updatedProduct) {
            return res.status(400).json({
                status: "error",
                message: "Unable to update product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.params
    try {
        await productModel.findByIdAndDelete(productId)
        res.status(200).json({
            status: "success",
            message: "Product has been deleted!"
        })
    } catch (error) {
        console.log(error)
    }
}


// Model.find() => get all document in a collection
// Model.find({name: includes("nike")}) => get all document that matches  the query in a collection
// Model.findById(38838383838838383838) => return a single document with the specified objectId 
// Model.findOne({}) => return a single document
// Model.findByIdAndUpdate()
// Model.findByIdAndDelete()

// Model.deleteMany()
// Model.deleteOne()
// Model.findByIdAndRemove()
// Model.findOneAndDelete()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

module.exports = {
    addProductHandler,
    getProductsHandler,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchSortFilterProducts
}