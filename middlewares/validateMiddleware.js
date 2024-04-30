const { body } = require('express-validator');

function validateMiddleware(req, res, next){
    if (!(req.session.usuarioLogueado && req.session.usuarioLogueado.category_id == 1)){ //consulta si el usuario no esta logueado y tiene la categoria Admin
        return res.redirect('/');
    }
    next();
}

module.exports = validateMiddleware;