const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const bcrypt = require('bcryptjs');

const userControllers = {
    // Create - Formulario de registro de un usuario
    register: async (req,res) => {
        try {
            const allCategory = await db.Category_user.findAll();
            res.render('register', {allCategory});
        } catch (error) {
            console.log(error);
        }
    },
    // Create -  Metodo de almacenamiento de un usuario
    store: async (req, res) => {
        try {
            const allCategory = await db.Category_user.findAll();
            //Validaciones de campos
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0){ // Si hay errores
                return res.render('register', {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                    allCategory
                });
            }

            //Buscar si el email ingresado ya existe 
            let userInDB = await db.User.findOne({
                where: {
                    email : req.body.email
                }
            })
            if (userInDB){// Si existe
                return res.render('register', {
                    errors : {
                        email: {
                            msg : 'Este email ya está registrado'
                        }
                    },
                    oldData : req.body,
                    allCategory
                })
            }

            let passEncriptado = bcrypt.hashSync(req.body.password, 10); //encriptar contraseña

            await db.User.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email : req.body.email,
                password : passEncriptado,
                category_id: req.body.category,
                image: req.file?.filename || 'default-image-user.png',
            })
            res.redirect('/users/login')
        } catch (error) {
            console.log(error);
        }
    },
    // Login - Formulario de login
    login: (req,res) => {
        res.render('login');
    },
    // Login - Proceso de login
    loginProcess: async (req,res) => {
        try {
            //Validaciones de campos
            const loginValidation = validationResult(req);
            if (loginValidation.errors.length > 0){ // Si hay errores
                return res.render('login', {
                    errors : loginValidation.mapped()
                });
            }

            //Buscando por email
            let userBuscado = await db.User.findOne({
                where: {
                    email : req.body.email
                }
            })
            
            if (userBuscado){// Si existe
                let correctPassword = bcrypt.compareSync(req.body.password, userBuscado.password);
                if(correctPassword){
                    delete userBuscado.password; //no lo borra
                    req.session.usuarioLogueado = userBuscado;
                    //console.log(req.session.usuarioLogueado);
                    if(req.body.recordar){
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)*60}) //guardar la cookie por 1 min
                    }
                    //return res.json(userBuscado);
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
        } catch (error) {
            console.log(error);
        }
    },
    //Profile - Perfil de usuario registrado
    profile: async (req,res) => {
        const user = await db.User.findOne({
            include : ['categories_users'],
            where: {email: req.session.usuarioLogueado.email}, 
        })
        res.render('userProfile', {user});
    },
    //Logout - Cerrar session
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },
    // Update - Formulario de edicion de usuario
	edit: async (req, res) => {
		try {
			//Busqueda de usuario
			const userBuscado = await db.User.findByPk(req.params.id)
			const allCategory = await db.Category_user.findAll();
			res.render('userEdit-form', {userToEdit : userBuscado, allCategory});
		} catch (error) {
			console.log(error);
		}
	},
	// Update - Metodo de edicion de un usuario
	update: async (req, res) => {
		try {
			//Buscamos el usuario a editar con ese id
			let userEdit = await db.User.findByPk(req.params.id)
			
			if(userEdit){ //si lo encuentra
                //valide el email
                if(userEdit.email != req.body.email){
                    //Buscar si el email ingresado ya existe 
                    let userInDB = await db.User.findOne({
                        where: {
                            email : req.body.email
                        }
                    })
                    if (userInDB){// si existe
                        if(userInDB.email != userEdit.email){
                            const allCategory = await db.Category_user.findAll();
                            return res.render('userEdit-form', {
                                errors : {
                                    email: {
                                        msg : 'Este email ya está registrado'
                                    }
                                },
                                userToEdit : userEdit,
                                allCategory
                            })
                        }
                    }
                }
                await db.User.update({
                    first_name: req.body.firstName || userEdit.first_name,
                    last_name: req.body.lastName || userEdit.last_name,
                    email: req.body.email || userEdit.email,
                    category_id: req.body.category || userEdit.category_id,
                    image: req.file?.filename || userEdit.image
                },
                {
                    where: {id: req.params.id}
                });
                //busca el usuario con los datos actualizados para guardarlo en la session
                userEdit = await db.User.findByPk(req.params.id)
                req.session.usuarioLogueado = userEdit;
                //rediriguir 
                res.redirect('/products')
			}else{
				//si no lo encuentra
				res.send('El usuario a editar no existe')
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = userControllers