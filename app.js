const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const app = express();
app.set('view engine', 'ejs')

const publicPath =  path.resolve(__dirname, './public'); 

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use( express.static(publicPath) );
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.listen(3000, () =>{
    console.log('Servidor corriendo en el puerto 3000...');
});

app.use('/', mainRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)

app.use((req, res, next) => {
    res.status(404).render('not-found')
})