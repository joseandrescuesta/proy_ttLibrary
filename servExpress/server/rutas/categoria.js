module.exports = (app) => {
    var autCtrl = require('../controlador/categoriaControlador.js');

    app.route('/api/categoria/addCat')
        .post(autCtrl.addCat);

}