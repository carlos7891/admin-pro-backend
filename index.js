require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

//crear el servidor de express

const app = express();

//Configurar cors
app.use(cors());

//DbConection
dbConnection();

//rutas
app.get( '/' , (req, res) => {
    res.json({
        ok:true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})



