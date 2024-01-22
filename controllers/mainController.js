const path = require('path');

const mainControllers = {
    home:(req,res) => {
        res.render('index');
    },
    detalle:(req,res) => {
        res.render('productDetail');
    },
    carrito:(req,res) => {
        res.render('productCart');
    },
    inicio:(req,res) => {
        res.redirect("/");
    }
}

module.exports = mainControllers