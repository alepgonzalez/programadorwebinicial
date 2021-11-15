var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    var servicios = await serviciosModel.getServicios();

    res.render('admin/servicios', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        servicios
    });
});

// eliminar un servicio
router.get('/eliminar/:id', async(req, res, next) => {
    var id = req.params.id;
    await serviciosModel.deleteServicioById(id);
    res.redirect('/admin/servicios');
});

module.exports = router;