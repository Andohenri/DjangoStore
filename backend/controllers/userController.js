const User = require('../models/userModel')
const bcrypt = require('bcrypt/bcrypt')
const { generateToken } = require('../utils/createToken')

exports.signup = (req, res) => {
    const {username, email, password} = req.body
    bcrypt.hash(password, 10)
    .then(hash => {
        User.create({
            username,
            email,
            password: hash
        })
        .then((user) => {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(res, user)
            })
        })
        .catch(error => res.status(400).json(error))
    })
    .catch(error => res.status(500).json(error))
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) return res.status(401).json({ message : 'email/mot de passe incorrecte!' })
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ message : 'email/mot de passe incorrecte!' })
            }
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(res, user)
            })
        }).catch(err => res.status(500).json({ err }))
    }).catch(error => res.status(500).json({ error2: error }))
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logged out succesfully!"})
}

exports.getUsers = async (req, res) => {
    await User.find({}).select("-password")
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => res.status(404).json({error: err}))
}

exports.getCurrentUserProfile = async (req, res) => {
    await User.findById(req.auth._id).select("-password")
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => res.status(404).json({error: err}))
}

exports.updateCurrentUserProfile = async (req, res) => {
    await User.findById(req.auth._id)
    .then(userfound => {
        userfound.username = req.body.username || userfound.username
        userfound.email = req.body.email || userfound.email
        if(req.body.password){
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                userfound.password = hash
            }).catch(err => res.status(500).json(err)) 
        }
        userfound.save()
        return res.status(200).json({
            _id: userfound._id,
            username: userfound.username,
            email: userfound.email,
            isAdmin: userfound.isAdmin
        })
    }).catch(err => res.status(500).json(err))
}

exports.deleteUserById = async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id})
    .then(userFound => {
        if(!userFound){
            return res.status(400).json({error: "User not found!"})
        }
        res.status(200).json({message: "User deleted succesfuly!"})
    }).catch(error => res.status(500).json({ message: error.message }))
}

exports.getUserById = async (req, res) => {
    await User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(() => res.status(404).json({message: "User not found!"}))
}

exports.updateUserById = async (req, res) => {
    await User.findById(req.params.id)
    .then(userfound => {
        userfound.username = req.body.username || userfound.username
        userfound.email = req.body.email || userfound.email
        const updateUser = userfound.save()
        return res.status(200).json({updateUser})
    }).catch(err => res.status(500).json({message: "User not found!"}))

}