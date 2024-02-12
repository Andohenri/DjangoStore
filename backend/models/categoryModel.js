const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
   name:{
      type: String,
      required: true,
      trim: true,
      maxLenght: 32,
      unique: true
   }
})

module.exports = mongoose.model('Category', categorySchema)
