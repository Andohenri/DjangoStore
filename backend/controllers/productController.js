const Product = require('../models/productModel')
const fs = require('fs')

exports.createProduct = async (req, res) => {
   try {
      const { name, description, brand, price, category, quantity } = req.body
      switch (true) {
         case !name:
            return res.json({error: "Name is required."})
         case !description:
            return res.json({error: "Description is required."})
         case !req.file:
            return res.json({error: "Image file is required."})
         case !brand:
            return res.json({error: "Brand is required."})
         case !price:
            return res.json({error: "Price is required."})
         case !category:
            return res.json({error: "Category is required."})
         case !quantity:
            return res.json({error: "Quantity is required."})
      }

      const product = new Product({...req.body, image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
      await product.save()

      res.status(200).json(product)
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.updateProduct = async (req, res) => {
   try {
      const {name, description, brand, price, category, quantity} = req.body
      switch (true) {
         case !name:
            return res.status(401).json({error: "Name is required."})
         case !description:
            return res.status(401).json({error: "Description is required."})
         case !brand:
            return res.status(401).json({error: "Brand is required."})
         case !price:
            return res.status(401).json({error: "Price is required."})
         case !category:
            return res.status(401).json({error: "Category is required."})
         case !quantity:
            return res.status(401).json({error: "Quantity is required."})
      }
      if(req.file){
         const updatedCategory = await Product.findByIdAndUpdate(
            req.params.id, 
            {...req.body, image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},
            {new: true}
         )
         await updatedCategory.save()
         res.status(200).json(updatedCategory)
      }else{
         delete req.body.image 
         const updatedCategory = await Product.findByIdAndUpdate(
            req.params.id, 
            {...req.body},
            {new: true}
         )
         await updatedCategory.save()
         res.status(200).json(updatedCategory)
      }
   } catch (error) {
      res.status(500).json(error)
   }
}
exports.deleteProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      if(!product){
         return res.status(404).json({error: "Product not found."})
      }else{
         const filename = product.image.split('/images/')[1]
         fs.unlink(`uploads/${filename}`, (err) => {
            if(err) throw err
         })
         const productDeleted = await Product.findByIdAndDelete(req.params.id)
         res.status(200).json(productDeleted)
      }
   } catch (error) {
      res.status(500).json({error})
   }
}
exports.getProducts = async (req, res) => {
   try {
      const pageSize = 6
      const keyword = req.query.keyword 
         ? {name: {$regex: req.query.keyword, $options: "i"}}
         : {}
      
      const count = await Product.countDocuments({...keyword})
      const products = await Product.find({...keyword}).limit(pageSize)
      res.status(200).json({
         products, 
         page: 1,
         pages: Math.ceil(count / pageSize),
         hasMore: false
      })
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.getProductById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      if(!product) return res.status(404).json({error: "Product not found."})
      res.status(200).json(product)
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.fetchAllProducts = async (req, res) => {
   try {
      const products = await Product.find({}).populate("category").limit(12).sort({createdAt: -1})
      if(!products) return res.status(404).json({error: "No such Product"})
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.addProductReview = async (req, res) => {
   try {
      const {rating, comment} = req.body
      const product = await Product.findById(req.params.id)
      if(product){
         const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.auth._id.toString())
         if(alreadyReviewed){
            return res.status(400).json({error: "Product already reviewed"})
         }
         const review = {
            name: req.auth.username,
            rating: Number(rating),
            comment,
            user: req.auth._id
         }
         product.reviews.push(review)
         product.numReviews = product.reviews.length
         product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

         product.save()
         return res.status(201).json({mesasge: "Review added."})
      }else{
         return res.status(404).json({error: "Product not found"})
      }
   } catch (error) {
      res.status(500).json(error)
   }
}
exports.getTopProducts = async (req, res) => {
   try {
      const products = await Product.find({}).sort({rating: -1}).limit(4)
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.getNewProducts = async (req, res) => {
   try {
      const products = await Product.find({}).sort({_id: -1}).limit(5)
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json({error: "Internal server error."})
   }
}
exports.filteredProducts = async (req, res) => {
   try {
      const { checked, radio } = req.body
      let args = {}
      if(checked.length > 0) args.category = checked
      if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}
      const products = await Product.find(args)
      return res.status(200).json(products)
      
   } catch (error) {
      return res.status(500).json({error: "Internal server error."})
   }
}