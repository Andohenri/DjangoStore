const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const path = require('path')

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/images', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connect to db & listenning on port ",process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

module.exports = app