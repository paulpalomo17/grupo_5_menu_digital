const path = require('path');

const mainControllers = {
    home:(req,res) => {
        res.render('index');
    },
    inicio:(req,res) => {
        res.redirect("/");
    }
}

module.exports = mainControllers