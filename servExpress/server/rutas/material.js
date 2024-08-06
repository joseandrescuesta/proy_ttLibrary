module.exports = (app) => {
    var autCtrl = require('../controlador/materialControlador.js');

    app.route('/api/material/addMat')
        .post(autCtrl.addMat);

}