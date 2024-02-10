const express = require('express')
const app = express()
const mongoose = require('mongoose')
const appartRoutes = require('./routes/appartRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors")
const cookieParser = require('cookie-parser')

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use('/api/appart', appartRoutes)
app.use('/api/user', userRoutes)

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