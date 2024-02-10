const jwt = require('jsonwebtoken')

exports.authanticate = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(' ')[1]
        const token = req.headers.cookie.split('=')[1]
        const decodedToken = jwt.verify(token, 'TOKEN')
        req.auth = {
            _id: decodedToken._id,
            isAdmin: decodedToken.isAdmin
        }
        next()
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.authenticateAdmin = (req, res, next) => {
    if(req.auth && req.auth.isAdmin){
        next()
    }else{
        res.status(401).json({message: "User not an Admin authentified!"})
    }
}
