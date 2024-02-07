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
    detalle:(req,res) => {
        res.render('productDetail');
    },
    carrito:(req,res) => {
        res.render('productCart');
    },
    create:(req,res) => {
        res.render('productCreate-form');
    },
    edit:(req,res) => {
        res.render('productEdit-form');
    }
}

module.exports = productControllers