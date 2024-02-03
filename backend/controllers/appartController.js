const Appartement = require("../models/appartModel")

exports.getDetails = (req, res) => {
    Appartement.aggregate([
        {
            $group: {
                _id: null,
                totalLoyer: {$sum: "$loyer"},
                maxLoyer: {$max: "$loyer"},
                minLoyer: {$min: "$loyer"}
            }
        }
    ]).then(details => {
        res.status(200).json(details[0])
    })
}
exports.getAppartements = (req, res) => {
    Appartement.find({}).sort({ createdAt: -1 })
    .then(apparts => {
        res.status(200).json(apparts)
    })
    .catch(error => {
        res.status(400).json({message: error.message})
    })
}
exports.getAppartement = (req, res) => {
    const { id } = req.params

    Appartement.findById(id)
    .then(appart => {
        if(!appart){
            res.status(400).json({error: "No such appartement"})
        }
        res.status(200).json(appart)
    })
    .catch (error => {
        res.status(404).json({ message: error.message })
    })
}
exports.createAppartement = (req, res) => {
    const {title, loyer} = req.body
    Appartement.create({title, loyer})
    .then(appart => {
        res.status(200).json(appart)
    })
    .catch(error => {
        res.status(400).json({ error: error.message })
    })
}
exports.deleteAppartement = (req, res) => {
    const { id } = req.params
    Appartement.findOneAndDelete({_id: id})
    .then(appart => {
        if(!appart){
            return res.status(400).json({error: "No such appartement"})
        }
        res.status(200).json(appart)
    }).catch(error => {
        res.status(400).json({message: error.message})
    })
}
exports.updateAppartement = (req, res) => {
    const { id } = req.params
    const { title, loyer } = req.body
    Appartement.findOneAndUpdate({_id: id}, { title, loyer })
    .then(appart => {
        if(!appart){
            return res.status(400).json({error: "No such appartement"})
        }
        res.status(200).json(appart)
    })
    .catch(error => {
        res.status(400).json({message: error.message})
    })
}