'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//settings
const port = process.env.PORT || 3002;
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/index'));

//starting the server
app.listen(port, () => {
    console.log('Conexión exitosa a la base de datos');
    console.log('Server listening on port ' + port)
})
