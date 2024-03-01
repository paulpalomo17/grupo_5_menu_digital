function userSessionMiddleware(req, res, next){
    res.locals.isUserSession = false;

    if (req.session && req.session.usuarioLogueado){ //consulta si hay en session un usuario logueado
        res.locals.isUserSession = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }
    next();
}

module.exports = userSessionMiddleware;