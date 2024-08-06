var mongoose = require('mongoose');

var Material = require('../modelo/material');

exports.addMat = async function (req, res) {
    try {
        // Busca el material por tipo
        let tipoExistente = await Material.findOne({ tipo: req.body.nombre });

        if (tipoExistente) {
            // Si el material ya existe, devuelve su _id
            console.log(`El tipo de material ya existe con id ${tipoExistente._id}`);
            res.send({ msg: "OK", info: "Tipo de material ya existe", materialId: tipoExistente._id });
        } else {
            // Si el material no existe, crea uno nuevo
            let nMaterial = new Material({
                tipo: req.body.tipo
            });
            await nMaterial.save();
            console.log(`Se creó un nuevo tipo de Material con id ${nMaterial._id}`);
            res.send({ msg: "OK", info: "Material creado con éxito", materialId: nMaterial._id });
        }

    } catch (err) {
        console.log("ER:" + err);
        res.send({ msg: "ER", info: "El tipo de material no pudo ser creado, intente más tarde" });

    } finally {
        console.log("Finalizó la creación del tipo de material");
    }
}
