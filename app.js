const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs')

const publicPath =  path.resolve(__dirname, './public'); 

app.use( express.static(publicPath) );
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')

app.listen(3000, () =>{
    console.log('Servidor corriendo en el puerto 3000...');
});

app.use('/', mainRoutes)
app.use('/detalle', mainRoutes)
app.use('/carrito', mainRoutes)
app.use('/home', mainRoutes)

app.use('/user', userRoutes)