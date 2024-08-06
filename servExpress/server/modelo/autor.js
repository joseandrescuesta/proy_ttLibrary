var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schAutor = new Schema({
    nombre: {
        type: String,
        Required: 'Se requiere el nombre del autor'
    },
});

module.exports = mongoose.model('Autor', schAutor);

