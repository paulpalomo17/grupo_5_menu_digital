function editUserMiddleware(req, res, next){
    console.log(req.params.id);
    if (!req.session.usuarioLogueado){ //consulta si el usuario no esta logeado 
        return res.redirect('/users/login');
    }else{
        if(!(req.session.usuarioLogueado.id == req.params.id)){
            return res.redirect('/users/profile');
        }
    }
    next();
}

module.exports = editUserMiddleware;