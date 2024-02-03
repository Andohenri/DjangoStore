const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')
const { authanticate, authenticateAdmin } = require('../middlewares/auth')

router.get('/', authanticate, authenticateAdmin, userCtrl.getUsers)
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/logout', userCtrl.logout)

router.route('/profile')
    .get(authanticate, userCtrl.getCurrentUserProfile)
    .put(authanticate, userCtrl.updateCurrentUserProfile)

router.route('/:id')
    .delete(authanticate, authenticateAdmin, userCtrl.deleteUserById)
    .get(authanticate, authenticateAdmin, userCtrl.getUserById)

module.exports = router