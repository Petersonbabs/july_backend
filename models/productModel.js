const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 20
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "rejected"]
    },
    category: {
        type: String,
        enum: ["Fashion", "Gadgets", "Electronics"]
    },
    inStock: {
        type: Boolean,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

})

const productModel = mongoose.model("products", productSchema)
module.exports = productModel