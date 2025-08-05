const express = require("express")
const app = express()
const connectTodDb = require("./config/connectToDb")
connectTodDb()
// MVC + R = MODEL, VIEW, CONTROLLER, ROUTES

const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")
const cartRouter = require("./routers/cartRouter")
app.use(express.json())


// middlewareFunction


// /users
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


