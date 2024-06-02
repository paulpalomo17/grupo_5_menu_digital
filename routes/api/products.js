const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de productos
router.get('/', productsAPIController.list);
router.get('/v2', productsAPIController.listV2);
//Detalle de un producto
router.get('/totals', productsAPIController.totals);
//Listado de tipos
router.get('/listtypes', productsAPIController.listTypes);
//Tipos de producto
router.get('/types', productsAPIController.types);
//Detalle de un producto
router.get('/:id', productsAPIController.detail);


// //Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', moviesAPIController.recomended);
// //Agregar una película
// router.post('/create', moviesAPIController.create);
// //Modificar una película
// router.put('/update/:id', moviesAPIController.update);
// //Eliminar una película
// router.delete('/delete/:id', moviesAPIController.destroy);

module.exports = router;