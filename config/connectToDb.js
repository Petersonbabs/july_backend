const mongoose = require("mongoose")
const dotEnv = require("dotenv")
dotEnv.config()

const mongoUri = process.env.MONGO_URI

const connectTodDb = async () => {
    console.log("connecting...")
    try {
        const connected = await mongoose.connect(mongoUri)
        if (connected) {
            console.log("Mongodb Connected!")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectTodDb