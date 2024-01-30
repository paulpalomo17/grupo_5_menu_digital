const express = require('express')
const router = express.Router()

const mainControllers = require('../controllers/mainController')

router.get('/', mainControllers.home)
router.post('/home', mainControllers.inicio)

module.exports = router