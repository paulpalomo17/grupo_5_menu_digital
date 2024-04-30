const express = require('express')
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const router = express.Router()

const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

const validationsCreateProduct = [
    body('name')
        .notEmpty().withMessage('Tienes que escribir un nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('Tienes que escribir una descripción').bail()
        .isLength({ min: 20 }).withMessage('El nombre debe tener al menos 20 caracteres'),
    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if(file){
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        }),
    body('type')
        .notEmpty().withMessage('Tienes que elegir un tipo'),
    body('price')
        .notEmpty().withMessage('Tienes que escribir un numero').bail()
        .isNumeric().withMessage('Tiene que ingresar un valor numerico'),
]

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
router.get('/carrito', authMiddleware, productController.carrito)
router.get('/search', productController.search);

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', adminMiddleware, productController.create);
router.post('/', upload.single('image'), validationsCreateProduct, productController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', adminMiddleware, productController.edit); 
router.put('/:id', upload.single('image'), validationsCreateProduct, productController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.delete);

module.exports = router