const { log } = require('console');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userSessionMiddleware(req, res, next){
    res.locals.isUserSession = false;

    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = users.find(user => {
        return user.email == emailInCookie;
    })

    if(userFromCookie){
        delete userFromCookie.password;
        req.session.usuarioLogueado = userFromCookie;
    }

    if (req.session && req.session.usuarioLogueado){ //consulta si hay en session un usuario logueado
        res.locals.isUserSession = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        //console.log(res.locals.usuarioLogueado);
    }
    
    next();
}

module.exports = userSessionMiddleware;