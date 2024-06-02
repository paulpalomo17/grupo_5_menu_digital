const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { log } = require('console');
const LIMIT = 6;

const proudctsAPIController = {
    list: async (req, res) => {
        try {
            await db.Product.findAll({
                include: ['types', 'categories_products'],
                // limit: 10,
                // offset : req.params.offset
            })
                .then(products => {
                    let result = products.map(product => {
                        return {
                            ...product.dataValues, // Copia todas las propiedades existentes
                            detail: `http://localhost:3000/products/detail/${product.id}`, // Agrega una nueva propiedad
                            imageURL: `http://localhost:3000/images/products/${product.image}` // Agrega una nueva propiedad
                        };
                    });
                    const conteotypes = {}; // Este será nuestro objeto final
                    products.forEach(product => {
                        const { types } = product; // Extraemos el tipo del producto
                        if (conteotypes[types.dataValues.name]) {
                            // Si el tipo ya está en el objeto, incrementamos el contador
                            conteotypes[types.dataValues.name]++;
                        } else {
                            // Si el tipo no está, la agregamos e iniciamos el contador en 1
                            conteotypes[types.dataValues.name] = 1;
                        }
                    });

                    let total = [];
                    total.push(conteotypes);

                    let respuesta = {
                        meta: {
                            status: 200,
                            count: products.length,
                            url: 'http://localhost:3000/products'
                        },
                        data: result,
                        countByType: conteotypes
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    },
    listV2: async (req, res) => {
        const page = parseInt(req.query.page) || 1; //Obtenemos el numero de pagina o 1 por defecto
        const offset = (page - 1) * LIMIT; // calculo del indice de inicio en base a la pagina actual

        try {
            await db.Product.findAll()
                .then(products => {
                    let result = products.map(product => {
                        return {
                            ...product.dataValues, // Copia todas las propiedades existentes
                            detail: `http://localhost:3000/products/detail/${product.id}`, // Agrega una nueva propiedad
                            imageURL: `http://localhost:3000/images/products/${product.image}` // Agrega una nueva propiedad
                        };
                    });

                    const paginatedProducts = result.slice(offset, offset + LIMIT); //elementos de la pagina
                    const totalPages = Math.ceil(result.length / LIMIT); //total de paginas

                    let respuesta = {
                        meta: {
                            status: 200,
                            count: paginatedProducts.length,
                            url: 'http://localhost:3000/products/v2'
                        },
                        data: paginatedProducts,
                        currentPage: page,
                        totalPages: totalPages,
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        try {
            await db.Product.findByPk(req.params.id,
                {
                    include: ['types', 'categories_products'],
                }
            )
                .then(product => {
                    product.dataValues.imageURL = `http://localhost:3000/images/products/${product.image}`
                    const combinedAssociations = [];
                    combinedAssociations.push({
                        types: product.types,
                        categories_products: product.categories_products
                    });

                    // Eliminar 'types' y 'categories_products' del objeto de respuesta
                    const result = product.get({ plain: true });
                    delete result.types;
                    delete result.categories_products;

                    let respuesta = {
                        meta: {
                            status: 200,
                            url: `http://localhost:3000/api/products/${product.id}`
                        },
                        associations: combinedAssociations,
                        data: result
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    },
    totals: async (req, res) => {
        let totalProducts;
        let totalUsers;
        let totalTypes;
        try {
            await db.Product.findAll()
                .then(products => {
                    totalProducts = products.length
                })
            await db.User.findAll()
                .then(users => {
                    totalUsers = users.length
                })
            await db.Type.findAll()
                .then(types => {
                    totalTypes = types.length
                })
            let totals = [
                { name: `Productos`, count: totalProducts, color: `success`, icon: `fa-bag-shopping` },
                { name: `Usuarios`, count: totalUsers, color: `danger`, icon: `fa-circle-user` },
                { name: `Tipos`, count: totalTypes, color: `warning`, icon: `fa-list` }
            ]
            let respuesta = {
                meta: {
                    status: 200,
                    url: 'http://localhost:3000/products/totals'
                },
                data: totals
            }
            res.json(respuesta);
        } catch (error) {
            console.log(error);
        }
    },
    listTypes: async (req, res) => {
        try {
            await db.Type.findAll()
                .then(types => {
                    let respuesta = {
                        meta: {
                            status: 200,
                            count: types.length,
                            url: 'http://localhost:3000/products/listtypes'
                        },
                        data: types
                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    },
    types: async (req, res) => {
        try {
            await db.Type.findAll(
                {
                    include: ['products']
                }
            )
                .then(types => {
                    let result = types.map(type => {
                        return {
                            ...type.dataValues, // Copia todas las propiedades existentes
                            count: type.products.length, // Agrega una nueva propiedad
                        };
                    });

                    let respuesta = {
                        meta: {
                            status: 200,
                            count: types.length,
                            url: 'http://localhost:3000/products/types'
                        },
                        data: result,

                    }
                    res.json(respuesta);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = proudctsAPIController;