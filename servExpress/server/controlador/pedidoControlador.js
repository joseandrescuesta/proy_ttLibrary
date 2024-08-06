var mongoose = require('mongoose');
var Libro = require('../modelo/libro');


//Consulta todos los libros
exports.getAllLibros = async function (req, res) {
    try {
        const rta = await Libro.aggregate([
            {
                $lookup: {
                    from: 'autors',
                    localField: 'autor',
                    foreignField: '_id',
                    as: 'autor'
                }
            },
            {
                $lookup: {
                    from: 'materials',
                    localField: 'material',
                    foreignField: '_id',
                    as: 'material'
                }
            },
            {
                $lookup: {
                    from: 'categorias',
                    localField: 'categoria',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            {
                $unwind: '$autor'
            },
            {
                $unwind: '$material'
            },
            {
                $unwind: '$categoria'
            }
        ]);
        console.log("Rta: " + rta);
        res.send({ msg: 'OK', info: rta });

    } catch (err) {
        console.log("Error: " + err)
        res.status(500).send({ msg: "Error: ", info: "Informacion no disponible" });
    };

};


// Consultar un libro por topografico
exports.getLibro = async function (req, res) {
    try {
        console.log("===============>>>" + req.body.topografico);
        const rta = await Libro.find({ isbn: req.body.topografico })
        console.log("Rta:" + rta);
        res.send({ msg: "OK", info: rta });

    } catch (err) {
        console.log("ER:" + err);
        res.status(500).send({ msg: "ER", info: "Información no disponible" });
    }
    finally {
        console.log("Finalizo la consulta del libro");
    }
};

// Eliminar un libro por ISBN
exports.delLibro = function (req, res) {
    try {
        console.log("===============>>>" + req.body.isbn);
        Libro.deleteOne({ isbn: req.body.isbn })
            .then((rta) => {
                console.log("Rta:" + JSON.stringify("se elimino " + (rta.deletedCount) + " registro"));
                res.send({ msg: "OK", info: rta });
            })
            .catch(err => {
                console.log("ER:" + err);
                res.send({ msg: "ER", info: "El registro no pudo ser eliminado, intente mas tarde" });
            });
    } catch (err) {
        console.log("ERROR eliminando libro:" + err);
    }

};

// crear libro
exports.addLibro = async function (req, res) {
    try {
        console.log("Vamos a crear el libro " + req.body.titulo);
        const idAutor = new mongoose.Types.ObjectId(req.body.autor);
        const idCategoria = new mongoose.Types.ObjectId(req.body.categoria);
        const idMaterial = new mongoose.Types.ObjectId(req.body.material);

        let nLibro = new Libro({
            topografico: req.body.topografico,
            titulo: req.body.titulo,
            autor: idAutor,
            material: idMaterial,
            isbn: req.body.isbn,
            editorial: req.body.editorial,
            anno: req.body.anno,
            paginas: req.body.paginas,
            ejemplares: req.body.ejemplares,
            resumen: req.body.resumen,
            categoria: idCategoria

        });
        await nLibro.save()
        console.log(`se creo un nuevo libro con id ${nLibro._id}`);
        res.send({ msg: "OK", info: "Libro creado con exito" });

    } catch (err) {
        console.log("ER:" + err);
        res.send({ msg: "ER", info: "El libro no pudo ser creado, intente mas tarde" });

    } finally {
        console.log("Finalizo la creacion del libro");
    }

};

// Actualizar libro (x ISBN)
exports.updLibro = async function (req, res) {
    try {
        console.log("===============>>>" + req.body.isbn);
        const idAutor = mongoose.Types.ObjectId(req.body.autor);
        const idCategoria = mongoose.Types.ObjectId(req.body.categoria);
        const idMaterial = mongoose.Types.ObjectId(req.body.material);

        const datosActualizados = {
            "topografico": req.body.isbn,
            "titulo": req.body.titulo,
            "autor": idAutor,
            "material": idMaterial,
            "isbn": req.body.isbn,
            "editorial": req.body.editorial,
            "anno": req.body.anno,
            "paginas": req.body.paginas,
            "ejemplares": req.body.ejemplares,
            "resumen": req.body.resumen,
            "categoria": idCategoria
        }

        const rta = await Libro.updateOne({ isbn: req.body.isbn }, { $set: datosActualizados })

        console.log("Rta:" + JSON.stringify(rta));
        if (rta.modifiedCount < 1) {
            res.statusCode = 404;
            res.send({ msg: "ER", info: "Libro no existe." });
        } else {
            res.send({ msg: "OK", info: "Libro actualizado." });
        }
    }
    catch (err) {
        console.log("ER:" + err);
        res.send({ msg: "ER", info: "Información no disponible, intente mas tarde" });
    };

};
