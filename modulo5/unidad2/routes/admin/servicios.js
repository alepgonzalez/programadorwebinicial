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

// mostrar formulario para agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar',{
        layout: 'admin/layout'
    });
});

//insertar servicio
router.post('/agregar', async (req, res, next) => {
    try{
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await serviciosModel.insertServicio(req.body);
            res.redirect('/admin/servicios');
        }
        else{
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos deben ser completados'
            });
        }
    }
    catch(error){
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'El servicio no se cargó'
        });
    }
});

// obtener servicio para modificar
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let servicio = await serviciosModel.getServicioById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        servicio
    });
});

//modificar servicio
router.post('/modificar', async (req, res, next) => {
    try{
        let obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }

        console.log(obj);

        await serviciosModel.updateServicioById(obj, req.body.id);
        res.redirect('/admin/servicios');
    }
    catch(error){
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'La novedad no se ha modificado'
        });
    }
});

module.exports = router;