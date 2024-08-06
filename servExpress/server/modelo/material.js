var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schMaterial = new Schema({
    tipo: {
        type: String,
        Required: 'Se requiere el tipo de material'
    },
});

module.exports = mongoose.model('Material', schMaterial);

