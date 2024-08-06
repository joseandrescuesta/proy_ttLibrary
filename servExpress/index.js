var mongoose = require('mongoose');
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");


const hostname = 'localhost';
const port = 2000;

// CONEXION A LA BASE DATOS
var bdURL = 'mongodb://127.0.0.1:27017/dbBiblio';
mongoose.connect(bdURL);

//CONFIGURACION EVENTOS DE LA CONEXION
mongoose.connection.on('connected', function () {
    console.log("Conexion a mongo realizada en: " + bdURL);
});
mongoose.connection.on('error', function (err) {
    console.log("ERROR: no hay conexion a mongo: " + err);
});
mongoose.connection.on('disconnected', function (err) {
    console.log("Desconexion a mongo db realizada con exito." + err);
});
// Cuando termine Node se desconecta de mongo
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Conexion con base de datos terminada por finalizacion del servidor.");
        process.exit(0);
    });
});


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bp.json());

// Configuramos el directorio donde express debe tomar el recurso solicitado. 

app.use(express.static(path.join(__dirname, 'public')));

require('./server/rutas/pedidoRutas')(app);
require('./server/rutas/pedidoAutor')(app);

app.use((req, res, next) => {
    console.log("Cabecera: " + req.headers);
    res.end('<html><body><h1>Respuesta servidor express</h1></body></html>');
});


app.listen(port, hostname, () => {
    console.log(`servidor en ejecucion en http://${hostname}:${port}`);
})