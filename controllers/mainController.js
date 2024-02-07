const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainControllers = {
    home:(req,res) => {
        const productPopular = products.filter(product => {
            return product.category == "popular";
        })
		const productNuevo = products.filter(product => {
            return product.category == "nuevo";
        })
		res.render('index', {productPopular, productNuevo, toThousand});
    },
    inicio:(req,res) => {
        res.redirect("/");
    }
}

module.exports = mainControllers