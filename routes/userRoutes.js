const express = require('express')
const multer = require('multer');
const path = require('path');

const router = express.Router()

const userControllers = require('../controllers/userController')
const loggedMiddleware = require('../middlewares/loggedMiddleware')

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

/*** CREATE ONE USER ***/
router.get('/register', loggedMiddleware, userControllers.register)
router.post('/', upload.single('image'), userControllers.store); 

/*** FORMULARIO DE LOGIN ***/
router.get('/login', loggedMiddleware, userControllers.login)

/*** PROCESAR EL LOGIN ***/
router.post('/login', userControllers.loginProcess)

/*** LOGOUT ***/
router.get('/logout', userControllers.logout)

module.exports = router