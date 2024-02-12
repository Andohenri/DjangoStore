const express = require('express')
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategory } = require('../controllers/categoryController')
const { authenticateAdmin, authanticate } = require('../middlewares/auth')

const router = express.Router()


router.route('/')
   .get(authanticate, getAllCategories)
   .post(authanticate, authenticateAdmin, createCategory)
router.route("/:id")
   .get(authanticate, authenticateAdmin, getCategory)
   .put(authanticate, authenticateAdmin, updateCategory)
   .delete(authanticate, authenticateAdmin, deleteCategory)


module.exports = router