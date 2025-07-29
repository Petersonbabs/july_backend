const express = require("express")
const app = express()
// MVC + R = MODEL, VIEW, CONTROLLER, ROUTES

const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/usersRouter")
const cartRouter = require("./routers/cartRouter")


// middlewareFunction
app.use(express.json())

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




// const products = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 59.99,
//     category: "Electronics",
//     stock: 25,
//     image: "/images/headphones.jpg",
//   },
//   {
//     id: 2,
//     name: "Running Shoes",
//     price: 89.99,
//     category: "Footwear",
//     stock: 40,
//     image: "/images/shoes.jpg",
//   },
//   {
//     id: 3,
//     name: "Smartwatch",
//     price: 129.99,
//     category: "Electronics",
//     stock: 18,
//     image: "/images/smartwatch.jpg",
//   },
//   {
//     id: 4,
//     name: "Gaming Mouse",
//     price: 39.99,
//     category: "Accessories",
//     stock: 60,
//     image: "/images/mouse.jpg",
//   },
//   {
//     id: 5,
//     name: "Office Chair",
//     price: 199.99,
//     category: "Furniture",
//     stock: 12,
//     image: "/images/chair.jpg",
//   },
//   {
//     id: 6,
//     name: "Bluetooth Speaker",
//     price: 49.99,
//     category: "Audio",
//     stock: 33,
//     image: "/images/speaker.jpg",
//   },
//   {
//     id: 7,
//     name: "Yoga Mat",
//     price: 24.99,
//     category: "Fitness",
//     stock: 50,
//     image: "/images/yoga-mat.jpg",
//   },
//   {
//     id: 8,
//     name: "LED Monitor",
//     price: 179.99,
//     category: "Electronics",
//     stock: 10,
//     image: "/images/monitor.jpg",
//   },
//   {
//     id: 9,
//     name: "Backpack",
//     price: 34.99,
//     category: "Accessories",
//     stock: 45,
//     image: "/images/backpack.jpg",
//   },
//   {
//     id: 10,
//     name: "Electric Toothbrush",
//     price: 29.99,
//     category: "Personal Care",
//     stock: 20,
//     image: "/images/toothbrush.jpg",
//   },
// ];

// GET ALL PRODUCTS
// app.get("/products", (req, res)=>{
//     res.status(200).json({
//         status: "success",
//         message: "All product fetched successfully",
//         products
//     })
// })

// // ADD NEW PRODUCT
// app.post("/products",  (req, res)=>{
//     res.status(200).json({
//         status: "success",
//         message: `${req.body.name} has been added to ${req.body.category} category`,
//     })
// })

// // GET SINGLE PRODUCT
// app.get("/products/:id",  (req, res)=>{
//     // get product with the id
//     const product = products.find(ele => ele.id == req.params.id)
//     if(!product){
//         return res.status(404).json({
//             status: "error",
//             message: "Product not found",
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         message: "Single product fetched!",
//         product
//     })
// })

// // UPDATE SINGLE PRODUCT
// app.patch("/products/:id", (req, res)=>{
//     const product = products.find(ele => ele.id == req.params.id)
//     if(!product){
//         return res.status(404).json({
//             status: "error",
//             message: "Product not found",
//         })
//     }
//     // update prpduc
//     res.status(200).json({
//         status: "success",
//         message: "Product updated succesfully",
//         product
//     })
// })

// // DELETE SINGLE PRODUCT
// app.delete("/products/:id", (req, res)=>{
//     const product = products.find(ele => ele.id == req.params.id)
//     if(!product){
//         return res.status(404).json({
//             status: "error",
//             message: "Product not found",
//         })
//     }
//     // update prpduc
//     res.status(200).json({
//         status: "success",
//         message: "Product deleted succesfully"
//     })
// })

// app.patch("")

// app.post("/products/:productId", (req, res) => {
//     // console.log(req.body)
//     // console.log(req.headers)
//     // console.log(req.query)
//     console.log(req.params)
//     res.json({
//         message: `${req.body.name} has been added for ${req.body.price}`
//     })
// })

// app.get("/products/:productId", (req, res) => {

//     res.json({
        
//     })
// })



// REQUEST OBJECT
// body
// headers
// query
// params = parameters
