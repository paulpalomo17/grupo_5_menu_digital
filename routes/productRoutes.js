const express = require('express')
const multer = require('multer');
const path = require('path');

const router = express.Router()

const productController = require('../controllers/productController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, cb) => {
        //console.log(file)
        const newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
})

const upload = multer({ storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', productController.list); 
router.get('/carrito', productController.carrito)

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productController.create); 
router.post('/', upload.single('image'), productController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productController.edit); 
router.put('/:id', upload.single('image'), productController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.delete);

module.exports = router