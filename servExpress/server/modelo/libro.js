// importamos mongoose
var mongoose = require('mongoose');
// creamos un objeto schema con los diferentes campos que tendran los objetos de la coleccion.
var Schema = mongoose.Schema;

/**
     {

        tipo: "Libro",
        topografico: "377.3G23t",
        titulo: "Libro de Prueba 4",
        autores: ["Maria Morales"],
        editorial: "LoremIpsum",
        anno: 2001,
        isbn: 4444444444444,
        paginas: 100,
        ejemplares: 3,
        disponibles: 2,
        resumen: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula ut mauris ut mollis. Nullam finibus aliquet dui, in efficitur sem vulputate quis. Duis quis risus quis lectus sodales efficitur. Nunc finibus molestie aliquet. Morbi blandit quam quis lobortis commodo. Nunc a sem eros. Vestibulum eget libero dignissim, tempus dui.",
        tema: "Prueba de libro 04"
    }

 */



var schLibro = new Schema({
    topografico: {
        type: String,
        Required: 'El topografico es obligatorio'
    },
    autor: {
        type: Schema.Types.ObjectId,
        Required: 'El autor es obligatorio'
    },
    titulo: {
        type: String,
        Required: 'El titulo es obligatorio'
    },
    material: {
        type: Schema.Types.ObjectId,
        Required: 'El tipo de material es obligatorio'
    },
    isbn: {
        type: Number,
        Required: 'El ISBN es obligatorio'
    },
    editorial: {
        type: String,
        Required: 'La editorial es obligatoria'
    },
    anno: {
        type: Number,
        Required: 'El año de publicación es obligatorio'
    },
    paginas: {
        type: Number,
        Required: 'El numero de páginas es obligatorio'
    },
    ejemplares: {
        type: String,
        Required: 'El numero de ejemplares es obligatorio'
    },
    resumen: {
        type: String,
        Required: 'El resumen es obligatorio'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        Required: 'La categoria es obligatoria'
    },

});

module.exports = mongoose.model('Libro', schLibro);


