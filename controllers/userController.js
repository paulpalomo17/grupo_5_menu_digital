const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const bcrypt = require('bcryptjs');

const userControllers = {
    register:(req,res) => {
        res.render('register');
    },
    // Create -  Method to store
    store: (req, res) => {

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
    login:(req,res) => {
        res.render('login');
    }
}

module.exports = userControllers