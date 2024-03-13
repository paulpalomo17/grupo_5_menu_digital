const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const bcrypt = require('bcryptjs');

const userControllers = {
    // Create - Formulario de registro de un usuario
    register:(req,res) => {
        res.render('register');
    },
    // Create -  Metodo de almacenamiento de un usuario
    store: (req, res) => {
        //Validaciones de campos
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){ // Si hay errores
            return res.render('register', {
                errors : resultValidation.mapped(),
                oldData : req.body
            });
        }

        //Buscar si el email ingresado ya existe 
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        //Recorrido buscando por email
        const userInDB = users.find(user => {
            return user.email == req.body.email;
        })

        if (userInDB){// Si existe
            return res.render('register', {
                errors : {
                    email: {
                        msg : 'Este email ya está registrado'
                    }
                },
                oldData : req.body
            })
        }

        let passEncriptado = bcrypt.hashSync(req.body.password, 10); //encriptar contraseña

        const newUser = { //armado de nuevo usuario
            id: Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email : req.body.email,
            password : passEncriptado,
            category: req.body.category,
            image: req.file?.filename || 'default-image-user.png',
        }
        //Agregamos el nuevo usuario al listado
        users.push(newUser)
        //Convertimos el json a el objeto javascript
        let userJSON = JSON.stringify(users, null, ' ') 
        //Escribimos el json
        fs.writeFileSync(usersFilePath, userJSON)
        res.redirect('/')
    },
    // Login - Formulario de login
    login: (req,res) => {
        res.render('login');
    },
    // Login - Proceso de login
    loginProcess: (req,res) => {
        //Validaciones de campos
        const loginValidation = validationResult(req);
        if (loginValidation.errors.length > 0){ // Si hay errores
            return res.render('login', {
                errors : loginValidation.mapped()
            });
        }

        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        //Recorrido buscando por email
        let userBuscado = users.find(user => {
            return user.email == req.body.email;
        })

        if (userBuscado){// Si existe
            let correctPassword = bcrypt.compareSync(req.body.password, userBuscado.password);
            if(correctPassword){
                delete userBuscado.password;
                req.session.usuarioLogueado = userBuscado;
                //console.log(req.session.usuarioLogueado);
                if(req.body.recordar){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)}) //guardar la cookie por 1 min
                }

                return res.redirect('/')
            }else{
                return res.render('login', {
                    errors: {
                        credecial: {
                            msg: 'Credenciales invalidas'
                        }
                    }
                });
            }
        }else{
            return res.render('login', {
                errors: {
                    credecial: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });
        }
    },
    //Profile - Perfil de usuario registrado
    profile: (req,res) => {
        res.render('userProfile', {user : req.session.usuarioLogueado});
    },
    //Logout - Cerrar session
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = userControllers