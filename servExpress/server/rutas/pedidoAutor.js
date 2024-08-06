module.exports = (app) => {
    var autCtrl = require('../controlador/autorControlador');

    app.route('/api/autor/getLibAut')
        .get(autCtrl.getLibAut);
    app.route('/api/autor/addAut')
        .post(autCtrl.addAut);

}