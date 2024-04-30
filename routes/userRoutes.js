const express = require('express')
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const router = express.Router()

const userControllers = require('../controllers/userController')
const loggedMiddleware = require('../middlewares/loggedMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const editUserMiddleware = require('../middlewares/editUserMiddleware')

const validationsRegister = [
    body('firstName')
        .notEmpty().withMessage('Tienes que escribir un nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Tienes que escribir un apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('category')
        .notEmpty().withMessage('Tienes que elegir una categoria'),
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
        })
]

const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña')
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        //console.log(file)
        const newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
})

const upload = multer({ storage })

/*** CREAR UN USUARIO ***/
router.get('/register', loggedMiddleware, userControllers.register)
router.post('/', upload.single('image'), validationsRegister, userControllers.store); 

/*** FORMULARIO DE LOGIN ***/
router.get('/login', loggedMiddleware, userControllers.login)

/*** PROCESAR EL LOGIN ***/
router.post('/login', validationsLogin, userControllers.loginProcess)

/*** PERFIL DE USUARIO ***/
router.get('/profile', authMiddleware, userControllers.profile)

/*** LOGOUT ***/
router.get('/logout', userControllers.logout)

/*** EDITAR UN USUARIO ***/ 
router.get('/:id/edit', editUserMiddleware, userControllers.edit);
router.put('/:id', upload.single('image'), userControllers.update);

module.exports = router