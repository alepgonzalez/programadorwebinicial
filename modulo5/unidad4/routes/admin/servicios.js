var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get('/', async function (req, res, next) {
    
    var servicios
    if (req.query.buscar === undefined) {
        servicios = await serviciosModel.getServicios();
    }
    else{
        servicios = await serviciosModel.buscarServicios(req.query.buscar);
    }

    servicios = servicios.map(servicio => {
        if (servicio.img_id) {
            const imagen = cloudinary.image(servicio.img_id, {
                width: 80,
                height: 60,
                crop: 'fill' //ajustar la imagen al tamaño
            });

            return {
                ...servicio,
                imagen
            }
        }
        else {
            return {
                ...servicio,
                imagen: ''
            }
        }
    });

    res.render('admin/servicios', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        servicios,
        is_search: req.query.buscar !== undefined,
        buscar: req.query.buscar
    });
});

// eliminar un servicio
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    let servicio = await serviciosModel.getServicioById(id);

    if (servicio.img_id) {
        //borrar imagen del servidor cloudinary
        await destroy(servicio.img_id);
    }

    //borrar el registro de la bd
    await serviciosModel.deleteServicioById(id);
    res.redirect('/admin/servicios');
});

// mostrar formulario para agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

//insertar servicio
router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await serviciosModel.insertServicio({
                ...req.body, //spread: trae titulo, subtitulo y cuerpo
                img_id
            });
            res.redirect('/admin/servicios');
        }
        else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos deben ser completados'
            });
        }
    }
    catch (error) {
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
    try {
        let img_id = req.body.img_original;
        let borrar_img_old = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_old = true;
        }
        else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_old = true;
            }
        }
        if (borrar_img_old && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        let obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
        }

        console.log(obj);

        await serviciosModel.updateServicioById(obj, req.body.id);
        res.redirect('/admin/servicios');
    }
    catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'La novedad no se ha modificado'
        });
    }
});

module.exports = router;