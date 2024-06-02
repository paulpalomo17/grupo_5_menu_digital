const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { log } = require('console');


const usersAPIController = {
    list: async (req, res) => {
        try {
            await db.User.findAll({
                attributes: { exclude: ['password', 'category_id'] } // Excluir el campos 
            })
                .then(users => {
                    let result = users.map(user => {
                        return {
                            ...user.dataValues, // Copia todas las propiedades existentes
                            detail: `http://localhost:3000/api/users/${user.id}`, // Agrega una nueva propiedad
                            imageURL: `http://localhost:3000/images/users/${user.image}` // Agrega una nueva propiedad
                        };
                    });

                    let respuesta = {
                        meta: {
                            status: 200,
                            count: users.length,
                            url: 'http://localhost:3000/users'
                        },
                        data: result
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        try {
            await db.User.findByPk(req.params.id,
                {
                    attributes: { exclude: ['password', 'category_id'] } // Excluir el campos 
                }
            )
                .then(user => {
                    user.dataValues.imageURL = `http://localhost:3000/images/users/${user.image}`

                    let respuesta = {
                        meta: {
                            status: 200,
                            url: `http://localhost:3000/api/users/${user.id}`
                        },
                        data: user
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = usersAPIController;