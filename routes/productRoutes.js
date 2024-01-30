const express = require('express')
const router = express.Router()

const productControllers = require('../controllers/productController')

router.get('/detalle', productControllers.detalle)
router.get('/carrito', productControllers.carrito)
router.get('/create', productControllers.create)
router.get('/edit', productControllers.edit)

module.exports = router