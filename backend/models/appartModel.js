const mongoose = require('mongoose')

const appartSchema = mongoose.Schema({
    title: { type: String, required: true },
    loyer: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Appartement", appartSchema) 