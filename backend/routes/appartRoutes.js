const express = require("express")
const router = express.Router()
const appartCtrl = require("../controllers/appartController")
const { authanticate } = require("../middlewares/auth")

router.get('/',authanticate , appartCtrl.getAppartements)
router.get('/details',authanticate, appartCtrl.getDetails)
router.get('/:id',authanticate, appartCtrl.getAppartement)
router.post('/',authanticate, appartCtrl.createAppartement)
router.delete('/:id',authanticate, appartCtrl.deleteAppartement)
router.put('/:id',authanticate, appartCtrl.updateAppartement)

module.exports = router