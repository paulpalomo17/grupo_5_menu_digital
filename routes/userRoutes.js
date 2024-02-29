const express = require('express')
const multer = require('multer');
const path = require('path');

const router = express.Router()

const userControllers = require('../controllers/userController')

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
router.get('/register', userControllers.register)
router.post('/', upload.single('image'), userControllers.store); 

router.get('/login', userControllers.login)

module.exports = router