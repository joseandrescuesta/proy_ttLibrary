var mongoose = require('mongoose');
var Categoria = require('../modelo/categoria');

exports.addCat = async function (req, res) {
    try {
        // Busca la categoria por nombre
        let catExistente = await Categoria.findOne({ nombre: req.body.nombre });

        if (catExistente) {
            // Si ya existe, devuelve su _id
            console.log(`La categoria ya existe con id ${catExistente._id}`);
            res.send({ msg: "OK", info: "Categoria ya existe", categoriaId: catExistente._id });
        } else {
            // Si la categoria no existe, crea una nueva
            let nCategoria = new Categoria({
                nombre: req.body.nombre
            });
            await nCategoria.save();
            console.log(`Se creó una nueva categoria con id ${nCategoria._id}`);
            res.send({ msg: "OK", info: "Categoria creada con éxito", categoriaId: nCategoria._id });
        }

    } catch (err) {
        console.log("ER:" + err);
        res.send({ msg: "ER", info: "La categoria no pudo ser creada, intente más tarde" });

    } finally {
        console.log("Finalizó la creación de categoria");
    }
}
