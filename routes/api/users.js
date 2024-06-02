const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de usuarios
router.get('/', usersAPIController.list);
//Detalle de un usuario
router.get('/:id', usersAPIController.detail);
// //Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', moviesAPIController.recomended);
// //Agregar una película
// router.post('/create', moviesAPIController.create);
// //Modificar una película
// router.put('/update/:id', moviesAPIController.update);
// //Eliminar una película
// router.delete('/delete/:id', moviesAPIController.destroy);

module.exports = router;