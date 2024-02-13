const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productControllers = {
    list:(req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('productList', {products: products, toThousand});
    },
    // Detail - Detail from one product
	detail: (req, res) => {
        const productBuscado = products.find(product => {
            return product.id == req.params.id;
        })
		res.render('productDetail', {product : productBuscado, toThousand});
	},
    carrito:(req,res) => {
        res.render('productCart');
    },
    // Create - Form to create
    create: (req, res) => {
        res.render('productCreate-form');
    },

    // Create -  Method to store
    store: (req, res) => {
        const newProduct = { //armado de nuevo producto
            id: Date.now(),
            name: req.body.name,
            description: req.body.description,
            image: req.file?.filename || 'default-image-product.jpg',
            category: req.body.category,
            type: req.body.type,
            price: req.body.price,
        }
        //Agregamos el nuevo producto al listado
        products.push(newProduct)
        //Convertimos el json a el objeto javascript
        let productJSON = JSON.stringify(products, null, ' ') 
        //Escribimos el json
        fs.writeFileSync(productsFilePath, productJSON)
        res.redirect('/products')
    },

    // Update - Form to edit
	edit: (req, res) => {
		const productBuscado = products.find(product => {
            return product.id == req.params.id;
        })
        //console.log(productBuscado)
		res.render('productEdit-form', {productToEdit : productBuscado});
	},
	// Update - Method to update
	update: (req, res) => {
		//Obtener el id del producto a editar
		let id = req.params.id
		//Buscamos el producto a editar con ese id
		let productEdit = products.find(product => product.id == id);
		//si lo encuentra
		if(productEdit){
			productEdit.name = req.body.name || productEdit.name
            productEdit.description = req.body.description || productEdit.description
            productEdit.image = req.file?.filename || productEdit.image
            productEdit.category = req.body.category || productEdit.category
            productEdit.type = req.body.type || productEdit.type
			productEdit.price = req.body.price || productEdit.price
			//convertir a json y sobreescribir de productos
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
			//rediriguir 
			res.redirect('/products')
		}else{
			//si no lo encuentra
			res.send('El producto a editar no existe')
		}
	},
    // Delete - Delete one product from DB
	delete : (req, res) => {
		//Obtener el id del producto
		let id = req.params.id;
		//Quitar imagen
		const productToDelete = products.find(product => product.id == id)
		if(productToDelete.image != 'default-image-product.jpg'){
			fs.unlinkSync(path.join(__dirname, '../public/images/products', productToDelete.image))
		}
		//Quitar producto deseado
		products = products.filter(product => product.id != id)
		//console.log(products)
		//Convertir a json el listado actualizado
		products = JSON.stringify(products, null, 2);
		//Re-escribir el json
		fs.writeFileSync(productsFilePath, products)
		//Redireccionar
		res.redirect('/products')
	}
}

module.exports = productControllers