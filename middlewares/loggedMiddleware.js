function loggedMiddleware(req, res, next){
    if (req.session.usuarioLogueado){ //consulta si el usuario esta logueado
        return res.redirect('/');
    }
    next();
}

module.exports = loggedMiddleware;