var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var serviciosModel = require('../models/serviciosModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var servicios = await serviciosModel.getServicios();

  res.render('index', {servicios});
});

/*Inicio peticiones del post*/
router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  //console.log(req.body); //ver todo lo que ingresa el usuario

  var objContacto = {
    to: 'alepgonzalez86@gmail.com',
    subject: 'Contacto CHAU FILA',
    html: "El usuario " + nombre + " " + apellido + " se contactó a través de la web. <br>El formulario fue completado con los siguientes datos:<br>Email: " + email + " <br> Teléfono: " + telefono + "<br>Mensaje: " + mensaje
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(objContacto); //await cierre función async

  res.render('index', {
    message: 'Mensaje enviado. Gracias por contactarse con nosotros!!'
  });
}); /*Fin peticiones del post*/


module.exports = router;
