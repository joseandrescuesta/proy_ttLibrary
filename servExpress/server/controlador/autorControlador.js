var mongoose = require('mongoose');
var Autor = require('../modelo/autor');
var Libro = require('../modelo/libro');
//const axios = require('axios');

exports.getLibAut = function (req, res) {
    try {
        Libro.aggregate([
            {
                $lookup: {
                    from: 'autors',
                    localField: 'autor',
                    foreignField: '_id',
                    as: 'union'
                }
            },
            {
                $unwind: '$union'
            }
        ])
            .then((rta) => {
                if (rta.length > 0) {
                    console.log("RTA: " + rta);
                    res.status(200).send({ msg: "OK", info: rta });
                } else {
                    res.status(404).send({ msg: "ER", info: "No se encontraron libros con ese autor." });
                }
            })
            .catch(err => {
                console.log("ER: " + err);
                res.send({ msg: "ER", info: "Informacion no disponible, intente mas tarde" });
            });
    } catch (err) {
        console.log("Error consultado autores: " + err);
    }
}

exports.addAut = async function (req, res) {
    try {
        // Busca el autor por nombre
        let autorExistente = await Autor.findOne({ nombre: req.body.nombre });

        if (autorExistente) {
            // Si el autor ya existe, devuelve su _id
            console.log(`El autor ya existe con id ${autorExistente._id}`);
            res.send({ msg: "OK", info: "Autor ya existe", autorId: autorExistente._id });
        } else {
            // Si el autor no existe, crea uno nuevo
            let nAutor = new Autor({
                nombre: req.body.nombre
            });
            await nAutor.save();
            console.log(`Se creó un nuevo autor con id ${nAutor._id}`);
            res.send({ msg: "OK", info: "Autor creado con éxito", autorId: nAutor._id });
        }

    } catch (err) {
        console.log("ER:" + err);
        res.send({ msg: "ER", info: "El autor no pudo ser creado, intente más tarde" });

    } finally {
        console.log("Finalizó la creación del autor");
    }
}
/*
async function valToken(token, res) {

    try {
        const { accessToken } = token;

        const rta = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
        const userData = rta.data;

        console.log("status:::>", rta.status);
        console.log("data:::>", userData);
        console.log("headers:::>", rta.headers);
        res.send({ msg: "OK", info: "Autorizado" });

    } catch (error) {
        console.log("ERRRORRR:" + error.message);
        res.send({ msg: "ER", info: "Acceso denegado" });
    }

}


exports.valUsu = function (req, res) {
    console.log("i----------------------");
    console.log("body:", req.body.accessToken);

    const token = { accessToken: req.body.accessToken };

    valToken(token, res);

    console.log("f----------------------");
};
*/