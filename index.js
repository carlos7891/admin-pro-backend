require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

//crear el servidor de express

const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//DbConection
dbConnection();

//rutas
app.use('/api/users', (require('./routes/users')));
app.use('/api/login', (require('./routes/auth')));
app.use('/api/hospitals', (require('./routes/hospital')));
app.use('/api/doctors', (require('./routes/doctors')));
app.use('/api/search', (require('./routes/search')));
app.use('/api/upload', (require('./routes/upload')));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})



