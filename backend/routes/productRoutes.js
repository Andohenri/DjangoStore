const express = require('express')
const { createProduct, updateProduct, deleteProduct, getProductById, getProducts, fetchAllProducts, addProductReview, getTopProducts, getNewProducts } = require('../controllers/productController')
const { authenticateAdmin, authanticate } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
// const formidable = require('express-formidable')
const router = express.Router()

router.route("/")
   .get(authanticate, getProducts)
   .post(authanticate, authenticateAdmin, multer, createProduct)

router.route("/all-products")
   .get(fetchAllProducts)

router.route("/:id/review").post(authanticate, addProductReview)

router.get("/top", getTopProducts)
router.get("/new", getNewProducts)

router.route("/:id")
   .put(authanticate, authenticateAdmin, multer, updateProduct)
   .delete(authanticate, authenticateAdmin, deleteProduct)
   .get(authanticate, getProductById)

module.exports = router