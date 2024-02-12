const { findById } = require('../models/categoryModel')
const Category = require('../models/categoryModel')

exports.createCategory = async (req, res) => {
   try {
      const {name} = req.body
      if(!name){
         return res.json({error : "Name is required!"})
      }
      const existingCategory = await Category.findOne({name})
      if(existingCategory){
         return res.json({error: "Already exist!"})
      }
      const category = await new Category({name}).save()
      res.status(200).json(category)
   } catch (error) {
      res.status(500).json({error})
   }
}
exports.getAllCategories = async (req, res) => {
   try {
      const categories = await Category.find({}).sort('createdAt')
      res.status(200).json(categories)
   } catch (error) {
      res.status(500).json({error: "Internal server error!"})
   }
}
exports.getCategory = async (req, res) => {
   try {
      const category = await Category.findById({_id: req.params.id})
      if(!category) return res.status(404).json({error: "Category not found!"})
      res.status(200).json(category)
   } catch (error) {
      res.status(500).json({error: "Internal server error!"})
   }
}
exports.updateCategory = async (req, res) => {
   try {
      const { name } = req.body
      const { id } = req.params
      const category = await Category.findById({_id: id})
      if(!category) return res.status(404).json({error: "Category not found!"})
      if(!name) return res.status(401).json({error : "Name is required!"})
      category.name = name
      const updatedCatgory = await category.save()
      res.status(200).json(updatedCatgory)
   } catch (error) {
      res.status(500).json({error: error})
   }
}
exports.deleteCategory = async (req, res) => {
   try {
      const deletedCategory = await Category.findByIdAndDelete({_id: req.params.id})
      if(!deletedCategory) return res.status(404).json({error: "Category not found!"})
      res.status(200).json(deletedCategory)
   } catch (error) {
      res.status(500).json({error: "Internal server error!"})
   }
}