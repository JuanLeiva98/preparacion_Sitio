var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

/* GET home page. */
router.get('/' , function(req, res, next) {
  res.render('nosotros.hbs');
});

router.post('/', async (req,res,next)=>{
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  //console.log(req.body)

  var obj = {
    to: 'juan.leiva@marfrig.com',
    subject: 'Contacto desde la Web Lavalle&Co',
    html: nombre + " " +  "se contacto a traves de la pagina web y desea que se le envie mas información a este correo: " + email + ".<br> Ademas, hizo el siguiente comentario:" + mensaje}

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transporter.sendMail (obj);

  res.render('nosotros',{
    message: 'Formulario envíado con exíto.',
  });
});//cierro el post

module.exports = router;
