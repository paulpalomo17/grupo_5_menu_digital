const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const userSessionMiddleware = require('./middlewares/userSessionMiddleware')

const app = express();

const db = require("./database/models");

const publicPath =  path.resolve(__dirname, './public'); 
app.use( express.static(publicPath) );

app.use(session( {secret: "Mensaje secreto", resave: false, saveUninitialized: false}));
app.use(cookies());
app.use(userSessionMiddleware);

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.listen(3000, () =>{
    console.log('Servidor corriendo en el puerto 3000...');
    //db.sequelize.sync({ force: true });
});

const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/', mainRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.use((req, res, next) => {
    res.status(404).render('not-found')
})