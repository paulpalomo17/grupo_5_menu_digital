function authMiddleware(req, res, next){
    if (!req.session.usuarioLogueado){ //consulta si el usuario no esta logeado 
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;