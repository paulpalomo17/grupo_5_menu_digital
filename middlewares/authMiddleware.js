function authMiddleware(req, res, next){
    if (!req.session.usuarioLogueado){ //consulta si el usuario no esta logeado 
        res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;