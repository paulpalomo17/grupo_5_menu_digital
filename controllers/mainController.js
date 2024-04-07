const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainControllers = {
    home: async (req,res) => {
        try {
            const productPopular = await db.Product.findAll({
                where: {
                    category_id : {[Op.eq]: 1}
                }
            });
            const productNuevo = await db.Product.findAll({
                where: {
                    category_id : {[Op.eq]: 2}
                }
            });
            res.render('index', {productPopular, productNuevo, toThousand});
        } catch (error) {
            console.log(error);
        }		
    },
    inicio:(req,res) => {
        res.redirect("/");
    }
}

module.exports = mainControllers