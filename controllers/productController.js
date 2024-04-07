const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productControllers = {
    // List - Listado de todos los productos
    list: async (req,res) => {
		try {
			let products = await db.Product.findAll();
			res.render('productList', {products: products, toThousand});
		} catch (error) {
			console.log(error);
		}
    },
    // Search - Busca de productos
    search: async (req, res) => {
		try {
			//Obtener informacion del formulario req.query (GET)
			let keywords = req.query.keywords.toUpperCase();

			let result = await db.Product.findAll({
				where: {
                    name : {[Op.like]: '%'+keywords+'%'}
                }
			})

			res.render('results', { result, keywords, toThousand })
		} catch (error) {
			console.log(error);
		}
	},
    // Detail - Detalle de un producto
	detail: async (req, res) => {
		try {
			const productBuscado = await db.Product.findByPk(req.params.id)
			res.render('productDetail', {product : productBuscado, toThousand});
		} catch (error) {
			console.log(error);
		}
	},
    // Carrito de compras
    carrito:(req,res) => {
        res.render('productCart');
    },
    // Create - Formulario de creacion de producto
    create: async (req, res) => {
		try {
			let allCategory = await db.Category_product.findAll();
			let allType = await db.Type.findAll();
			res.render('productCreate-form', {allCategory, allType});
		} catch (error) {
			console.log(error);
		}
    },
    // Create -  Metodo de almacenamiento de un producto
    store: async (req, res) => {
		try {
			//Validaciones de campos
			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0){ // Si hay errores
				let allCategory = await db.Category_product.findAll();
				let allType = await db.Type.findAll();
				return res.render('productCreate-form', {
					errors : resultValidation.mapped(),
					oldData : req.body,
					allCategory, allType
				});
			}
			await db.Product.create({
				name: req.body.name,
				description: req.body.description,
				image: req.file?.filename || 'default-image-product.jpg',
				category_id: req.body.category || null,
				type_id: req.body.type,
				price: req.body.price,
			})
			res.redirect('/products')	
		} catch (error) {
			console.log(error);
		}
    },
    // Update - Formulario de edicion de producto
	edit: async (req, res) => {
		try {
			//Busqueda de producto
			const productBuscado = await db.Product.findByPk(req.params.id)
			const allCategory = await db.Category_product.findAll();
			const allType = await db.Type.findAll();
			res.render('productEdit-form', {productToEdit : productBuscado, allCategory, allType});
		} catch (error) {
			console.log(error);
		}
	},
	// Update - Metodo de edicion de un producto
	update: async (req, res) => {
		try {
			//Buscamos el producto a editar con ese id
			let productEdit = await db.Product.findByPk(req.params.id)
			
			if(productEdit){ //si lo encuentra
				await db.Product.update({
					name: req.body.name || productEdit.name,
					description: req.body.description || productEdit.description,
					image: req.file?.filename || productEdit.image,
					category_id: req.body.category || null,
					type_id: req.body.type || productEdit.type,
					price: req.body.price || productEdit.price
				},
				{
					where: {id: req.params.id}
				});
				//rediriguir 
				res.redirect('/products')
			}else{
				//si no lo encuentra
				res.send('El producto a editar no existe')
			}
		} catch (error) {
			console.log(error);
		}
	},
    // Delete - Eliminacion de un producto
	delete : async (req, res) => {
		//Obtener el id del producto
		let id = req.params.id;
		//Quitar imagen
		const productToDelete = await db.Product.findByPk(id)
		if(productToDelete.image != 'default-image-product.jpg'){
			fs.unlinkSync(path.join(__dirname, '../public/images/products', productToDelete.image))
		}
		//Quitar producto deseado
		await db.Product.destroy({
            where: {id: id}, 
            force: true}
        ) // force: true es para asegurar que se ejecute la acción
		//Redireccionar
		res.redirect('/products')
	}
}

module.exports = productControllers