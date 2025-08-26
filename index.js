const express = require("express")
const app = express()
const cors = require("cors")
const connectTodDb = require("./config/connectToDb")
connectTodDb()

// wrong endpoint
// error handler middleware
// duplicate
// cast error
// validation 

// jwt expired
// jwt malformed

require("./config/nodemailerTransporter")

const sendEmail = require("./utils/sendEmail")


const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")
const cartRouter = require("./routers/cartRouter")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(cors())



const PORT = 4000
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.json({ testin: "hi hi hi" })
})



app.use("/products", productRouter)
app.use("/users", userRouter)
app.use("/carts", cartRouter)

app.use("/{*any}", errorHandler)


app.all("/{*any}", (req, res) => {
    res.status(404).json({
        message: `${req.method} ${req.originalUrl} is not an endpoint on this server`
    })
})




// app.all("*", (req, res) => {
//     res.status(404).json({
//         status: "error",
//         message: "Endpoint does not exist"
//     })
// })