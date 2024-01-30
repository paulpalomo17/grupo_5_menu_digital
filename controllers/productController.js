const path = require('path');

const productControllers = {
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