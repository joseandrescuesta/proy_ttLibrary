var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schCategoria = new Schema({
    nombre: {
        type: String,
        Required: 'Se requiere el nombre de la categoria'
    },
});

module.exports = mongoose.model('Categoria', schCategoria);

