function adminMiddleware(req, res, next){
    if (!(req.session.usuarioLogueado && req.session.usuarioLogueado.category == "Admin")){ //consulta si el usuario no esta logueado y tiene la categoria Admin
        return res.redirect('/');
    }
    next();
}

module.exports = adminMiddleware;