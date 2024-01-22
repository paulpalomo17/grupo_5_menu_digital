const express = require('express')
const router = express.Router()

const mainControllers = require('../controllers/mainController')

router.get('/', mainControllers.home)
router.get('/detalle', mainControllers.detalle)
router.get('/carrito', mainControllers.carrito)
router.post('/home', mainControllers.inicio)

module.exports = router