
module.exports = (app) => {
    let pedCtrl = require('../controlador/pedidoControlador');

    app.route('/api/getAllLibros')
        .get(pedCtrl.getAllLibros);

    app.route('/api/getLibro')
        .post(pedCtrl.getLibro);

    app.route('/api/delLibro')
        .post(pedCtrl.delLibro);

    app.route('/api/addLibro')
        .post(pedCtrl.addLibro);

    app.route('/api/updLibro')
        .post(pedCtrl.updLibro);

}