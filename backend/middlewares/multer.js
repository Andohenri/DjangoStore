const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads');
   },
   filename: (req, file, cb) => {
      const name = file.fieldname
      const extension = path.extname(file.originalname)
      cb(null, `${name}_${Date.now()}${extension}`)
   }
})
const fileFilter =  (req, file, cb) => {
   const filetypes = /jpe?g|png|webp/
   const mimetypes = /image\/jpe?g|image\/png|image\/webp/
   const extension = path.extname(file.originalname).toLowerCase()
   const mimetype = file.mimetype
   if(filetypes.test(extension) && mimetypes.test(mimetype)){
      cb(null, true)
   }else{
      cb(new Error("Images only"), false)
   }
}

module.exports = multer({storage, fileFilter}).single('image')